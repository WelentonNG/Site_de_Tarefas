// Configuração de usuários (em produção, isso viria de um backend)
const validUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' }
];

// Toggle mostrar/ocultar senha
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

// Função para mostrar alertas
function showAlert(message, type) {
    // Remove alertas existentes
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
        <span>${message}</span>
    `;

    const form = document.getElementById('loginForm');
    form.parentElement.insertBefore(alert, form);

    // Remove após 5 segundos
    setTimeout(() => {
        alert.style.animation = 'slideUp 0.3s ease-out reverse';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const btnLogin = document.querySelector('.btn-login');

    // Validação básica
    if (!username || !password) {
        showAlert('Por favor, preencha todos os campos!', 'error');
        return;
    }

    // Adiciona loading
    btnLogin.classList.add('loading');

    // Simula delay de autenticação
    setTimeout(() => {
        // Verifica credenciais
        const user = validUsers.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            // Salva sessão
            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            }
            sessionStorage.setItem('currentUser', username);
            sessionStorage.setItem('isLoggedIn', 'true');

            showAlert('Login realizado com sucesso!', 'success');

            // Redireciona para a página de tarefas
            setTimeout(() => {
                window.location.href = 'pages/tasks.html';
            }, 1000);
        } else {
            btnLogin.classList.remove('loading');
            showAlert('Usuário ou senha incorretos!', 'error');
        }
    }, 1500);
});

// Preencher username se "lembrar-me" estava marcado
window.addEventListener('load', () => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
        document.getElementById('password').focus();
    }
});

// Link de cadastro (placeholder)
document.getElementById('registerLink').addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('Funcionalidade de cadastro em desenvolvimento!', 'error');
});

// Link esqueceu senha (placeholder)
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('Funcionalidade de recuperação de senha em desenvolvimento!', 'error');
});

// Enter para submit
document.getElementById('password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});
