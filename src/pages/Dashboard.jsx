// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react'
import { transactionService } from '../services/api'
import API from '../services/api'
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  ShoppingBag,
  Coffee,
  Car,
  Home,
  Heart,
  Briefcase,
  Gift,
  MoreHorizontal
} from 'lucide-react'

const categoryIcons = {
  'alimentation': ShoppingBag,
  'salaire': Briefcase,
  'transport': Car,
  'logement': Home,
  'santé': Heart,
  'loisirs': Coffee,
  'cadeau': Gift,
  'autre': MoreHorizontal
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ✅ Charger les transactions ET les catégories
    Promise.all([
      transactionService.getAll(),
      API.get('/categories/')
    ])
      .then(([transRes, catRes]) => {
        setTransactions(transRes.data)
        setCategories(catRes.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // ✅ Fonction pour obtenir le nom d'une catégorie par son ID
  const getCategorieNom = (categorieId) => {
    const cat = categories.find(c => c.id === categorieId)
    return cat ? cat.nom : 'Autre'
  }

  const revenus = transactions
    .filter(t => t.type === 'revenu')
    .reduce((sum, t) => sum + parseFloat(t.montant || 0), 0)

  const depenses = transactions
    .filter(t => t.type === 'depense')
    .reduce((sum, t) => sum + parseFloat(t.montant || 0), 0)

  const solde = revenus - depenses

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Aujourd'hui"
    if (diffDays === 1) return "Hier"
    if (diffDays < 7) return `Il y a ${diffDays} jours`
    
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1">Vue d'ensemble de vos finances</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Solde */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Wallet size={24} className="text-white" />
              </div>
              <div>
                <p className="text-emerald-100 text-sm font-medium">Solde total</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-1 backdrop-blur-sm">
              <span className="text-sm font-semibold">Actuel</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-2">
            {solde.toLocaleString('fr-FR')} FCFA
          </p>
          <div className="flex items-center gap-2 text-emerald-100 text-sm">
            <span>Disponible sur votre compte</span>
          </div>
        </div>

        {/* Revenus */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Revenus</p>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-2">
              <ArrowUpRight size={20} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {revenus.toLocaleString('fr-FR')} FCFA
          </p>
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <span>+12.5%</span>
            <span className="text-gray-400 font-normal">ce mois</span>
          </div>
        </div>

        {/* Dépenses */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <TrendingDown size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Dépenses</p>
              </div>
            </div>
            <div className="bg-red-100 rounded-lg p-2">
              <ArrowDownRight size={20} className="text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {depenses.toLocaleString('fr-FR')} FCFA
          </p>
          <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
            <span>-5.2%</span>
            <span className="text-gray-400 font-normal">ce mois</span>
          </div>
        </div>
      </div>

      {/* Transactions récentes */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Transactions récentes</h2>
              <p className="text-sm text-gray-500 mt-1">Vos dernières opérations</p>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Voir tout
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {transactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Aucune transaction</p>
              <p className="text-sm text-gray-400 mt-1">Commencez par ajouter votre première transaction</p>
            </div>
          ) : (
            transactions.slice(0, 5).map((t, i) => {
              // ✅ Récupérer le nom de la catégorie via l'ID
              const categorieNom = getCategorieNom(t.categorie)
              const Icon = categoryIcons[categorieNom?.toLowerCase()] || categoryIcons['autre']
              const isRevenu = t.type === 'revenu'
              
              return (
                <div 
                  key={i} 
                  className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4 group cursor-pointer"
                >
                  {/* Icône */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isRevenu 
                      ? 'bg-green-100 group-hover:bg-green-200' 
                      : 'bg-red-100 group-hover:bg-red-200'
                  } transition-colors`}>
                    {isRevenu ? (
                      <ArrowUpRight size={20} className="text-green-600" />
                    ) : (
                      <ArrowDownRight size={20} className="text-red-600" />
                    )}
                  </div>

                  {/* Informations */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 truncate">
                        {t.description || categorieNom || 'Transaction'}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isRevenu 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {/* ✅ Afficher le nom au lieu de l'ID */}
                        {categorieNom}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(t.date)}
                      </span>
                      <span>•</span>
                      <span>{formatTime(t.date)}</span>
                    </div>
                  </div>

                  {/* Montant */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold text-lg ${
                      isRevenu ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isRevenu ? '+' : '-'}{parseFloat(t.montant).toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {transactions.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Voir toutes les transactions →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}