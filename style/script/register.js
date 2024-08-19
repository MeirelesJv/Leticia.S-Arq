// Validador de Cep e complemento de endereço
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('road').value = ("");
    document.getElementById('neighborhood').value = ("");
    document.getElementById('city').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('road').value = (conteudo.logradouro);
        document.getElementById('neighborhood').value = (conteudo.bairro);
        document.getElementById('city').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('road').value = "...";
            document.getElementById('neighborhood').value = "...";
            document.getElementById('city').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};





 //Validar email e cpf
const isValidEmail = (email) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(email).toLowerCase())
}
  
const isValidCPF = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    return regex.test(String(cpf).toLowerCase())
}

const validateInput = () => {
    isValidForm = true
    if (!isValidCPF(cpfInput.value)) {
        cpfInvalid.classList.remove('invalid-none')
        isValidForm = false
    }
  
    if (!isValidEmail(emailInput.value)) {
        emailInvalid.classList.remove('invalid-none')
        isValidForm = false
    }
}
  

// Validador de campos existentes
const form = document.getElementById('registerForm');
const email = document.getElementById('emailAlert');
const cpf = document.getElementById('cpfAlert');
const serv = document.getElementById('serv')

const emailInvalid = document.getElementById('emailInvalid')
const cpfInvalid = document.getElementById('cpfInvalid')
const cpfInput = document.getElementById('cpf');
const emailInput = document.getElementById('email');


function mascara(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
 }
 
let isValidForm = false

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    validateInput()

    if(isValidForm){
        
    const formData = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value,
        birth: document.getElementById('birth').value,
        tel: document.getElementById('tel').value,
        password: document.getElementById('password').value,
        cep: document.getElementById('cep').value,
        road: document.getElementById('road').value,
        neighborhood: document.getElementById('neighborhood').value,
        city: document.getElementById('city').value,
        uf: document.getElementById('uf').value
    };
  
    try {
        const response = await axios.post('/users/register', formData);
        window.location = '/login';
    } catch (error) {
        var data = error.response.data.message
        invalidateElem(data);
    }
    }

  });

  function invalidateElem(data) {
    if(data == "Email já cadastrado"){
        email.classList.remove('invalid-none')
    }else if(data == "Cpf já cadastrado"){
        cpf.classList.remove('invalid-none')
    }else {
        serv.classList.remove('invalid-none')
    }
  }

 