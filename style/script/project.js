const approval = document.getElementById('approval');
const reject = document.getElementById('reject');
const form = document.getElementById('projectEdit');
const workButton = document.getElementById('workButton');
const modal = document.getElementById('modal');
const close = document.getElementById('close');

//Modal
workButton.addEventListener('click' ,(event)=>{
    modal.classList.remove('modalNone')
})

close.addEventListener('click' ,(event)=>{
    modal.classList.add('modalNone')
})

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

//Axios References
form.addEventListener('submit', async (event) => {
    // event.target.querySelector("button[type=submit]").disabled = true;
    event.preventDefault();

    const fileReference = document.getElementById('fileReferenceAdm').files[0]
    const fileLayout = document.getElementById('fileLayout').files[0]
    const fileMarcenaria = document.getElementById('fileMarcenaria').files[0]
    const fileRender = document.getElementById('fileRender').files[0]
    const fileTecnico = document.getElementById('fileTecnico').files[0]
    const filePlanta = document.getElementById('filePlanta').files[0]
    const fileModeling = document.getElementById('fileModeling').files[0]
    const filePrinc = document.getElementById('filePrinc').files[0]
    const projectRoute = document.getElementById('projectRoute').value;
    const projectId = document.getElementById('projectId').value;
    const renderApi = document.getElementById('renderApi').value;

    const formData = new FormData();
    formData.append('projectRoute',projectRoute)
    formData.append('fileReferenceAdm', fileReference);
    formData.append('projectId', projectId);
    formData.append('fileLayout', fileLayout);
    formData.append('fileMarcenaria', fileMarcenaria);
    formData.append('fileRender', fileRender);
    formData.append('fileTecnico', fileTecnico);
    formData.append('filePlanta', filePlanta);
    formData.append('fileModeling', fileModeling);
    formData.append('renderApi', renderApi);
    formData.append('filePrinc', filePrinc);

    try {
        await axios({
            method: "POST",
            url: "/project/edit/referencesAdm",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        })

        window.location.reload();
    } catch (error) {
        // event.target.querySelector("button[type=submit]").disabled = false;
        console.log(error)
    }
});

//Axios Approval
approval.addEventListener('click', async (event) => {
    event.preventDefault()

    try {
        axios.post('/project/edit/approve', {
            projectId: document.getElementById('projectId').value,
            approval: 2,
        });

        window.location.reload();
    } catch (error) {
        console.log(error)
    }
});

reject.addEventListener('click', async (event) => {
    event.preventDefault()

    try {
        axios.post('/project/edit/approve', {
            projectId: document.getElementById('projectId').value,
            approval: 1,
        });

        window.location.reload();
    } catch (error) {
        console.log(error)
    }
});

//Axios WorkFile
const formWork = document.getElementById('formWork');
formWork.addEventListener('submit', async (event)=>{
    event.preventDefault();

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

        window.location.reload();
    } catch (error) {
        // event.target.querySelector("button[type=submit]").disabled = false;
    }
});

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
