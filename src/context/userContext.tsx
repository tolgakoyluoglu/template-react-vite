import { createContext, ReactNode, useContext, useState } from 'react'
import { User } from '../types/User'

type Props = {
  children: ReactNode
}
type AuthContextType = {
  user: User | null | undefined
  setUser: (data: User | null) => void
}

const authContextDefaultValues: AuthContextType = {
  user: null,
  setUser: () => {},
}

const AuthContext = createContext<AuthContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: Props) {
  const [user, setUserData] = useState<User | null | undefined>(undefined)

  const setUser = (userData: User | null) => {
    setUserData(userData)
  }
  const value = { user, setUser }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
