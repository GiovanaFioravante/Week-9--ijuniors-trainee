// src/index.ts ← apenas sobe o servidor
import { app } from './config/expressConfig';

app.listen(3030, () => {
  console.log('🚀 Servidor rodando na porta 3030');
});