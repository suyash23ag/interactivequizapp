// This file manages the leaderboard functionality for the Interactive Quiz App.

const leaderboardContainer = document.getElementById('leaderboard-container');
const leaderboardLoading = document.getElementById('leaderboard-loading');
const leaderboardEmpty = document.getElementById('leaderboard-empty');

// Function to fetch leaderboard data
async function fetchLeaderboard() {
    leaderboardLoading.classList.remove('hidden');
    leaderboardEmpty.classList.add('hidden');

    try {
        const response = await fetch('path/to/your/leaderboard/api'); // Replace with your API endpoint
        const data = await response.json();
        displayLeaderboard(data);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        leaderboardLoading.classList.add('hidden');
        leaderboardEmpty.classList.remove('hidden');
    }
}

// Function to display leaderboard data
function displayLeaderboard(data) {
    leaderboardLoading.classList.add('hidden');
    if (data.length === 0) {
        leaderboardEmpty.classList.remove('hidden');
        return;
    }

    data.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('leaderboard-entry');
        entryElement.textContent = `${entry.name}: ${entry.score} points`;
        leaderboardContainer.appendChild(entryElement);
    });
}

// Event listener for back button
document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('leaderboard-card').classList.add('hidden');
    document.getElementById('home-card').classList.remove('hidden');
});

// Fetch leaderboard data on page load
fetchLeaderboard();