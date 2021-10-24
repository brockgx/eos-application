import React from 'react'
import FileUpload from '../commands/FileUpload'

const Command2 = () => {
  return (
    <div>
      <br/>
      <h3>File Transfer</h3>
      <p>Utilising the selected machine above, users can upload a file to send to the machine<br/>to a specific location.</p>
      <br/>
      <FileUpload />
    </div>
  )
}

export default Command2
