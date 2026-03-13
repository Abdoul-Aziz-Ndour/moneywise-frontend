import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { transactionService } from '../services/api'

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: 'revenu', montant: '', categorie: '',
    description: '', date: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async () => {
    await transactionService.create(form)
    navigate('/transactions')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ajouter une transaction</h1>
      <div className="bg-white rounded-2xl shadow-sm border p-6 max-w-md">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setForm({...form, type: 'revenu'})}
            className={`flex-1 p-2 rounded-xl font-medium ${form.type === 'revenu' ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}>
            💰 Revenu
          </button>
          <button
            onClick={() => setForm({...form, type: 'depense'})}
            className={`flex-1 p-2 rounded-xl font-medium ${form.type === 'depense' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}>
            💸 Dépense
          </button>
        </div>
        <input type="number" placeholder="Montant"
          onChange={(e) => setForm({...form, montant: e.target.value})}
          className="w-full border p-2 rounded-xl mb-3" />
        <input type="text" placeholder="Catégorie"
          onChange={(e) => setForm({...form, categorie: e.target.value})}
          className="w-full border p-2 rounded-xl mb-3" />
        <input type="text" placeholder="Description"
          onChange={(e) => setForm({...form, description: e.target.value})}
          className="w-full border p-2 rounded-xl mb-3" />
        <input type="date"
          onChange={(e) => setForm({...form, date: e.target.value})}
          className="w-full border p-2 rounded-xl mb-4" />
        <button onClick={handleSubmit}
          className="w-full bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600">
          Ajouter la transaction
        </button>
      </div>
    </div>
  )
}