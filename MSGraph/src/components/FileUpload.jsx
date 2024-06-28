import { useContext,useState } from "react"
import { GraphContext } from "../App"
// import {OneDriveFileUploadTask} from "@microsoft/microsoft-graph-client"
import { OneDriveLargeFileUploadTask } from "@microsoft/microsoft-graph-client"

// "testuser2@zerotimesolutions.onmicrosoft.com"
function FileUpload() {
  const [file,setFile] = useState({})
  const [loader,setLoder] = useState(null)
  const graphClient = useContext(GraphContext)
  console.log(file)

// "ztechies@zerotimesolutions.onmicrosoft.com"
  async function getAllUser(email){
    const response = await graphClient.api('/users').select('id,mail').get();
    const data = response.value;
    const user = data.find((obj)=>obj.mail==="testuser2@zerotimesolutions.onmicrosoft.com")
    console.log("User",user)
    console.log("Data ",response.value)
    try {
      const drive = await graphClient.api(`/users/${user.id}/drive/root`).get()
      graphClient
      console.log(drive)


    } catch (error) {
      console.log(error)
    }

    return user

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
          },
          {
            emailAddress: {
              address: "ztechies@zerotimesolutions.onmicrosoft.com"
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
    const data = new FormData()
    data.append("file",file)
    event.preventDefault()
    if(file.name&&file!==""){
    setLoder("Loading...")
    try {

      fetch("http://localhost:4002/",{
        method:"POST",
        body:data
      })


      //  await uploadTask.upload().then((response)=>{
      //   setLoder("File Uploaded")
      //   sendMailNofication()
      //   console.log(`File ${response.name} of ${response.size} bytes uploaded`);
      //  });



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