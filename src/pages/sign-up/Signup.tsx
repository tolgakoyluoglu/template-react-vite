import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { User } from '../../types/User'
import api from '../../utils/api'
import { useAuth } from '../../context/userContext'
import { TextField, Button } from '../../components'
import styles from './Signup.module.css'

export function Signup() {
  const navigateTo = useNavigate()
  const { user } = useAuth()
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

  const registerUser = async (e: any) => {
    e.preventDefault()
    try {
      const { username, password } = userInputs
      if (!username || !password) {
        return setError('Field is required.')
      }

      await api.post('/users/sign-up', userInputs)
      navigateTo('/sign-in')
      setError('')
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
        <h2 className={styles.header}>Register</h2>
        <form className="form" onSubmit={(e) => registerUser(e)}>
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
          <Button type="submit">Submit</Button>
          <p>
            Already have an account? <a href="/sign-in">Login here</a>
          </p>
        </form>
      </div>
    </div>
  )
}
