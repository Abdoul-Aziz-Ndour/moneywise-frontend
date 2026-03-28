 
// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Wallet, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import API from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs !')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/login/', { email, password })
      const token = res.data.token || res.data.access || res.data.access_token
      if (!token) {
        console.error('Réponse backend:', res.data)
        setError('Token non reçu du serveur !')
        return
      }
      localStorage.setItem('token', token)
      login(res.data)
      navigate('/')
      console.error('Login error:', err)
      setError('Email ou mot de passe incorrect !')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Partie gauche — Design (desktop uniquement) */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-500 flex-col justify-center items-center p-12">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
          <Wallet size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">MoneyWise</h1>
        <p className="text-emerald-100 text-center text-lg max-w-sm">
          Gérez vos finances personnelles simplement et efficacement
        </p>
        
        {/* Features grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-sm">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-white font-bold text-2xl">📊</p>
            <p className="text-emerald-100 text-sm mt-1">Statistiques</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-white font-bold text-2xl">💰</p>
            <p className="text-emerald-100 text-sm mt-1">Transactions</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-white font-bold text-2xl">🏷️</p>
            <p className="text-emerald-100 text-sm mt-1">Catégories</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-white font-bold text-2xl">📈</p>
            <p className="text-emerald-100 text-sm mt-1">Rapports</p>
          </div>
        </div>
      </div>

      {/* Partie droite — Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">

          {/* Logo mobile */}
          <div className="flex items-center gap-2 justify-center mb-8 lg:hidden">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Wallet size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">MoneyWise</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bon retour ! 👋</h2>
          <p className="text-gray-500 mb-8">Connectez-vous à votre compte</p>

          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-4 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Champ Email */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full border border-gray-200 pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Mot de passe
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full border border-gray-200 pl-9 pr-10 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Bouton de connexion */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Connexion...
              </>
            ) : (
              'Se connecter'
            )}
          </button>

          {/* Lien vers inscription */}
          <p className="text-center text-sm text-gray-500">
            Pas encore de compte ?{' '}
            <Link 
              to="/register" 
              className="text-emerald-600 font-medium hover:underline hover:text-emerald-700 transition-colors"
            >
              S'inscrire gratuitement
            </Link>
          </p>

          {/* Optionnel : lien mot de passe oublié */}
          <p className="text-center mt-4">
            <a href="/forgot-password" className="text-xs text-gray-400 hover:text-emerald-600 transition-colors">
              Mot de passe oublié ?
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}