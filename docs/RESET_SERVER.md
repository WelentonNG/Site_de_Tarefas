# 🔄 Sistema de Reset do Servidor

## Comandos Disponíveis

### Reset Completo
```bash
npm run reset
```
**O que faz:**
- ✅ Encerra processos na porta 3000
- ✅ Aguarda liberação da porta
- ✅ Limpa cache do Node.js
- ✅ Reinicia o servidor

### Reset Rápido
```bash
npm run reset:quick
```
**O que faz:**
- ✅ Limpa cache do Node.js
- ✅ Inicia o servidor imediatamente

### Uso Direto
```bash
# Reset completo
node server/reset_server.js

# Reset rápido
node server/reset_server.js --quick
# ou
node server/reset_server.js -q
```

## 🎯 Quando Usar

### Reset Completo (`npm run reset`)
Use quando:
- O servidor travar e não responder
- A porta 3000 estiver ocupada
- Precisar de um reinício limpo
- Houver problemas de conexão

### Reset Rápido (`npm run reset:quick`)
Use quando:
- Fez mudanças no código
- Quer testar rapidamente
- Não há processos travados

## 🛑 Parar o Servidor

Pressione `Ctrl + C` no terminal para encerrar graciosamente.

## 🔍 Detalhes Técnicos

### Funções Principais

1. **findProcessOnPort()** - Encontra processos na porta
2. **killProcessOnPort()** - Encerra processos
3. **clearCache()** - Limpa require cache
4. **startServer()** - Inicia o servidor
5. **reset()** - Processo completo de reset

### Plataformas Suportadas

- ✅ Windows
- ✅ macOS
- ✅ Linux

## 💡 Exemplos de Uso

```javascript
// Usar programaticamente
const ServerResetManager = require('./server/reset_server.js');

const manager = new ServerResetManager();

// Reset completo
await manager.reset();

// Reset rápido
await manager.quickRestart();
```

## 🐛 Solução de Problemas

### Erro: "Porta já em uso"
```bash
npm run reset
```

### Erro: "Arquivo não encontrado"
Verifique se `server/server.js` existe

### Processo não encerra
Execute manualmente:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /F /PID [PID_NUMBER]

# Linux/Mac
lsof -ti:3000
kill -9 [PID_NUMBER]
```
