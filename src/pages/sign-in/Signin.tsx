import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types/User'
import api from '../../utils/api'
import { useAuth } from '../../context/userContext'
import styles from './Signin.module.css'
import { Button, TextField } from '../../components'

export function Signin() {
  const navigateTo = useNavigate()
  const { setUser, user } = useAuth()
  const [userInputs, setUserInputs] = useState<User>({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      api
        .get('/users/me')
        .then((response) => {
          if (response.data) navigateTo('/')
        })
        .catch((err) => console.log(err))
    }
  }, [])

  const loginUser = async (e: any) => {
    e.preventDefault()
    try {
      const { username, password } = userInputs
      if (!username || !password) {
        return setError('Field is required.')
      }
      const response = await api.post('/users/sign-in', userInputs)
      setUser(response.data)
      navigateTo('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setUserInputs({ ...userInputs, [event.target.name]: event.target.value })
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.card} bg-1`}>
        <h2 className={styles.header}>Login</h2>
        <form className="form" onSubmit={(e) => loginUser(e)}>
          <TextField
            value={userInputs.username}
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            error={error}
          />
          <TextField
            value={userInputs.password}
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            error={error}
          />
          <Button type="submit">Login</Button>
          <p>
            Dont have an account? <a href="/sign-up">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  )
}
