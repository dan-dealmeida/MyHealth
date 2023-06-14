const form = document.querySelector('form');
const vdateInput = document.getElementById('vdate');
const vnameInput = document.getElementById('vname');
const doseInputs = document.getElementsByName('dose');
const vdate2Input = document.getElementById('vdate2');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const vdate = vdateInput.value;
  const vname = vnameInput.value;
  let dose = '';

  // Verifica qual dose foi selecionada
  for (const doseInput of doseInputs) {
    if (doseInput.checked) {
      dose = doseInput.value;
      break;
    }
  }

  const vdate2 = vdate2Input.value;
  const image = imageInput.files[0];

  // Cria um objeto de vacina com os dados
  const vaccine = {
    vdate,
    vname,
    dose,
    vdate2,
    image: image ? URL.createObjectURL(image) : ''
  };
  
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    const reader = new FileReader();
  
    reader.addEventListener('load', () => {
      // Create an image element and set its source to the loaded file data
      const imgElement = document.createElement('img');
      imgElement.src = reader.result;
      imgElement.alt = 'Selected Image Preview';
  
      // Remove any previously loaded preview image and append the new one
      imagePreview.innerHTML = '';
      imagePreview.appendChild(imgElement);
    });
  
    if (file) {
      reader.readAsDataURL(file);
    }
  });


  // Retrieve the login JSON object from local storage
  const storedLogin = localStorage.getItem("login");
  const loginObject = JSON.parse(storedLogin);

  // Add the vaccine to the login object
  if (!loginObject.vaccines) {
    loginObject.vaccines = []; // Create an empty vaccines array if it doesn't exist
  }
  loginObject.vaccines.push(vaccine);

  // Save the modified login object back to local storage
  localStorage.setItem("login", JSON.stringify(loginObject));

  alert('Vacina cadastrada com sucesso.');

  window.location.href = '/home/home.html';
});
