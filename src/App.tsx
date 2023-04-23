import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './utils/ProtectedRoute'
import { Signin } from './pages/sign-in'
import { Signup } from './pages/sign-up'
import { AuthProvider, useAuth } from './context/userContext'
import { Settings } from './pages/settings'
import { Dashboard } from './pages/dashboard'

function App() {
  const { user } = useAuth()
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
