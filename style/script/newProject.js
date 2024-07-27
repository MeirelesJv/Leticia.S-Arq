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
    interiorDesign: 'Projeto de interiores é uma área da arquitetura que se dedica a planejar e organizar espaços internos, buscando a funcionalidade, estética e o bem-estar dos usuários',
    modeling: 'Modelagem 3D é a criação de representações virtuais tridimensionais de projetos arquitetônicos utilizando softwares especializado. É como construir um modelo físico da edificação, mas de forma digital, permitindo visualizar e interagir com o projeto em todas as suas dimensões antes mesmo de ele ser construído.',
    rendering: 'Renderização é o processo de transformar um modelo 3D em uma imagem bidimensional realista',
    humanizedPlant: 'Planta humanizada é uma representação gráfica de um projeto arquitetônico que busca transmitir a ideia do espaço construído de forma mais clara e intuitiva '
};

const opcoesFile = {
    modeling: 'Arquivos necessario: Projeto arquitetonico (Caso não tenha, solicitar um Projetos de interiores)',
    rendering: 'Arquivos necessario: Maquete 3d (Caso não tenha, solicitar uma modelagem 3d)',
    humanizedPlant: 'Arquivos necessario: Maquete 3d ou um Projeto Arquitetonico',
}

const opcoesName = {
    interiorDesign: 'Anexar arquivos necessarios para um Projeto de Interiores',
    modeling: 'Anexar arquivos necessarios para uma Modelagem 3D',
    rendering: 'Anexar arquivos necessarios para uma Renderização',
    humanizedPlant: 'Anexar arquivos necessarios para uma Planta humanizada'
}

// Adiciona o evento onchange
selectElement.addEventListener('change', function () {
    // Obtém o valor selecionado
    const valorSelecionado = selectElement.value;
    // Atualiza o texto do parágrafo
    resultadoElement.textContent = opcoes[valorSelecionado];

    if (valorSelecionado != 'interiorDesign') {
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

// //Axios
form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const title = document.getElementById('title').value;
    const serviceSelect = document.getElementById('serviceSelect').value;
    const textarea = document.getElementById('textarea').value;

    const formData = new FormData();
    formData.append('filesReference', inputDescription.files[0]);
    formData.append('files', inputFile.files[0]);
    formData.append('title', title);
    formData.append('serviceSelect', serviceSelect);
    formData.append('textarea', textarea);

    try {
        await axios({
            method: "POST",
            url: "/project",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        })

        window.location = '/home';

    } catch (error) {
        console.log(error)
    }
});