const approval = document.getElementById('approval');
const reject = document.getElementById('reject');
const form = document.getElementById('projectEdit')

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

//Mostrar o nome do arquivo
function showFileName(input,Deescre) {
    if (input.files && input.files[0]) {
        var fileName = input.files[0].name;
        document.getElementById(Deescre).textContent = fileName;
    } else {
        document.getElementById(Deescre).textContent = 'Nenhum arquivo selecionado';
    }
}

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
    const fileRevest = document.getElementById('fileRevest').files[0]
    const projectRoute = document.getElementById('projectRoute').value;
    const projectId = document.getElementById('projectId').value;
    const marcName = document.getElementById('marcName').value;
    const marcCode = document.getElementById('marcCode').value;
    const marcMarca = document.getElementById('marcMarca').value;
    const revestName = document.getElementById('revestName').value;
    const revestCode = document.getElementById('revestCode').value;
    const revestMarca = document.getElementById('revestMarca').value;
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
    formData.append('fileRevest', fileRevest);
    formData.append('marcName', marcName);
    formData.append('marcCode', marcCode);
    formData.append('marcMarca', marcMarca);
    formData.append('revestName', revestName);
    formData.append('revestCode', revestCode);
    formData.append('revestMarca', revestMarca);
    formData.append('renderApi', renderApi);

    try {
        await axios({
            method: "POST",
            url: "/project/edit/referencesAdm",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        })

        // window.location.reload();
    } catch (error) {
        // event.target.querySelector("button[type=submit]").disabled = false;
        console.log(error)
    }
});