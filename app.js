
//////////////part for appoinment///////////
// Check if user is a doctor
const isDoctor = true; // Replace with your actual logic to determine if the user is a doctor

if (!isDoctor) {
window.location.href = "./frontend/index.html"; // Redirect to index.html or any other page
}

// Function to fetch and display the list of doctors
function fetchAndDisplayDoctors() {
fetch("http://localhost:3000/doctors")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error occurred while fetching the list of doctors.");
    }
    return response.json();
  })
  .then((doctors) => {
    const doctorListTable = document.getElementById("doctorList");
    doctorListTable.innerHTML = ""; // Clear existing table content

    doctors.forEach((doctor) => {
      const row = doctorListTable.insertRow();

      row.innerHTML = `
        <td>${doctor.name}</td>
        <td>${doctor.specialization}</td>
        <td>${doctor.experience} years</td>
        <td>${doctor.location}</td>
        <td>${doctor.date}</td>
        <td>${doctor.slots}</td>
        <td class="edit-button">Edit</td>
        <td class="delete-button">Delete</td>
      `;
      row.querySelector(".delete-button").addEventListener("click", () => {
        deleteDoctor(doctor.id);
      });
      row.querySelector(".edit-button").addEventListener("click",()=>{
        
      })

    });
  })
  .catch((error) => {
    console.error(error);
  });
}

function deleteDoctor(doctorId) {
fetch(`http://localhost:3000/doctors/${doctorId}`, {
  method: "DELETE",
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error occurred while deleting the doctor.");
    }
    return response.json();
  })
  .then((data) => {
    alert("Doctor deleted successfully!");
    console.log(data);
    fetchAndDisplayDoctors(); // Update the list of doctors after successful deletion
  })
  .catch((error) => {
    console.error(error);
  });
}

// Handle appointment form submission
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
appointmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const imageInput = document.getElementById("image");
  const specializationInput = document.getElementById("specialization");
  const experienceInput = document.getElementById("experience");
  const locationInput = document.getElementById("location");
  const dateInput = document.getElementById("date");
  const slotsInput = document.getElementById("slots");
  const feeInput = document.getElementById("fee");

  const name = nameInput.value;
  const image = imageInput.value;
  const specialization = specializationInput.value;
  const experience = experienceInput.value;
  const location = locationInput.value;
  const date = dateInput.value;
  const slots = slotsInput.value;
  const fee = feeInput.value;

  const newDoctor = {
    name,
    image,
    specialization,
    experience,
    location,
    date,
    slots,
    fee,
  };

  fetch("http://localhost:3000/doctors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDoctor),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred while creating the appointment.");
      }
      return response.json();
    })
    .then((data) => {
      alert("Appointment created successfully!");
      console.log(data);
      // Reset the form after successful submission
      appointmentForm.reset();
      fetchAndDisplayDoctors(); // Update the list of doctors after successful submission
    })
    .catch((error) => {
 
      console.error(error);
    });
});
}

// Fetch and display the list of doctors on page load
fetchAndDisplayDoctors();


const appointmentsContainer = document.getElementById("appointmentsContainer");
const filterButton = document.getElementById("applyFilters");

let appointmentsData = []; // Array to store the fetched appointments
let currentPage = 1;
const appointmentsPerPage = 4;

// Fetch and display the appointments
function fetchAndDisplayAppointments() {
fetch("http://localhost:3000/doctors")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error occurred while fetching the list of appointments.");
    }
    return response.json();
  })
  .then((appointments) => {
    appointmentsData = appointments;
    applyFiltersAndDisplayAppointments();
  })
  .catch((error) => {
    console.error(error);
  });
}
