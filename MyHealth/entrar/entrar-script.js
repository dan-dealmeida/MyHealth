

const form = document.querySelector('form');
const emailInput = document.getElementById('Email');
const passwordInput = document.getElementsByName('password')[0];

// Obtém os usuários salvos no localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];


function findUserByEmail(email) {
  
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return i; // Return the index of the user with the matching email
    }
  }
  
  return -1; // Return -1 if no user with the specified email is found
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;


  // Procura o usuário com o email e senha correspondentes
  const user = users.find((user) => user.email === email && user.password === password);
  localStorage.setItem("login", JSON.stringify(user));
  
  if (user) {
    alert('Login realizado com sucesso.');
    //carrega as informaçÕes do usuario no Home
    
    // Redireciona para a home
    window.location.href = '/home/home.html';
  } else {
    alert('Email ou senha inválidos. Por favor, tente novamente.');
  }
  
});


