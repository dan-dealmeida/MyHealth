// Retrieve login data from local storage
const storedLogin = localStorage.getItem("login");
const loginObject = JSON.parse(storedLogin);

// Retrieve vaccine data from local storage
const storedVaccineData = localStorage.getItem("vaccineData");
const vaccineData = JSON.parse(storedVaccineData);

// Display the vaccine values in the form inputs
document.getElementById('vname').value = vaccineData.vname;

const doseInputs = document.getElementsByName('dose');
for (let i = 0; i < doseInputs.length; i++) {
  if (doseInputs[i].value === vaccineData.dose) {
    doseInputs[i].checked = true;
    break;
  }
}

document.getElementById('vdate').value = vaccineData.vdate;
document.getElementById('vdate2').value = vaccineData.vdate2;

function deleteVaccine(event) {
    event.preventDefault();
  
    // Display a confirmation pop-up
    const confirmed = confirm("Tem certeza de que deseja excluir esta vacina?");
  
    if (confirmed) {
      // Find the index of the vaccine to remove in the login object's vaccines array
      const vaccineIndex = loginObject.vaccines.findIndex(vaccine => vaccine.vname === vaccineData.vname && vaccine.dose === vaccineData.dose && vaccine.vdate === vaccineData.vdate && vaccine.vdate2 === vaccineData.vdate2);
  
      // Remove the vaccine from the login object's vaccines array if found
      if (vaccineIndex > -1) {
        loginObject.vaccines.splice(vaccineIndex, 1);
      }
  
      // Save the modified login object back to local storage
      localStorage.setItem("login", JSON.stringify(loginObject));
  
      alert('Vacina removida com sucesso.');
  
      window.location.href = '/home/home.html';
    }
  }
  
// Function to edit a vaccine
function editVaccine(event) {
  event.preventDefault();

  // Find the index of the vaccine to edit in the login object's vaccines array
  const vaccineIndex = loginObject.vaccines.findIndex(vaccine => vaccine.vname === vaccineData.vname && vaccine.dose === vaccineData.dose && vaccine.vdate === vaccineData.vdate && vaccine.vdate2 === vaccineData.vdate2);

  // Update the vaccine data in the login object's vaccines array if found
  if (vaccineIndex > -1) {
    const updatedVaccine = {
      vname: document.getElementById('vname').value,
      dose: document.querySelector('input[name="dose"]:checked').value,
      vdate: document.getElementById('vdate').value,
      vdate2: document.getElementById('vdate2').value,
    };
    loginObject.vaccines[vaccineIndex] = updatedVaccine;
  }

  // Save the modified login object back to local storage
  localStorage.setItem("login", JSON.stringify(loginObject));

  alert('Vacina atualizada com sucesso.');

  window.location.href = '/home/home.html';
}

// Add click event listener to the delete button
const deleteButton = document.getElementById('send-button');
deleteButton.addEventListener('click', deleteVaccine);

// Add submit event listener to the form for editing the vaccine
const editForm = document.querySelector('form');
editForm.addEventListener('submit', editVaccine);
