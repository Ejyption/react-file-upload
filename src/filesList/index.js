import React, { useRef, useState, useEffect } from 'react'
//import FileUpload from '../fileUpload'
import styles from './style.module.scss'
import FileUpload from './../fileUpload'

const FilesList = ({ files, uploadURL, addSavedFile, removeFile }) => {
  const [lastLength, setLastLength] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (files.length > lastLength) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight + 50,
          behavior: 'smooth'
        })
      }, 100)
    }
    setLastLength(files.length)
  }, [files.length])

  return (
    <div ref={scrollRef} className={styles.wrapper}>
      <div
        className={styles.inner}
        style={{
          height: files.length * 50
        }}
      >
        {files.map((file, k) => (
          <FileUpload
            key={file.key}
            ind={k}
            fileKey={file.key}
            file={file.file}
            uploadURL={uploadURL}
            addSavedFile={addSavedFile}
            removeFile={removeFile}
          />
        ))}
      </div>
    </div>
  )
}

export default FilesList
