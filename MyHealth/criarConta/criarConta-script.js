const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const dateInput = document.getElementById('date');
const maleInput = document.getElementById('masculino');
const femaleInput = document.getElementById('feminino');
const emailInput = document.getElementById('Email');
const passwordInput = document.getElementsByName('password')[0];
const repeatPasswordInput = document.getElementsByName('password')[1];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const date = dateInput.value;
  const gender = maleInput.checked ? 'masculino' : 'feminino';
  const email = emailInput.value;
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;

  if (name === '') {
    alert('Por favor, preencha o campo "Nome Completo".');
    return;
  }

  if (date === '') {
    alert('Por favor, preencha o campo "Data de Nascimento".');
    return;
  }

  if (!maleInput.checked && !femaleInput.checked) {
    alert('Por favor, selecione o campo "Sexo".');
    return;
  }

  if (email === '') {
    alert('Por favor, preencha o campo "Email".');
    return;
  }

  if (password === '') {
    alert('Por favor, preencha o campo "Senha".');
    return;
  }

  if (password !== repeatPassword) {
    alert('As senhas não coincidem. Por favor, tente novamente.');
    return;
  }

  const user = {
    name,
    date,
    gender,
    email,
    password,
    vaccines: []
  };
  
  let users = JSON.parse(localStorage.getItem('users')) || [];
  
  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));

  alert('Usuário cadastrado com sucesso.');

  window.location.href = '/entrar/entrar.html';

});