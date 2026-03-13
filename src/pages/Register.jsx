import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'

export default function Register() {
  const [form, setForm] = useState({
    username: '', email: '', password: '', first_name: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await authService.register(form)
      navigate('/login')
    } catch (err) {
      setError('Erreur lors de l\'inscription')
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
        <button onClick={handleSubmit}
          className="w-full bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600">
          S'inscrire
        </button>
        <p className="text-center mt-3 text-sm">
          Déjà un compte ?{" "}
          <a href="/login" className="text-emerald-500 font-semibold">Se connecter</a>
        </p>
      </div>
    </div>
  )
}