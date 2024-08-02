const approval = document.getElementById('approval');
const reject = document.getElementById('reject');
const form = document.getElementById('projectEdit')

//Axios Approval
// approval.addEventListener('click', async (event) => {
//     event.preventDefault()

//     try {
//         axios.post('/project/edit/approve', {
//             projectId: document.getElementById('projectId').value,
//             approval: 2,
//         });

//         window.location.reload();
//     } catch (error) {
//         console.log(error)
//     }
// });

// reject.addEventListener('click', async (event) => {
//     event.preventDefault()

//     try {
//         axios.post('/project/edit/approve', {
//             projectId: document.getElementById('projectId').value,
//             approval: 1,
//         });

//         window.location.reload();
//     } catch (error) {
//         console.log(error)
//     }
// });

//Mostrar o nome do arquivo
function showFileName(input) {
    if (input.files && input.files[0]) {
        var fileName = input.files[0].name;
        document.getElementById('descriptionFilename').textContent = fileName;
    } else {
        document.getElementById('descriptionFilename').textContent = 'Nenhum arquivo selecionado';
    }
}

//Axios References
form.addEventListener('submit', async (event) => {
    event.target.querySelector("button[type=submit]").disabled = true;
    event.preventDefault();

    const fileReference = document.getElementById('fileReferenceAdm').files[0]
    const projectRoute = document.getElementById('projectRoute').value;

    const formData = new FormData();
    formData.append('projectRoute',projectRoute)
    formData.append('fileReferenceAdm', fileReference);
    

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
        event.target.querySelector("button[type=submit]").disabled = false;
        console.log(error)
    }
});