import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import api from '../../utils/api'

export function Header() {
  const navigateTo = useNavigate()
  const logout = async () => {
    try {
      await api.get('/users/logout')
      navigateTo('/sign-in')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={`${styles.header} bg-1`}>
      <div className={styles.logo}>
        <Link to="/">
          <h2>Logo</h2>
        </Link>
      </div>
      <div className={styles.text} onClick={logout}>
        <p>Logout</p>
      </div>
    </div>
  )
}
