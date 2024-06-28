import * as msal from "@azure/msal-node";
import dotenv from "dotenv";

dotenv.config();
import { Client } from "@microsoft/microsoft-graph-client";

const clientConfig = {
  auth: {
    clientId: "b1a1ef62-0752-4bbf-9ff4-3157337cdc21",
    authority:
      "https://login.microsoftonline.com/d110a14e-41e1-4e33-b269-012bdf160d76/",
    clientSecret: "OcT8Q~OKlnQ8TxrZgj9LaTzw7K8L_YVO.zE6naf9",
  },
};
export const cca = new msal.ConfidentialClientApplication(clientConfig);

// "User.Read",
// "Mail.Send",
// "Mail.Send.Shared",
// "Files.ReadWrite.All",
// "User.ReadBasic.All",
// "User.Read.All",
// "AdministrativeUnit.Read.All",
// "People.Read.All",
// "Files.Read.All",

export const loginRequest = {
  scopes: ["https://graph.microsoft.com/.default"],
};

export const authProviderGraph = {
  getAccessToken: async () => {
    const token = await cca.acquireTokenByClientCredential(loginRequest);
    console.log(token);
    return token.accessToken;
  }
};

export const graphClient = Client.initWithMiddleware({
  authProvider: authProviderGraph,
});
