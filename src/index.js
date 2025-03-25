const displayCharactersfromJSONDB = () => {
    const display = document.querySelector(".display-characters");
    const selected = document.querySelector("#selected-character")

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

            // Add event listener to characterCard

            // Could not create callback function outside function because needed access to localized variable
            characterCard.addEventListener("click", () => {
                fetch(`https://rickandmortyapi.com/api/character/${character.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type" : "Application/json",
                        "Accept" : "Application/json",
                    },
                })
                .then(response => response.json())
                .then(characterData => {
                    console.log(characterData)
                    display.innerHTML = ""

                    selected.innerHTML = `
                        <div class="character-container">
                            <div class="character-info">
                                <h2 id="char-name">${characterData.name}</h2>
                                <p><strong>Status:</strong> <span id="char-status">${characterData.status}</span></p>
                                <p><strong>Species:</strong> <span id="char-species">${characterData.species}</span></p>
                                <p><strong>Gender:</strong> <span id="char-gender">${characterData.gender}</span></p>
                                <p><strong>Origin:</strong> <span id="char-origin">${characterData.origin.name}</span></p>
                                <p><strong>Location:</strong> <span id="char-location">${characterData.location.name}</span></p>
                            </div>
                            <div class="character-image">
                                <img id="${characterData.name}" src="https://rickandmortyapi.com/api/character/avatar/${characterData.id}.jpeg" alt="${characterData.name}">
                            </div>
                        </div>

                    `
                    console.log(selected)
                })
            })

            // Append card to display container
            display.appendChild(characterCard);

        });
    })
    .catch(error => console.error("Error fetching characters:", error));
};

function displayCharacterDetails() {

}

displayCharactersfromJSONDB();
