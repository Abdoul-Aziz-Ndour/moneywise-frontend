import { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login/', { email, password })
      login(res.data)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError('Email ou mot de passe incorrect !')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-emerald-500 mb-6">
          💰 MoneyWise
        </h1>
        <h2 className="text-xl mb-4 text-center">Connexion</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600"
        >
          Se connecter
        </button>
        <p className="text-center mt-3 text-sm">
          Pas de compte ?{" "}
          <a href="/register" className="text-emerald-500">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  )
}
export default Login