import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/User'
import api from './api'
import { useAuth } from '../context/userContext'
import { Layout } from '../components'

export function ProtectedRoute({ user }: { user: User | null | undefined }) {
  const { setUser } = useAuth()
  const navigateTo = useNavigate()

  useEffect(() => {
    if (!user) {
      api
        .get('/users/me')
        .then((response) => {
          if (!response.data) navigateTo('/sign-in')
          setUser(response.data)
        })
        .catch((err) => {
          navigateTo('/sign-in')
          console.log(err)
        })
    }
  }, [])

  return <Layout />
}
