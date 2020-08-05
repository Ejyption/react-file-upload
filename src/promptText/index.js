import React from 'react'
import PropType from 'prop-types'
import styles from './styles.module.scss'

const PromptText = ({ multiple }) => {
  return (
    <div className={styles.prompt}>
      {multiple
        ? 'Select one or more files from your computer, or drag and drop them here'
        : 'Select one file from your computer, or drag and drop it here'}
    </div>
  )
}

PromptText.propTypes = {
  multiple: PropType.bool
}

export default PromptText
