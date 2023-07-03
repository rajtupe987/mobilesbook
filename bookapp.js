

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

// Display the filtered and sorted appointments
function applyFiltersAndDisplayAppointments() {
const specializationFilter = document.getElementById("specializationFilter").value;
const sortByDate = document.getElementById("sortByDate").value;
const searchDoctor = document.getElementById("searchDoctor").value.trim().toLowerCase();

let filteredAppointments = appointmentsData;

// Apply specialization filter
if (specializationFilter) {
  filteredAppointments = filteredAppointments.filter((appointment) => {
    return appointment.specialization === specializationFilter;
  });
}

// Apply search by doctor's name
if (searchDoctor) {
  filteredAppointments = filteredAppointments.filter((appointment) => {
    return appointment.name.toLowerCase().includes(searchDoctor);
  });
}

// Apply sorting by date
if (sortByDate === "asc") {
  filteredAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
} else if (sortByDate === "desc") {
  filteredAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));
}

displayAppointments(filteredAppointments);
}

// Display the appointments in the form of cards
function displayAppointments(appointments) {
const startIndex = (currentPage - 1) * appointmentsPerPage;
const endIndex = startIndex + appointmentsPerPage;
const currentAppointments = appointments.slice(startIndex, endIndex);

appointmentsContainer.innerHTML = "";

currentAppointments.forEach((appointment) => {
  const card = document.createElement("div");
  card.className = "appointment-card";

  const doctorName = document.createElement("h3");
  doctorName.textContent = appointment.name;

  const specialization = document.createElement("p");
  specialization.textContent = `Specialization: ${appointment.specialization}`;

  const date = document.createElement("p");
  date.textContent = `Date: ${appointment.date}`;

  const slots = document.createElement("p");
  slots.textContent = `Slots: ${appointment.slots}`;

  const bookButton = document.createElement("button");
  bookButton.textContent = "Book Now";
  bookButton.addEventListener("click", () => {
    if (appointment.slots > 0) {
      appointment.slots--;
      slots.textContent = `Slots: ${appointment.slots}`;
      if (appointment.slots === 0) {
        bookButton.disabled = true;
      }
    }
  });

  card.appendChild(doctorName);
  card.appendChild(specialization);
  card.appendChild(date);
  card.appendChild(slots);
  card.appendChild(bookButton);

  appointmentsContainer.appendChild(card);
});
}

// Event listener for applying filters
filterButton.addEventListener("click", applyFiltersAndDisplayAppointments);

// Fetch and display the initial list of appointments
fetchAndDisplayAppointments();
  
