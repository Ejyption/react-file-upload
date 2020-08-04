import React, { useState, useEffect, useRef } from 'react'
import UploadButton from './uploadButton'
import FilesList from './filesList'
import PropType from 'prop-types'
import styles from './styles.module.scss'

const FileUpload = ({ uploadURL, fileTypes }) => {
  const [fileKey, setFileKey] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState([])
  const [savedFiles, setSavedFiles] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    window.addEventListener('dragover', (e) => e.preventDefault())
    window.addEventListener('drop', (e) => e.preventDefault())
    return () => {
      window.removeEventListener('dragover', (e) => e.preventDefault())
      window.removeEventListener('drop', (e) => e.preventDefault())
    }
  })

  const dragFunction = (e, t) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(t)
  }

  const dragDropped = (e) => {
    dragFunction(e, false)
    addFiles(e.dataTransfer.files)
  }
  const inputNewFiles = (e) => {
    addFiles(e.target.files)
  }

  const addFiles = (inputFiles) => {
    const newFiles = Array.from(inputFiles).map((file, k) => ({
      file,
      key: fileKey + k
    }))
    setFiles((f) => [...f, ...newFiles])
    setFileKey(fileKey + newFiles.length)
    inputRef.current.value = null
  }

  const addSavedFile = async (f) => {
    setSavedFiles((prev) => [...prev, f])
  }
  const removeSavedFile = (k) => {
    setFiles((f) => f.filter((a) => a.key !== k))
    setSavedFiles((sI) => sI.filter((a) => a.key !== k))
  }

  const focus = () => {
    inputRef.current.click()
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.inner} ` + (dragOver ? `${styles.dragging}` : ``)}
        onDragOver={(e) => dragFunction(e, true)}
        onDragEnter={(e) => dragFunction(e, true)}
        onDragLeave={(e) => dragFunction(e, false)}
        onDrop={dragDropped}
      >
        <input
          ref={inputRef}
          onChange={inputNewFiles}
          className='hidden-input'
          type='file'
          accept='*'
          multiple
          hidden
        />
        <UploadButton onClick={focus} />
        <div className={styles.prompt} onClick={() => console.log(savedFiles)}>
          Select one or more files from your computer, or drag and drop them
          here
        </div>
        <FilesList
          uploadURL={uploadURL}
          files={files}
          addSavedFile={addSavedFile}
          removeFile={removeSavedFile}
        />
      </div>
    </div>
  )
}

FileUpload.defaultProps = {
  propTypes: ['video', 'images', 'file']
}

FileUpload.propTypes = {
  uploadURL: PropType.string.isRequired,
  fileTypes: PropType.arrayOf(PropType.string)
}

export default FileUpload
