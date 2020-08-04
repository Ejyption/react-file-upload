import React from 'react'
import FileUpload from '@ejyption/react-file-upload'
import '@ejyption/react-file-upload/dist/index.css'

const App = () => {
  return (
    <div className='wrapper'>
      <FileUpload uploadURL='http://localhost:3000/upload/uploadFile' />
    </div>
  )
}

export default App
