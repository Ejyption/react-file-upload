import React from 'react'
import styles from './style.module.scss'
import { FileIcon } from './../../icons'

const colors = {
  pdf: '#b40808',
  mp4: 'green'
}

const FilePreview = ({ type, locFile }) => {
  const [fileType, ext] = type.split('/')
  return (
    <div className={styles.wrapper}>
      {fileType === 'image' ? (
        <img className={styles.image} src={locFile} />
      ) : (
        <React.Fragment>
          <FileIcon
            color={colors[ext] || '#444'}
            size={40}
            className={styles.icon}
          />
          <div className={styles.text}>{ext}</div>
        </React.Fragment>
      )}
    </div>
  )
}

export default FilePreview
