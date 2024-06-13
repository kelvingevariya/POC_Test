module.exports = {
  auth: {
    clientId: "762edf8e-a0f2-440b-9927-968c523f0200",
    authority: "https://login.microsoftonline.com/common/",

  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: "info",
    },
  },
  redirectUri: "http://localhost:3000/auth/callback",
};  