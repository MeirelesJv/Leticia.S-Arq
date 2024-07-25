const { Token } = require("tedious/lib/token/token");

//select
const selectElement = document.getElementById('serviceSelect');
const resultadoElement = document.getElementById('description');
const fileElement = document.getElementById('titleFile');
const fileDescription = document.getElementById('descriptionFile');
const filesDiv = document.getElementById('filesDiv');
const inputFile = document.getElementById('files');
const inputDescription = document.getElementById('filesReference');
const nameDescription = document.getElementById('descriptionFilename');
const form = document.getElementById('formProject');

const opcoes = {
    option1: 'Projeto de interiores é uma área da arquitetura que se dedica a planejar e organizar espaços internos, buscando a funcionalidade, estética e o bem-estar dos usuários',
    option2: 'Modelagem 3D é a criação de representações virtuais tridimensionais de projetos arquitetônicos utilizando softwares especializado. É como construir um modelo físico da edificação, mas de forma digital, permitindo visualizar e interagir com o projeto em todas as suas dimensões antes mesmo de ele ser construído.',
    option3: 'Renderização é o processo de transformar um modelo 3D em uma imagem bidimensional realista',
    option4: 'Planta humanizada é uma representação gráfica de um projeto arquitetônico que busca transmitir a ideia do espaço construído de forma mais clara e intuitiva '
};

const opcoesFile = {
    option2: 'Arquivos necessario: Projeto arquitetonico (Caso não tenha, solicitar um Projetos de interiores)',
    option3: 'Arquivos necessario: Maquete 3d (Caso não tenha, solicitar uma modelagem 3d)',
    option4: 'Arquivos necessario: Maquete 3d ou um Projeto Arquitetonico',
}

const opcoesName = {
    option1: 'Anexar arquivos necessarios para um Projeto de Interiores',
    option2: 'Anexar arquivos necessarios para uma Modelagem 3D',
    option3: 'Anexar arquivos necessarios para uma Renderização',
    option4: 'Anexar arquivos necessarios para uma Planta humanizada'
}

// Adiciona o evento onchange
selectElement.addEventListener('change', function () {
    // Obtém o valor selecionado
    const valorSelecionado = selectElement.value;

    // Atualiza o texto do parágrafo
    resultadoElement.textContent = opcoes[valorSelecionado];

    if (valorSelecionado != 'option1') {
        fileDescription.textContent = opcoesFile[valorSelecionado];
        fileElement.textContent = opcoesName[valorSelecionado];
        filesDiv.classList.remove('files-none');
        inputFile.setAttribute('required');
    } else {
        filesDiv.classList.add('files-none');
        inputFile.removeAttribute('required');
    }

});

//Mostrar o nome do arquivo

function showFileName(input) {
    if (input.files && input.files[0]) {
        var fileName = input.files[0].name;
        document.getElementById('descriptionFilename').textContent = fileName;
    } else {
        document.getElementById('descriptionFilename').textContent = 'Nenhum arquivo selecionado';
    }
}

function FileName(input) {
    if (input.files && input.files[0]) {
        var fileName = input.files[0].name;
        document.getElementById('Filename').textContent = fileName;
    } else {
        document.getElementById('Filename').textContent = 'Nenhum arquivo selecionado';
    }
}


//Axios
const axiosConfig = {
    headers: {
        Autorization: "Bearer " + localStorage.getItem("token")
    }
}

let isValidForm = false

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = {
        title: document.getElementById('title').value,
        serviceSelect: document.getElementById('serviceSelect').value,
        textarea: document.getElementById('textarea').value,
        files: document.getElementById('files').value,
        filesReference: document.getElementById('filesReference').value,
    }

    try {
        const response = await axios.post('/project', formData,axiosConfig);
        console.log("teste 1")
        window.location = '/home';
    } catch (error) {
        var data = error.response.data.message
        invalidateElem(data);
    }


});

function invalidateElem(data) {
    if (data == "Email já cadastrado") {
        email.classList.remove('invalid-none')
    } else if (data == "Cpf já cadastrado") {
        cpf.classList.remove('invalid-none')
    } else {
        serv.classList.remove('invalid-none')
    }
}
