// Verificar autenticação
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = '/public/pages/login/login.html';
        return;
    }

    // Atualiza o nome do usuário no header
    if (currentUser) {
        document.getElementById('welcomeUser').innerHTML = `Olá, <strong>${currentUser}</strong>!`;
    }
}

// Função de logout
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        sessionStorage.clear();
        window.location.href = '/public/pages/login/login.html';
    }
}

// Chave para localStorage baseada no usuário
function getStorageKey() {
    const currentUser = sessionStorage.getItem('currentUser');
    return `tarefas_${currentUser}`;
}

// Carregar tarefas do localStorage
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem(getStorageKey());
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(tarefa => {
            renderizarTarefa(tarefa);
        });
        atualizarStats();
        verificarEmptyState();
    }
}

// Salvar tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem(getStorageKey(), JSON.stringify(tarefas));
}

let tarefas = [];

function renderizarTarefa(tarefa) {
    const local = document.getElementById("localDaTarefa");
    
    // linha da tarefa
    const tarefaDiv = document.createElement("div");
    tarefaDiv.classList.add("tarefa-item");

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;

    // texto
    const texto = document.createElement("span");
    texto.textContent = tarefa.texto;
    if (tarefa.concluida) {
        texto.classList.add("riscado");
    }

    checkbox.addEventListener("change", () => {
        texto.classList.toggle("riscado");
        const index = Array.from(local.children).indexOf(tarefaDiv);
        tarefas[index].concluida = checkbox.checked;
        atualizarStats();
        salvarTarefas();
    });

    // botão apagar
    const btnApagar = document.createElement("button");
    btnApagar.innerHTML = '<i class="fas fa-trash"></i>';
    btnApagar.classList.add("btn-apagar");

    btnApagar.addEventListener("click", () => {
        tarefaDiv.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => {
            const index = Array.from(local.children).indexOf(tarefaDiv);
            tarefas.splice(index, 1);
            tarefaDiv.remove();
            atualizarStats();
            verificarEmptyState();
            salvarTarefas();
        }, 300);
    });

    tarefaDiv.appendChild(checkbox);
    tarefaDiv.appendChild(texto);
    tarefaDiv.appendChild(btnApagar);
    local.appendChild(tarefaDiv);
}

function exibirTexto() {
    const input = document.getElementById("campoBusca");
    const tarefaDigitada = input.value.trim();

    if (tarefaDigitada === "") {
        input.focus();
        return;
    }

    // Adiciona tarefa ao array
    const novaTarefa = { texto: tarefaDigitada, concluida: false };
    tarefas.push(novaTarefa);
    
    renderizarTarefa(novaTarefa);

    input.value = "";
    input.focus();
    
    atualizarStats();
    verificarEmptyState();
    salvarTarefas();
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        exibirTexto();
    }
}

function atualizarStats() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;
    
    document.getElementById("totalTarefas").textContent = `Total: ${total}`;
    document.getElementById("tarefasConcluidas").textContent = `Concluídas: ${concluidas}`;
    document.getElementById("tarefasPendentes").textContent = `Pendentes: ${pendentes}`;
}

function verificarEmptyState() {
    const emptyState = document.getElementById("emptyState");
    const local = document.getElementById("localDaTarefa");
    
    if (local.children.length === 0) {
        emptyState.classList.add("visible");
    } else {
        emptyState.classList.remove("visible");
    }
}

// Adiciona animação fadeOut ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Inicializa a aplicação
checkAuth();
carregarTarefas();
verificarEmptyState();
