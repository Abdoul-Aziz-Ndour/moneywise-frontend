import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({
    username: '', email: '', password: '', first_name: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      setError('Veuillez remplir tous les champs !')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await authService.register(form)
      
      // ✅ Sauvegarder le token et connecter l'utilisateur
      const token = res.data.token || res.data.access || res.data.access_token
      if (token) {
        localStorage.setItem('token', token)
        login(res.data)
        navigate('/')  // ✅ Aller au dashboard directement
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.error('Erreur inscription:', error.response?.data)
      const data = error.response?.data
      if (data?.username) {
        setError('Ce nom d\'utilisateur existe déjà !')
      } else if (data?.email) {
        setError('Cet email est déjà utilisé !')
      } else {
        setError('Erreur lors de l\'inscription. Réessayez !')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-emerald-500 mb-6">
          💰 MoneyWise
        </h1>
        <h2 className="text-xl mb-4 text-center font-semibold">Inscription</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input type="text" placeholder="Nom complet"
          onChange={(e) => setForm({...form, first_name: e.target.value})}
          className="w-full border p-2 rounded-xl mb-3" />
        <input type="text" placeholder="Nom d'utilisateur"
          onChange={(e) => setForm({...form, username: e.target.value})}
          className="w-full border p-2 rounded-xl mb-3" />
        <input type="email" placeholder="Email"
          onChange={(e) => setForm({...form, email: e.target.value})}
          className="w-full border p-2 rounded-xl mb-3" />
        <input type="password" placeholder="Mot de passe"
          onChange={(e) => setForm({...form, password: e.target.value})}
          className="w-full border p-2 rounded-xl mb-4" />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600 disabled:opacity-50">
          {loading ? 'Inscription...' : 'S\'inscrire'}
        </button>
        <p className="text-center mt-3 text-sm">
          Déjà un compte ?{" "}
          <a href="/login" className="text-emerald-500 font-semibold">Se connecter</a>
        </p>
      </div>
    </div>
  )
}