const form = document.getElementById('myForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const formData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  try {
    const response = await axios.post('/users/login', formData);
    // Process successful form submission here
        console.log("TESTE 1")
  } catch (error) {
    handleError(error); // Handle error response
  }
});


function handleError(error) {
  // Verifique se o objeto de erro possui uma propriedade de resposta (erro do lado do servidor)
  if (error.response) {
    const errorData = error.response.data; // Obtenha os dados de erro da resposta

    // Analise os dados do erro e atualize os campos específicos do formulário
    if (errorData.errors) {
      errorData.errors.forEach(errorField => {
        const inputElement = document.getElementById(errorField.field); // Obtenha o elemento de entrada
        if (inputElement) {
          // Atualize a mensagem de erro ou aplique estilos de erro ao elemento de entrada
          inputElement.setCustomValidity(errorField.message);
          inputElement.classList.add('error'); // Adicione a classe de erro para formatação
        }
      });
    } else {
      // Lidar com erros gerais do formulário (por exemplo, entrada inválida)
      displayGenericFormErrorMessage();
    }
  } else {
    // Lidar com erros que não são de resposta (por exemplo, erros de rede)
    displayGenericErrorMessage();
  }
}
