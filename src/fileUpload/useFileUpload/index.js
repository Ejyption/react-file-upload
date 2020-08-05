import { useState, useEffect } from 'react'
import axios from 'axios'

export default function (file, uploadURL) {
  const [locFile, setLocFile] = useState(null)
  const [savedFilename, setSavedFilename] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (file) {
      setProgress(0)
      var reader = new FileReader()
      reader.onloadend = (e) => setLocFile(e.target.result)
      reader.readAsDataURL(file)
      const xx = async () => {
        const formData = new FormData()
        formData.append('uploads[]', file, file.name)
        const res = await axios.post(uploadURL, formData, {
          withCredentials: true,
          onUploadProgress: (e) => setProgress(~~((e.loaded / e.total) * 100))
        })
        setSavedFilename(res.data)
      }
      try {
        xx()
      } catch (err) {
        console.log(err)
      }
    }
  }, [file])

  return { progress, locFile, savedFilename }
}
