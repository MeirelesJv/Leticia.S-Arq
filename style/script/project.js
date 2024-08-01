const approval = document.getElementById('approval');
const reject = document.getElementById('reject');

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