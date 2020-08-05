import React, { useState, useEffect } from 'react'
import useFileUpload from './useFileUpload'
import { X } from './../icons'
import styles from './style.module.scss'
import FilePreview from './filePreview'

const FileUpload = ({
  file,
  fileKey,
  uploadURL,
  addSavedFile,
  removeFile,
  ind
}) => {
  const [adding, setAdding] = useState(true)
  const [removing, setRemoving] = useState(false)
  const { progress, locFile, savedFilename } = useFileUpload(file, uploadURL)

  useEffect(() => {
    if (savedFilename) addSavedFile({ filename: savedFilename, key: fileKey })
  }, [savedFilename])

  const remove = () => {
    setRemoving(true)
    setTimeout(() => removeFile(fileKey), 500)
  }

  useEffect(() => {
    setAdding(true)
    setTimeout(() => {
      setAdding(false)
    }, 300)
  }, [file])

  let className = `${styles.wrapper} `
  if (adding) className += ` ${styles.adding}`
  if (removing) className += ` ${styles.removing}`
  if (progress === 100) className += ` ${styles.fin}`

  return (
    <div className={className} style={{ top: ind * 50 }}>
      <FilePreview locFile={locFile} type={file.type} />
      <div className={styles.mid}>
        <div className={styles.top}>
          <div className={styles.filename}>{file.name}</div>
          <button onClick={remove} className={styles.removeButton}>
            <X className={styles.icon} />
          </button>
        </div>
        <div className={styles.progress}>
          <div
            className={styles.progressInner}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default FileUpload
