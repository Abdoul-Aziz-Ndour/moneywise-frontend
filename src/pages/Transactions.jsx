import { useEffect, useState } from 'react'
import { transactionService } from '../services/api'
import { Trash2 } from 'lucide-react'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    transactionService.getAll()
      .then(res => setTransactions(res.data))
      .catch(() => {})
  }, [])

  const handleDelete = async (id) => {
    await transactionService.delete(id)
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        {transactions.length === 0 ? (
          <p className="text-gray-400">Aucune transaction</p>
        ) : (
          transactions.map((t) => (
            <div key={t.id} className="flex justify-between items-center py-3 border-b last:border-0">
              <div>
                <p className="font-medium">{t.description}</p>
                <p className="text-xs text-gray-400">{t.categorie} • {t.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className={`font-bold ${t.type === 'revenu' ? 'text-green-500' : 'text-red-500'}`}>
                  {t.type === 'revenu' ? '+' : '-'}{parseFloat(t.montant).toLocaleString()} FCFA
                </p>
                <button onClick={() => handleDelete(t.id)}
                  className="text-red-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}