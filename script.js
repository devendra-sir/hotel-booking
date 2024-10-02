document.addEventListener('DOMContentLoaded', function() {
    // Initially hide the room availability section
    document.querySelector('.room-availability').style.display = 'none';

    document.getElementById('search-rooms').addEventListener('click', function() {
        const checkinDate = new Date(document.getElementById('checkin').value);
        const checkoutDate = new Date(document.getElementById('checkout').value);
        const today = new Date();
        
        // Validate if dates are for the next week
        if (checkinDate > today && checkinDate <= today.setDate(today.getDate() + 7) && checkoutDate > checkinDate) {
            updateRoomAvailability(checkinDate, checkoutDate);
            // Show the room availability section
            document.querySelector('.room-availability').style.display = 'block';
        } else {
            alert("Please select valid dates for next week.");
        }
    });

    function updateRoomAvailability(checkinDate, checkoutDate) {
        const rooms = [
            { number: 1, status: 'available' },
            { number: 2, status: 'booked' },
            { number: 3, status: 'reserved' },
            { number: 4, status: 'available' },
            { number: 5, status: 'available' },
            { number: 6, status: 'reserved' },
            { number: 7, status: 'booked' },
            { number: 8, status: 'available' },
            { number: 9, status: 'available' },
            { number: 10, status: 'booked' },
        ];

        let availabilityHtml = `
            <table>
                <tr>
                    <th>Room Number</th>
                    <th>Status</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                    <th>Timing</th>
                </tr>`;
        
        rooms.forEach(room => {
            let statusSymbol = '';
            if (room.status === 'available') {
                statusSymbol = '<span style="color: green;">●</span>';
            } else if (room.status === 'booked') {
                statusSymbol = '<span style="color: red;">●</span>';
            } else if (room.status === 'reserved') {
                statusSymbol = '🔒';
            }
            
            availabilityHtml += `
                <tr>
                    <td>Room ${room.number}</td>
                    <td>${statusSymbol}</td>
                    <td>${checkinDate.toLocaleDateString()}</td>
                    <td>${checkoutDate.toLocaleDateString()}</td>
                    <td>${checkinDate.getHours()}:${checkinDate.getMinutes().toString().padStart(2, '0')} - ${checkoutDate.getHours()}:${checkoutDate.getMinutes().toString().padStart(2, '0')}</td>
                </tr>`;
        });
        
        availabilityHtml += '</table>';
        
        document.getElementById('room-availability').innerHTML = availabilityHtml;

        // Display the check-in and check-out dates
        document.getElementById('dates-display').innerHTML = `
            <p>Check-in Date: ${checkinDate.toLocaleDateString()}</p>
            <p>Check-out Date: ${checkoutDate.toLocaleDateString()}</p>
        `;
    }
});

// Get modal element
const modal = document.getElementById("bookingModal");
const bookNowButton = document.getElementById("bookNowButton");
const closeModal = document.getElementById("closeModal");

// Show the modal when "Book Now" button is clicked
bookNowButton.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the user clicks on <span> (x)
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

