import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router'
import axios from 'axios'
import { api } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

export function Register() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setCarregando(true)
    try {
      await api.post('/auth/register', { email, senha })
      await login(email, senha)   // já entra logado após cadastrar
      navigate('/')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setErro('Este e-mail já está cadastrado.')
      } else {
        setErro('Não foi possível criar a conta. Tente novamente.')
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-zinc-800 border border-zinc-700/50 p-8 rounded-xl shadow-md">
        <h1 className="text-xl font-bold text-white tracking-wide mb-1">G.F. iRepair</h1>
        <p className="text-sm text-zinc-400 mb-6">Crie sua conta</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="voce@ijunior.com"
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-400/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-400/50 transition-colors"
            />
          </div>

          {erro && <p className="text-sm text-red-400">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-orange-400/80 hover:bg-orange-400 text-zinc-950 font-semibold text-sm py-2.5 rounded-lg mt-2 cursor-pointer transition-colors disabled:opacity-50"
          >
            {carregando ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-xs text-zinc-500 mt-6 text-center">
          Já tem conta?{' '}
          <Link to="/login" className="text-orange-400/90 hover:text-orange-400 font-medium">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}