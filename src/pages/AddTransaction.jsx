// src/pages/AddTransaction.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { transactionService } from '../services/api'
import API from '../services/api'
import { Wallet, TrendingUp, TrendingDown, Calendar, Tag, FileText } from 'lucide-react'

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: 'revenu',
    montant: '',
    categorie: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // ✅ Charger les catégories depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories/')
        setCategories(res.data)
      } catch (err) {
        console.error('Erreur chargement catégories:', err)
      }
    }
    fetchCategories()
  }, [])

  // ✅ Filtrer les catégories selon le type choisi
  const categoriesFiltrees = categories.filter(cat => cat.type === form.type)

  const handleSubmit = async () => {
    if (!form.montant || !form.categorie) {
      alert('Veuillez remplir le montant et la catégorie !')
      return
    }
    setLoading(true)
    try {
      const data = {
        montant: form.montant,
        categorie: form.categorie,
        description: form.description,
        date: form.date,
        type: form.type,
      }
      await transactionService.create(data)
      navigate('/transactions')
    } catch (err) {
      console.error('Erreur détaillée:', err.response?.data)
      alert('Erreur: ' + JSON.stringify(err.response?.data))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Wallet size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Ajouter une transaction</h1>
          <p className="text-gray-500 text-sm mt-1">Remplissez les informations ci-dessous</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          {/* Type */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setForm({...form, type: 'revenu', categorie: ''})}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-medium transition-all ${
                form.type === 'revenu'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              <TrendingUp size={18} />
              Revenu
            </button>
            <button
              type="button"
              onClick={() => setForm({...form, type: 'depense', categorie: ''})}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-medium transition-all ${
                form.type === 'depense'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              <TrendingDown size={18} />
              Dépense
            </button>
          </div>

          {/* Montant */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Montant</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                {form.type === 'revenu' ? '+' : '-'} FCFA
              </span>
              <input
                type="number"
                placeholder="0"
                value={form.montant}
                onChange={(e) => setForm({...form, montant: e.target.value})}
                className="w-full border border-gray-200 pl-20 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>
          </div>

          {/* ✅ Catégorie — menu déroulant */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Catégorie</label>
            <div className="relative">
              <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={form.categorie}
                onChange={(e) => setForm({...form, categorie: e.target.value})}
                className="w-full border border-gray-200 pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all appearance-none bg-white"
              >
                <option value="">-- Choisir une catégorie --</option>
                {categoriesFiltrees.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>
            {categoriesFiltrees.length === 0 && (
              <p className="text-xs text-red-400 mt-1">
                Aucune catégorie pour ce type. Créez-en une dans Postman !
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
            <div className="relative">
              <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Détails de la transaction..."
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                className="w-full border border-gray-200 pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({...form, date: e.target.value})}
                className="w-full border border-gray-200 pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>
          </div>

          {/* Bouton */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Ajout en cours...
              </>
            ) : (
              <>
                <Wallet size={18} />
                Ajouter la transaction
              </>
            )}
          </button>

          <button
            onClick={() => navigate('/transactions')}
            className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Annuler
          </button>

        </div>
      </div>
    </div>
  )
}