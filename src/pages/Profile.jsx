import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profil</h1>
      <div className="bg-white rounded-2xl shadow-sm border p-6 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-700 font-bold text-2xl">
              {user?.user?.first_name?.[0] || '?'}
            </span>
          </div>
          <div>
            <p className="font-bold text-lg">{user?.user?.first_name}</p>
            <p className="text-gray-500">{user?.user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">
          Se déconnecter
        </button>
      </div>
    </div>
  )
}

