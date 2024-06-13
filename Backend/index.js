const express = require('express');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const app = express();
const dotenv = require("dotenv")
dotenv.config()
const port = 3001;

const msalConfig = {
    auth: {
        clientId: "25bbeef2-e930-4f1d-b236-d001b9fdea61",
        authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
        clientSecret: process.env.CLIENT_SECRECT || "" , 
    }
};

const cca = new ConfidentialClientApplication(msalConfig);

app.get('/getToken', async (req, res) => {
    try {
        const result = await cca.acquireTokenByClientCredential({
            scopes: ["https://graph.microsoft.com/.default"],
        });
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Auth service listening at http://localhost:${port}`);
});