import 'dotenv/config'
import { createApp } from './config/expressConfig'

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido nas variáveis de ambiente')
}
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não definido nas variáveis de ambiente')
}

const app = createApp()
const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
