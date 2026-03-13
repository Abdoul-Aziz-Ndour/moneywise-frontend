import { useEffect, useState } from 'react'
import { transactionService } from '../services/api'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export default function Dashboard() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    transactionService.getAll()
      .then(res => setTransactions(res.data))
      .catch(() => {})
  }, [])

  const revenus = transactions
    .filter(t => t.type === 'revenu')
    .reduce((sum, t) => sum + parseFloat(t.montant), 0)

  const depenses = transactions
    .filter(t => t.type === 'depense')
    .reduce((sum, t) => sum + parseFloat(t.montant), 0)

  const solde = revenus - depenses

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3 mb-2">
            <Wallet size={20} className="text-emerald-500" />
            <p className="text-gray-500 text-sm">Solde</p>
          </div>
          <p className="text-2xl font-bold text-emerald-500">
            {solde.toLocaleString()} FCFA
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={20} className="text-green-500" />
            <p className="text-gray-500 text-sm">Revenus</p>
          </div>
          <p className="text-2xl font-bold text-green-500">
            {revenus.toLocaleString()} FCFA
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown size={20} className="text-red-500" />
            <p className="text-gray-500 text-sm">Dépenses</p>
          </div>
          <p className="text-2xl font-bold text-red-500">
            {depenses.toLocaleString()} FCFA
          </p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h2 className="font-bold mb-4">Transactions récentes</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-400">Aucune transaction</p>
        ) : (
          transactions.slice(0, 5).map((t, i) => (
            <div key={i} className="flex justify-between py-2 border-b last:border-0">
              <div>
                <p className="font-medium">{t.description}</p>
                <p className="text-xs text-gray-400">{t.date}</p>
              </div>
              <p className={`font-bold ${t.type === 'revenu' ? 'text-green-500' : 'text-red-500'}`}>
                {t.type === 'revenu' ? '+' : '-'}{parseFloat(t.montant).toLocaleString()} FCFA
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}