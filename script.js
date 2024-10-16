const users = []; // Simulated user database
let currentUser = null;
const reservations = []; // Store reservations

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulated login
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        showReservationContainer();
    } else {
        alert('Invalid credentials');
    }
});

document.getElementById('registerBtn').addEventListener('click', function() {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    if (username && password) {
        users.push({ username, password });
        alert('User registered successfully!');
    }
});

function showReservationContainer() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('reservationContainer').style.display = 'block';
    document.getElementById('name').value = currentUser.username; // Pre-fill name
}

document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const table = document.getElementById('table').value;

    // Check for existing reservations
    const isAlreadyBooked = reservations.some(reservation => 
        reservation.date === date && 
        reservation.time === time && 
        reservation.table === table
    );

    if (isAlreadyBooked) {
        alert('This table is already booked for the selected date and time.');
        return;
    }

    const reservationsList = document.getElementById('reservationsList');

    const reservationItem = document.createElement('div');
    reservationItem.className = 'reservation-item';
    reservationItem.innerHTML = `
        <strong>${name}</strong> (${email})<br>
        Date: ${date}, Time: ${time}, Table: ${table}
        <button class="delete-btn">Delete</button>
    `;

    reservations.push({ name, email, date, time, table }); // Store reservation

    const deleteButton = reservationItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        reservationsList.removeChild(reservationItem);
        // Remove from reservations array
        const index = reservations.findIndex(reservation => 
            reservation.date === date && 
            reservation.time === time && 
            reservation.table === table
        );
        if (index > -1) {
            reservations.splice(index, 1);
        }
    });

    reservationsList.appendChild(reservationItem);

    // Clear the form
    document.getElementById('reservationForm').reset();
});
