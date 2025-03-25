const displayCharactersfromJSONDB = () => {
    const display = document.querySelector(".display-characters");

    fetch("http://localhost:3000/characters", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        display.innerHTML = ""; // Clear previous content

        data.forEach((character) => {
            // Create card container
            const characterCard = document.createElement("div");
            characterCard.classList.add("card");

            // Create image element
            const characterImage = document.createElement("img");
            characterImage.src = character.image;
            characterImage.alt = character.name;

            // Create card content container
            const cardContent = document.createElement("div");
            cardContent.classList.add("card-content");

            // Create Name element
            const characterName = document.createElement("h2");
            characterName.classList.add("name");
            characterName.textContent = character.name;

            // Create species element
            const characterSpecies = document.createElement("p");
            characterSpecies.classList.add("species");
            characterSpecies.textContent = character.species; 

            // Create gender element
            const characterGender = document.createElement("p");
            characterGender.classList.add("gender");
            characterGender.textContent = character.gender; 

            // Create status element
            const characterStatus = document.createElement("p");
            characterStatus.classList.add("status");
            characterStatus.textContent = character.status; 

            // Append elements to card
            cardContent.appendChild(characterName);
            cardContent.appendChild(characterSpecies);
            cardContent.appendChild(characterGender);
            cardContent.appendChild(characterStatus);
            characterCard.appendChild(characterImage);
            characterCard.appendChild(cardContent);

            // Append card to display container
            display.appendChild(characterCard);

        });
        console.log(display)
    })
    .catch(error => console.error("Error fetching characters:", error));
};

function displayCharacterDetails() {
    
}

displayCharactersfromJSONDB();
