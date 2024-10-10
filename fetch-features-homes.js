async function fetchHouses() {
    const houseListElement = document.getElementById('property-list');
    const statusMessage = document.getElementById('statusMessage');

    try {
        const response = await fetch('http://localhost:8000/api/v1/user/houses/get-houses');
        const houses = await response.json();

        if (response.status === 200) {
            if (houses.length === 0) {
                statusMessage.textContent = 'No houses available for sale.';
            } else {
                // Limit to only two houses
                const limitedHouses = houses.slice(0, 4);
                houseListElement.innerHTML = ''; // Clear the list before appending
                limitedHouses.forEach(house => {
                    const houseItem = document.createElement('div');
                    houseItem.classList.add('card'); // Use the card class for styling
                    
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
                        </div>
                    `;

                    houseListElement.appendChild(houseItem);
                });
            }
        } else {
            statusMessage.textContent = 'Failed to retrieve houses: ' + houses.message;
        }
    } catch (error) {
        statusMessage.textContent = 'An error occurred: ' + error.message;
    }
}

// Fetch the houses when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchHouses();
});
