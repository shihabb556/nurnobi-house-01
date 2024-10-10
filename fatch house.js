document.addEventListener("DOMContentLoaded", () => {
    const propertyList = document.getElementById('property-list');
    const statusMessage = document.getElementById('statusMessage');

    // Fetch house data from your API
    async function fetchHouses() {
        try {
            const response = await fetch('http://localhost:8000/api/v1/user/houses/available-houses'); // Replace with your API endpoint
            const houses = await response.json();

            if (houses.length === 0) {
                statusMessage.innerText = "No houses available for rent.";
            } else {
                renderHouses(houses);
            }
        } catch (error) {
            statusMessage.innerText = "Failed to load houses. Please try again later.";
        }
    }

    // Function to render house cards
    function renderHouses(houses) {
        propertyList.innerHTML = ""; // Clear the list before rendering
        houses.forEach(house => {
            const houseItem = document.createElement('div');
            houseItem.classList.add('card');

            houseItem.innerHTML = `
                <div class="card-banner">
                    <figure class="img-holder" style="--width:585; --height:390">
                        <img src="${house.imageUrl}" class="img-cover" width="585" height="390" alt="${house.realtor}">
                    </figure>
                    <span class="label-medium badge">New</span>
                    <button class="icon-btn fav-btn" aria-label="add to favorite" data-toggle-btn>
                        <span class="material-symbols-rounded" aria-hidden="true">favorite</span>
                    </button>
                </div>
                <div class="card-container">
                    <span class="title-large">$${house.price.toFixed(2)}</span>
                    <h3>
                        <a href="#" class="title-small card-title">${house.realtor}</a>
                    </h3>
                    <address class="body-medium">${house.address}</address>
                    <div class="card-meta-list">
                        <div class="meta-item">
                            <span class="material-symbols-rounded meta-icon" aria-hidden="true">bed</span>
                            <span class="meta-text label-medium">${house.bedrooms} Bed</span>
                        </div>
                        <div class="meta-item">
                            <span class="material-symbols-rounded meta-icon" aria-hidden="true">bathtub</span>
                            <span class="meta-text label-medium">${house.bathrooms} Bath</span>
                        </div>
                        <div class="meta-item">
                            <span class="material-symbols-rounded meta-icon" aria-hidden="true">straighten</span>
                            <span class="meta-text label-medium">${house.size} sqft</span>
                        </div>
                    </div>
                   <button class="view-details" onclick="openRentForm('${house._id}')">Rent Now</button>
                </div>
            `;

            propertyList.appendChild(houseItem);
        });
    }

    // Open rent form modal - making sure this function is in the global scope
    window.openRentForm = function (houseId) {
        console.log('houseId', houseId);
        const rentModal = document.getElementById('rentModal');
        document.getElementById('houseId').value = houseId;
        const user = JSON.parse(localStorage.getItem('nurnobi_user'));
        document.getElementById('userId').value = user._id;
        rentModal.style.display = 'flex';
        console.log('user id in modal', user._id);
    }

    // Close rent form modal
    function closeModal() {
        const rentModal = document.getElementById('rentModal');
        rentModal.style.display = 'none';
    }

    // Handle form submission
    document.getElementById('rentForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const houseId = document.getElementById('houseId').value;
        const userId = document.getElementById('userId').value;
        const rentStartDate = document.getElementById('rentStartDate').value;
        const rentEndDate = document.getElementById('rentEndDate').value;

        try {
            const response = await fetch('http://localhost:8000/api/v1/user/houses/rent-house', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ houseId, userId, rentStartDate, rentEndDate })
            });

            const data = await response.json();

            if (response.status === 200) {
                alert('House rented successfully!');
                closeModal();
                location.reload(); 
                fetchHouses(); // Refresh house list
            } else {
                alert('Failed to rent house: ' + data.message);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    });

    // Fetch the house data on page load
    fetchHouses();
});
