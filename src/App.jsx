import React,{ createContext, useEffect,useState } from 'react'
import { PageLayout } from './components/PageLayout'
import { loginRequest,msalConfig } from './authConfig'
import { callMsGraph } from './graph'
import { ProfileData } from './components/ProfileData'
import { AuthenticatedTemplate,UnauthenticatedTemplate,useMsal } from '@azure/msal-react'
import {Client} from "@microsoft/microsoft-graph-client"
/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/

export const GraphContext = createContext()
const ProfileContent = () => {
    const { instance,accounts } = useMsal()
    const [graphData,setGraphData] = useState(null)

    const authProvider = {
        getAccessToken: async () => {
            // Call getToken in auth.js
            const resp =await instance.acquireTokenSilent({...loginRequest,account: accounts[0]}).then((data)=>data.accessToken);
            return resp;
        }
    };


    const graphClient = Client.initWithMiddleware({ authProvider });


    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response))
            })
    }

    useEffect(() => {
        RequestProfileData()

    },[])




    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            <br />
            <GraphContext.Provider value={graphClient}>
            {graphData && <ProfileData graphData={graphData} />}
            </GraphContext.Provider>
        </>
    )
}

/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {


    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5>
                    <center>
                        Please sign-in to see your profile information.
                    </center>
                </h5>
            </UnauthenticatedTemplate>
        </div>
    )
}

export default function App() {
    return (
        <PageLayout>
            <center>
                <MainContent />
            </center>
        </PageLayout>
    )
}