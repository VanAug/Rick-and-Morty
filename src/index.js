const display = document.querySelector(".display-characters");
const selected = document.querySelector("#selected-character")

const displayMainCharactersfromJSONDB = () => {

    fetch("http://localhost:3000/characters", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        display.innerHTML = ""; 
        
        data.map((character) => {
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
                })
            })

            display.appendChild(characterCard);

        });
    })
};

let nextPageUrl = "https://rickandmortyapi.com/api/character"; // Initial API URL

const displayCharacters = () => {
    const allCharacters = document.querySelector("#characters");
    const loadMoreBtn = document.createElement("button");

    loadMoreBtn.classList.add("more")
    loadMoreBtn.textContent = "More";

    // Fetch characters function (pass in url for pagination)
    
    const fetchCharacters = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(character => {
                const card = document.createElement("div");
                    card.classList.add("all-characters-cards");

                    card.innerHTML = `
                        <img src="${character.image}" alt="${character.name}" class="all-characters-imgs">
                        <div class="all-characters-info">
                            <h3 class="all-characters-names">${character.name}</h3>
                            <p class="all-characters-species">Species: ${character.species}</p>
                            <p class="all-characters-status">Status: ${character.status}</p>
                            <p class="all-characters-locations">Location: ${character.location.name}</p>
                        </div>
                    `
                    display.appendChild(card);
                    document.body.appendChild(loadMoreBtn); 

                    // recycled code for single character display

                    card.addEventListener("click", () => {
                        fetch(`https://rickandmortyapi.com/api/character/${character.id}`, {
                            method: "GET",
                            headers: {
                                "Content-Type" : "Application/json",
                                "Accept" : "Application/json",
                            },
                        })
                        .then(response => response.json())
                        .then(characterData => {
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
                        })
                    })
                    
                })
            
                // Update the nextPageUrl ( There is a property in the data returns that allows this)
            nextPageUrl = data.info.next; // Update the next page URL
        })
    };

    // attach event listener to Characters button

    allCharacters.addEventListener("click", () => {
        display.innerHTML = ""
        fetchCharacters(nextPageUrl);
    });

    // attach event listener to page button

    loadMoreBtn.addEventListener("click", () => {
        if (nextPageUrl) {
            fetchCharacters(nextPageUrl);
        }
    });
};


const displayLocations = () => {
    
}

const displayEpisodes = () => {
    
}

displayCharacters();

displayMainCharactersfromJSONDB();

