// src/pages/Profile.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Save, X, Trash2 } from 'lucide-react'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    prenom: user?.user?.first_name || '',
    nom: user?.user?.last_name || '',
    email: user?.user?.email || '',
  })
  const [success, setSuccess] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSave = () => {
    setSuccess('Profil enregistré avec succès !')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleCancel = () => {
    setForm({
      prenom: user?.user?.first_name || '',
      nom: user?.user?.last_name || '',
      email: user?.user?.email || '',
    })
  }

  const handleDelete = () => {
    if (window.confirm('Voulez-vous vraiment supprimer votre compte ?')) {
      logout()
      navigate('/login')
    }
  }

  const initiale = form.prenom?.[0] || user?.user?.username?.[0] || '?'

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">

      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Profil</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          {/* Avatar + Nom */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-bold text-2xl">
                {initiale.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-bold text-lg">
                {form.prenom || form.nom || user?.user?.username || 'Utilisateur'}
              </p>
              <p className="text-gray-500 text-sm">{form.email}</p>
            </div>
          </div>

          {/* Message succès */}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-xl mb-4 text-sm">
              ✅ {success}
            </div>
          )}

          {/* Champs */}
          <div className="space-y-3 mb-6">
            <input
              type="text"
              placeholder="Prénom"
              value={form.prenom}
              onChange={(e) => setForm({...form, prenom: e.target.value})}
              className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
            <input
              type="text"
              placeholder="Nom"
              value={form.nom}
              onChange={(e) => setForm({...form, nom: e.target.value})}
              className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>

          {/* Boutons Annuler / Enregistrer */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-2.5 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
              <Save size={16} />
              Enregistrer
            </button>
          </div>

          {/* Supprimer le compte */}
          <button
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 py-2.5 rounded-xl font-medium hover:bg-red-100 transition-colors mb-3"
          >
            <Trash2 size={16} />
            Supprimer le compte
          </button>

          {/* Se déconnecter */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2.5 rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            Se déconnecter
          </button>

        </div>
      </div>
    </div>
  )
}