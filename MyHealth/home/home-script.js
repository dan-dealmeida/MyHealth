// Define the user accessing the page
const storedLogin = localStorage.getItem("login");
const loginObject = JSON.parse(storedLogin);
const user = loginObject;

// Dados das vacinas 
const vaccines = user.vaccines;

// Função para criar o elemento col com os dados da vacina
function createVaccineElement(vaccine) {
  const col = document.createElement('div');
  col.classList.add('col');

  const h2 = document.createElement('h2');
  h2.textContent = vaccine.vname;
  col.appendChild(h2);

  const dose = document.createElement('p');
  dose.id = 'dose';
  dose.textContent = vaccine.dose;
  col.appendChild(dose);

  const vdate = document.createElement('p');
  vdate.textContent = vaccine.vdate;
  col.appendChild(vdate);

  const img = document.createElement('img');
  img.src = vaccine.image;
  img.alt = 'Comprovante de Vacina';
  col.appendChild(img);

  const nextDate = document.createElement('p');
  nextDate.id = 'next_date';
  nextDate.textContent = vaccine.vdate2 ? `Próxima dose em: ${vaccine.vdate2}` : 'Não há próxima dose';
  col.appendChild(nextDate);

  return col;
}

// Função para exibir as vacinas no HTML
function displayVaccines(vaccines) {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  for (const vaccine of vaccines) {
    const col = createVaccineElement(vaccine);
    container.appendChild(col);
  }
}

// Exibe todas as vacinas ao carregar a página
displayVaccines(vaccines);

// Barra de busca
const searchInput = document.querySelector('.search input');
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredVaccines = vaccines.filter(vaccine => vaccine.vname && vaccine.vname.toLowerCase().includes(searchValue));
  displayVaccines(filteredVaccines);
});

// Event delegation for click event listeners
const container = document.querySelector('.container');
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('col')) {
    handleClick(event.target);
  }
});

function handleClick(card) {
  const vname = card.querySelector('h2').textContent;
  const dose = card.querySelector('#dose').textContent;
  const vdate = card.querySelector('p:nth-of-type(2)').textContent;
  const vdate2 = card.querySelector('#next_date').textContent;
  const imageSrc = card.querySelector('img').src;

  const vaccineData = {
    vname,
    dose,
    vdate,
    vdate2,
    image: imageSrc,
  };

  user.vaccines.push(vaccineData);

  localStorage.setItem('vaccineData', JSON.stringify(vaccineData));

  window.location.href = '/editarVacina/editarVacina.html';
}





/*

Personal notes: for future development
- Save the  login object vaccines: [] to the user object vaccines: []
- figure out how to load images: images are not loading in home and in the newVaccine preview
- delete and edit not working:
 edit page saves in login object line 31 ....
 the home page is not updated with edited values
*/