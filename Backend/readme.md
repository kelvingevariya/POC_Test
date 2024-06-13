1. Register a New Application
Sign in to the Azure portal:

Go to the Azure portal.
Register a new application:

Navigate to Azure Active Directory > App registrations > New registration.
Configure the new application:

Name: Enter a name for your application (e.g., MyNodeApp).
Supported account types: Choose which accounts you want to allow. For most applications, choose "Accounts in this organizational directory only (Single tenant)".
Redirect URI:
Select Web.
Enter http://localhost:3000/auth/redirect.
Click Register.


2. Configure the Application
Application (client) ID and Directory (tenant) ID:

After registering the application, you will be redirected to the application's overview page.
Note the Application (client) ID and Directory (tenant) ID. These will be used in your Node.js application configuration.
Create a client secret:

Navigate to Certificates & secrets.
Under Client secrets, click New client secret.
Add a description (e.g., MyNodeAppSecret) and select an expiry period.
Click Add.
Copy the value of the client secret immediately after creating it. You won’t be able to retrieve it later. This value will be used as clientSecret in your Node.js application configuration.


3. Configure API Permissions
API permissions:

Navigate to API permissions.
Click Add a permission.
Select Microsoft Graph.
Select Delegated permissions.
Search for and select the permissions you need. For basic profile access, select User.Read.
Click Add permissions.
Grant admin consent:

Click Grant admin consent for [your tenant].
Confirm by clicking Yes.