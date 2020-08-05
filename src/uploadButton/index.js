import React from 'react'
import PropType from 'prop-types'
import styles from './style.module.scss'

const UploadButton = ({ onClick, multiple }) => {
  return (
    <button type='button' onClick={onClick} className={styles.button}>
      {multiple ? 'Upload Files' : 'Upload File'}
    </button>
  )
}

UploadButton.propTypes = {
  onClick: PropType.func.isRequired
}
export default UploadButton
