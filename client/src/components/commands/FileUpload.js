import React, {useState} from 'react'

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileLocation, setFileLocation] = useState("");

  // Fetch device data from DB
  const postFile = async (fileContent) => {
    const resp = await fetch('/test/brock/file', {
      method: 'POST',
      body: JSON.stringify({
        content: fileContent,
        name: file.name
      }),
      headers: new Headers({
        "content-type": "application/json"
      })
    })
    const data = await resp.json()
    if(resp.ok) {
      console.log(data)
      return data;
    } else {
      throw Error(`Request rejected with status ${resp.status}`);
    }
  }

  let addFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  let uploadFile = () => {
    if(file !== null || fileLocation === "") {
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = () => {
        postFile(reader.result);
      }
      console.log("File uploading");
    } else {
      if(file !== null) { console.log("Error: no file has been uploaded"); }
      else { console.log("Error: no file location has been entered"); }
    }
  }

  //Return - all content
  return (
    <div>
      <div>
        <label>Upload Your File</label>
        <input type="file" name="file" onChange={addFile}></input>
      </div>
      <button type="button" onClick={uploadFile}>Send File</button>
    </div>
  )
}

export default FileUpload