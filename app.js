// Define API URL and elements
const apiUrl = 'https://api.spacexdata.com/v5/launches/latest';
const launchDetailsContainer = document.getElementById('launch-details');
const searchInput = document.getElementById('search');
const toggleThemeButton = document.getElementById('toggleTheme');

// State to hold launch data
let launchData = {};

// Fetch launch data from SpaceX API
async function fetchLaunchData() {
  try {
    const response = await fetch(apiUrl);
    launchData = await response.json();
    renderLaunchDetails(launchData);
  } catch (error) {
    console.error('Error fetching SpaceX launch data:', error);
  }
}

// Render launch details to the page
function renderLaunchDetails(data) {
  launchDetailsContainer.innerHTML = `
    <h2>Mission: ${data.name}</h2>
    <p><strong>Flight Number:</strong> ${data.flight_number}</p>
    <p><strong>Rocket:</strong> ${data.rocket.name}</p>
    <p><strong>Launch Date:</strong> ${new Date(data.date_utc).toLocaleString()}</p>
    <p><strong>Details:</strong> ${data.details || 'No details available.'}</p>
    <p><strong>Launch Pad:</strong> ${data.cores[0].landing_pad || 'N/A'}</p>
    <p><strong>Success:</strong> ${data.success ? 'Yes' : 'No'}</p>
  `;
}

// Search functionality
searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.toLowerCase();
  if (launchData.name.toLowerCase().includes(searchQuery)) {
    renderLaunchDetails(launchData);
  } else {
    launchDetailsContainer.innerHTML = '<p>No matching mission found.</p>';
  }
});

// Toggle Dark/Light theme
toggleThemeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.querySelector('.container').classList.toggle('dark-theme');
  toggleThemeButton.classList.toggle('dark-theme');
  launchDetailsContainer.classList.toggle('dark-theme');
});

// Initial Data Fetch
fetchLaunchData();
