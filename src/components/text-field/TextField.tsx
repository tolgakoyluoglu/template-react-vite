import React from 'react'
import styles from './TextField.module.css'

type Props = {
  type: string
  value: string | undefined
  onChange: (data: { target: { name: string; value: string } }) => void
  placeholder: string
  name: string
  disabled?: boolean
  error?: string
}

export function TextField({
  type,
  value,
  onChange,
  placeholder,
  name,
  disabled,
  error,
}: Props) {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <input
          disabled={disabled}
          className={styles.input}
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          autoComplete="off"
        />
        <label
          htmlFor="input"
          className={[styles.label, value && styles.filled].join(' ')}
        >
          {placeholder}
        </label>
      </div>
      {error?.length ? <p className={styles.error}>{error}</p> : ''}
    </React.Fragment>
  )
}

TextField.defaultProps = {
  disabled: false,
  error: '',
}
