const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta raiz do projeto
app.use(express.static(path.join(__dirname, '..')));

// rota principal - serve o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/pages/login/login.html'));
});

// inicia o servidor
app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`🚀 Servidor rodando em ${url}`);
    console.log(`📂 Abrindo login.html no navegador...`);
    
    // Abre o navegador automaticamente
    const command = process.platform === 'win32' 
        ? `start ${url}` 
        : process.platform === 'darwin' 
        ? `open ${url}` 
        : `xdg-open ${url}`;
    
    exec(command);
});
