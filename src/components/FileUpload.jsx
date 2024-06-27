import { useContext,useState } from "react"
import { GraphContext } from "../App"
// import {OneDriveFileUploadTask} from "@microsoft/microsoft-graph-client"
import { OneDriveLargeFileUploadTask } from "@microsoft/microsoft-graph-client"


function FileUpload() {
  const [file,setFile] = useState({})
  const [loader,setLoder] = useState(null)
  const graphClient = useContext(GraphContext)
  console.log(file)


  async function getAllUser(){
    const response = await graphClient.api('/users').select('id,mail').get();

    response.value.find((data)=>data.email==="ztechies@zerotimesolutions.onmicrosoft.com")
  }

  const getEmail = async () => {
    const resp = await graphClient.api("/me").get()
    console.log("Mail",resp.mail)
    return resp.mail
  }


  const sendMailNofication = async () => {
    const sendMail = {
      message: {
        subject: 'File Notification',
        body: {
          contentType: 'HTML',
          content: `<h1>New File Uploaded In Drive ${file.name}</h1>`
        },
        toRecipients: [
          {
            emailAddress: {
              address: await getEmail()
            }
          }
        ],

      }
    };

    const respMail = await graphClient.api("/me/sendMail").post(sendMail)
    console.log("Mail sent",respMail)
    setLoder("Mail sent")
  }

  const handleOnChange = (e) => {
    if(e.target.files[0]){
    setFile(e.target.files[0])
  }else{
    setLoder("")
  }
  }
  const onSubmitHandle = async (event) => {

    event.preventDefault()
    if(file.name&&file!==""){
    setLoder("Loading...")
    try {

      let options = {
          path: "/",
          fileName: file.name,
          rangeSize: 1024 * 1024 // must be a multiple of 320 KiB
      };
      const uploadTask = await OneDriveLargeFileUploadTask
          .create(graphClient, file,options);


       await uploadTask.upload().then((response)=>{
        setLoder("File Uploaded")
        sendMailNofication()
        console.log(`File ${response.name} of ${response.size} bytes uploaded`);
       });



    } catch (error) {
      console.error(error);
    }
    }
  }


  return (
    <>
    <form onSubmit={onSubmitHandle} className="fileupload">

      <label htmlFor="file">Upload file to OneDrive</label>
      <input onChange={handleOnChange} type="file" name="Upload File" id="file" />
      <button type="submit">Upload</button>

    </form>
    {<h4 style={{marginTop:"14px", color:"green"}}>{loader}</h4>}

    <button onClick={getAllUser}>Get All users</button>
    </>
  )
}

export default FileUpload