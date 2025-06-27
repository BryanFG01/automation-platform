import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotificationStore } from '../stores/useNotificationStore'
import '../styles/login-form.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { error } = useNotificationStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('https://testing-api-gateway.sandboxcw.net/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail?.[0]?.msg || 'Error en la autenticación')
      }

      const data = await response.json()
      const token = data.access_token
      const refreshToken = data.refresh_token

      localStorage.setItem('access_token', token)
      localStorage.setItem('refresh_token', refreshToken)

      navigate('/dashboard', { replace: true })
    } catch (err) {
      error('Error de autenticación', err.message, { duration: 5000, closable: false })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="card login-card">
        <div className="card-header">
          <h2>Iniciar sesión</h2>
          <p>Ingrese sus credenciales para acceder a la plataforma</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Nombre de usuario</label>
              <input
                id="email"
                type="text"
                placeholder="johndoe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password">Contraseña</label>
                <a href="#" className="forgot-password">
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn primary-btn full-width" type="submit" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
