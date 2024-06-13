# The detailed steps to create the project like this are as follows 


### Step 1 : 
 Follow these steps to create the app registration:

- Sign in to the Microsoft Entra admin center as at least a Cloud Application Administrator.

- If you have access to multiple tenants, use the Settings icon  in the top menu to switch to the tenant in which you want to register the application from the Directories + subscriptions menu.

- Browse to Identity > Applications > App registrations and select New registration.

- Enter a display Name for your application. Users of your application might see the display name when they use the app, for example during sign-in. You can change the display name at any time and multiple app registrations can share the same name. The app registration's automatically generated Application (client) ID, not its display name, uniquely identifies your app within the identity platform.

- For Supported account types, select Accounts in this organizational directory only. For information on different account types, select the Help me choose option.


- Select Register to complete the initial app registration.
- When registration finishes, the Microsoft Entra admin center displays the app registration's Overview pane. Record the Directory (tenant) ID and the Application (client) ID to be used in your application source code.


**To configure application settings based on the platform or device you're targeting, follow these steps:**

- In the Microsoft Entra admin center, in App registrations, select your application.

- Under Manage, select Authentication.

- Under Platform configurations, select Add a platform.

- Under Configure platforms, select the tile (Single Page Application) for your application type (platform) to configure its settings then add the URL http://localhost:5173/auth/callback (You can change accorgingl by seeing the url in authConfig.js)


### Step 2 Creat the react project with following Folder structure

    ├─── public
    │   └─── index.html
    └───src
        ├─── components
        │   └─── PageLayout.jsx
        │   └─── ProfileData.jsx
        │   └─── SignInButton.jsx
        │   └─── SignOutButton.jsx
        └── App.css
        └── App.jsx
        └── authConfig.js
        └── graph.js
        └── index.css
        └── index.js
You can clone this repo or use the files  as it has already set up files 
### Step 3 Install following packages in the react project

@azure/msal-browser @azure/msal-react
react-bootstrap bootstrap

run the command as follows :
`npm install @azure/msal-browser @azure/msal-react`
`npm install react-bootstrap bootstrap`

### Step 4 

Modify the config.js file with your Client Id,Tenant Id and Redirect URI
