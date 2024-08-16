//Axios References
const form = document.getElementById('projectEdit');
form.addEventListener('submit', async (event) => {
    // event.preventDefault();

    const formDataa = new FormData();
    const projectId = document.getElementById('projectId').value;
    formDataa.append('projectId', projectId);
    const projectRoute = document.getElementById('projectRoute').value;
    formDataa.append('projectRoute',projectRoute);
    const filePrinc = document.getElementById('filePrinc').files[0]
    formDataa.append('filePrinc', filePrinc);
    const fileReference = document.getElementById('fileReferenceAdm').files[0]
    formDataa.append('fileReferenceAdm', fileReference);
    const fileLayout = document.getElementById('fileLayout').files[0]
    formDataa.append('fileLayout', fileLayout);
    const fileMarcenaria = document.getElementById('fileMarcenaria').files[0]
    formDataa.append('fileMarcenaria', fileMarcenaria);
    const fileModeling = document.getElementById('fileModeling').files[0]
    formDataa.append('fileModeling', fileModeling);
    const fileRender = document.getElementById('fileRender').files[0]
    formDataa.append('fileRender', fileRender);
    const renderApi = document.getElementById('renderApi').value;
    formDataa.append('renderApi', renderApi);
    const filePlanta = document.getElementById('filePlanta').files[0]
    formDataa.append('filePlanta', filePlanta);
    const fileTecnico = document.getElementById('fileTecnico').files[0]
    formDataa.append('fileTecnico', fileTecnico);

    try {
        await axios({
            method: "POST",
            url: "/project/edit/referencesAdm",
            data: formDataa,
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        })

        window.location.reload();
    } catch (error) {   
        console.log(error)
    }
});

function recarregarAPagina(){
    
} 

//Status Update
async function statusupdate(stats){
    const projectId = document.getElementById('projectId').value;

    try {
        axios.post('/project/edit/status', {
            stats: stats,
            projectId: projectId
        }) 

        window.location.reload();
    } catch (error) {
        console.log(error)
    }
}

function truncate(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
} 

//Mostrar o nome do arquivo
function showFileName(input,Deescre) {
    if (input.files && input.files[0]) {
        var fileName = input.files[0].name;
        var name = truncate(fileName,20)
        document.getElementById(Deescre).textContent = name;
    } else {
        document.getElementById(Deescre).textContent = 'Nenhum arquivo selecionado';
    }
}

//ImagemPreview
const inputModal = document.getElementById('fileWork');
inputModal.addEventListener('change', (event)=>{

    const preview = document.getElementById('preview-image')

    if(preview){
        preview.remove()
    }

    const reader = new FileReader
    reader.onload= function(event) {
        const previewImage = document.createElement('img');
        previewImage.width = 115;
        previewImage.height = 100;
        previewImage.id = 'preview-image';
        previewImage.src = event.target.result;
        inputModal.insertAdjacentElement('afterend',previewImage)

    }
    reader.readAsDataURL(inputModal.files[0])
})

//Axios WorkFile
const formWork = document.getElementById('formWork');
formWork.addEventListener('submit', async (event)=>{

    const fileWork = document.getElementById('fileWork').files[0]
    const acabCode = document.getElementById('acabCode').value;
    const acabBrand = document.getElementById('acabBrand').value;
    const acabName = document.getElementById('acabName').value;
    const acabType = document.getElementById('acabType').value;
    const projectRoute = document.getElementById('projectRoute').value;
    const projectId = document.getElementById('projectId').value;

    const formDataWork = new FormData();
    formDataWork.append('projectRoute',projectRoute);
    formDataWork.append('projectId', projectId);
    formDataWork.append('fileWork', fileWork);
    formDataWork.append('acabName', acabName);
    formDataWork.append('acabBrand', acabBrand);
    formDataWork.append('acabCode', acabCode);
    formDataWork.append('acabType', acabType);

    try {
        await axios({
            method: "POST",
            url: "/project/edit/filesWork",
            data: formDataWork,
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        })

        window.location.reload(true);
    } catch (error) {
        // event.target.querySelector("button[type=submit]").disabled = false;
    }
});

//Modal
const workButton = document.getElementById('workButton');
workButton.addEventListener('click' ,(event)=>{
    modal.classList.remove('modalNone')
})

const close = document.getElementById('close');
close.addEventListener('click' ,(event)=>{
    modal.classList.add('modalNone')
})

//ModalApi
const modalApi = document.getElementById('modalApi');
const apiButton = document.getElementById('apiButton');
apiButton.addEventListener('click' ,(event)=>{
    modalApi.classList.remove('modalNone')
})

const closeApi = document.getElementById('closeApi');
closeApi.addEventListener('click' ,(event)=>{
    modalApi.classList.add('modalNone')
})

//Axios Api
const formApi = document.getElementById('formApi');
formApi.addEventListener('submit', async (event)=>{



    const formDataApi ={
        renderApi: document.getElementById('renderApi').value,
        projectId: document.getElementById('projectId').value,
    }

    try {
        const response = await axios.post('/project/edit/Api', formDataApi);
        window.location.reload(true);
    } catch (error) {
        console.log(error)
        // event.target.querySelector("button[type=submit]").disabled = false;
    }
});

//Delete
async function filesDelete(id,type,name,route){
    const projectId = document.getElementById('projectId').value;
    
    try {

        axios.post('/project/delete/referencesAdm', {
            referenceId: id,
            projectId: projectId,
            referenceType: type,
            referenceName: name,
            referenceRoute: route
        });

        window.location.reload();
    } catch (error) {
        console.error(error);
    }
}