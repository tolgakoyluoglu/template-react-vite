import styles from './Button.module.css'

type IProps = {
  children: string
  onClick?: () => Promise<void> | undefined
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ children, onClick, type = 'button' }: IProps) {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  onClick: undefined,
}
