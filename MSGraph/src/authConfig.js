import { LogLevel } from "@azure/msal-browser";
/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

// b1a1ef62-0752-4bbf-9ff4-3157337cdc21  ID(MULTI )
//  d110a14e-41e1-4e33-b269-012bdf160d76  TID

// all accounts CID 53168e2a-ed72-493e-a001-6dd58f7b525f
//  TID d110a14e-41e1-4e33-b269-012bdf160d76

// Multitenant   CID  25bbeef2-e930-4f1d-b236-d001b9fdea61
// TID 29ddc8c2-40d0-4944-9e2b-ac6719008703

// Personal CID 7f3bbfcb-641a-4461-9211-96895c07855d
export const msalConfig = {
    auth: {
        clientId: "b1a1ef62-0752-4bbf-9ff4-3157337cdc21",
        authority: "https://login.microsoftonline.com/d110a14e-41e1-4e33-b269-012bdf160d76/",
        redirectUri: "http://localhost:5173/auth/callback",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["User.Read","Mail.Send","Mail.Send.Shared","Files.ReadWrite.All","User.ReadBasic.All","User.Read.All","AdministrativeUnit.Read.All","People.Read.All","Files.Read.All"]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};