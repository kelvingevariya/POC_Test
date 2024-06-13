const express = require("express")

const session = require('express-session');
const msal = require('@azure/msal-node');

const router = express.Router();

router.get(
  "/signin",
  async (
    req,
    res,
  ) => {
    const scopes = "https://graph.microsoft.com/.default";

    const urlParameters = {
      scopes: scopes.split(","),
      redirectUri: "http://localhost:3000/auth/callback",
    };

    try {
      const authUrl = await (
        req.app.locals.msalClient 
      ).getAuthCodeUrl(urlParameters);
      res.redirect(authUrl);
    } catch (error) {
      console.log(`Error: ${error}`);
      req.flash("error_msg", [
        "Could not fetch events",
        `Debug info: ${JSON.stringify(
          error,
          Object.getOwnPropertyNames(error),
        )}`,
      ]);
      res.redirect("/");
    }
  },
);

router.get(
  "/callback",
  async (
    req,
    res,
  ) => {
    const scopes =
      process.env.OAUTH_SCOPES || "https://graph.microsoft.com/.default";
    const tokenRequest = {
      code: req.query.code,
      scopes: scopes.split(","),
      redirectUri:"http://localhost:3000/auth/callback",
    };

    try {
      const response = await (
        req.app.locals.msalClient 
      ).acquireTokenByCode(tokenRequest);

      req.session.userId = response.account.homeAccountId;

      const user = await getUserDetails(
        req.app.locals.msalClient,
        req.session.userId,
      );

      req.app.locals.users[req.session.userId] = {
        displayName: user.displayName,
        email: user.mail || user.userPrincipalName,
        timeZone: user.mailboxSettings.timeZone,
      };
    } catch (error) {
      req.flash("error_msg", [
        "Error completing authentication",
        JSON.stringify(error, Object.getOwnPropertyNames(error)),
      ]);
    }

    const msalClient = req.app.locals
      .msalClient ;
    const userId = req.session.userId || "";

    (async () => {
      try {
        await createSubscription(msalClient, userId);
      } catch (error) {
        console.error("Error setting up subscription:", error);
      }
    })();

    res.redirect("/teams");
  },
);

router.get(
  "/signout",
  async (
    req,
    res,
  ) => {
    if (req.session.userId) {
      const accounts = await (
        req.app.locals.msalClient 
      )
        .getTokenCache()
        .getAllAccounts();

      const userAccount = accounts.find(
        (a) => a.homeAccountId === req.session.userId,
      );

      if (userAccount) {
        await (req.app.locals.msalClient )
          .getTokenCache()
          .removeAccount(userAccount);
      }
    }

    req.session.destroy(() => {
      res.redirect("/");
    });
  },
);

module.exports= router;