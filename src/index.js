// Global variables
const display = document.querySelector(".display-characters");
const selected = document.querySelector("#selected-character")

let nextCharactersPageUrl = "https://rickandmortyapi.com/api/character"; // Initial characters API URL
let nextLocationsPageUrl = "https://rickandmortyapi.com/api/location"; // Initial locations API URL
let nextEpisodesPageUrl = "https://rickandmortyapi.com/api/episode"; // Initial episodes API URL

const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

const DISLIKE_EMPTY = '👎';  

const displayMainCharacters = () => {

    fetch("https://rickandmortyapi.com/api/character/1,2,3,4,5", {
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
            
            // Could not create function outside because needed access to localized variable
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
                                <button class="like-glyph" data-character-id="${characterData.id}">${EMPTY_HEART}</button>
                                <button class="dislike-glyph" data-character-id="${characterData.id}">${DISLIKE_EMPTY}</button>
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
}

const displayCharacters = () => {
    const allCharacters = document.querySelector("#characters");
    
    // Pagination Button implementation
    
    const loadMoreBtn = document.createElement("button");
    
    loadMoreBtn.classList.add("more")
    loadMoreBtn.textContent = "More";
    
    // Fetch characters function (pass in url for pagination)
    
    const fetchCharacters = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(character => {
                const allCharactersCard = document.createElement("div");
                allCharactersCard.classList.add("all-characters-cards");
                
                allCharactersCard.innerHTML = `
                <img src="${character.image}" alt="${character.name}" class="all-characters-imgs">
                <div class="all-characters-info">
                <h3 class="all-characters-names">${character.name}</h3>
                <p class="all-characters-species"><strong>Species</strong>: ${character.species}</p>
                <p class="all-characters-status"><strong>Status</strong>: ${character.status}</p>
                <p class="all-characters-locations"><strong>Location</strong>: ${character.location.name}</p>
                </div>
                `
                display.appendChild(allCharactersCard);
                
                // Remove existing 'More' buttons before adding a new one
                document.querySelectorAll(".more").forEach(button => button.remove());
                document.body.appendChild(loadMoreBtn); 
                
                // recycled code for single character display
                
                allCharactersCard.addEventListener("click", () => {
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
                                    <button class="like-glyph" data-character-id="${characterData.id}">${EMPTY_HEART}</button>
                                    <button class="dislike-glyph" data-character-id="${characterData.id}">${DISLIKE_EMPTY}</button>
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
            nextCharactersPageUrl = data.info.next // Update the next page URL
        })
    };
    
    // attach event listener to Characters button

    allCharacters.addEventListener("click", () => {
        display.innerHTML = ""
        fetchCharacters(nextCharactersPageUrl);
    });

    // attach event listener to page button

    loadMoreBtn.addEventListener("click", () => {
        if (nextCharactersPageUrl) {
            fetchCharacters(nextCharactersPageUrl);
        }
    });
}

const displayLocations = () => {
    const allLocations = document.querySelector("#locations")
    
    // Pagination Button implementation

    const loadMoreBtn = document.createElement("button");
    
    loadMoreBtn.classList.add("more")
    loadMoreBtn.textContent = "More";
    
    // Fetch Locations
    
    const fetchLocations = (url) => {
        fetch(url)
        .then( response => response.json())
        .then( locations => {
            console.log(locations)
            locations.results.forEach( location => {
                const locationsCard = document.createElement("div");
                locationsCard.classList.add("all-characters-cards");
                
                locationsCard.innerHTML = `
                <div class="locations-info">
                <h3 class="locations-names">${location.name}</h3>
                <p class="locations-type"><strong>Type</strong>: ${location.type}</p>
                <p class="locations-dimension"><strong>Dimension</strong>: ${location.dimension}</p>
                </div>
                `
                display.appendChild(locationsCard);

                // Remove existing 'More' buttons before adding a new one
                document.querySelectorAll(".more").forEach(button => button.remove());
                document.body.appendChild(loadMoreBtn);
            })
            nextLocationsPageUrl = locations.info.next // Update next page url 
        })
    }
    allLocations.addEventListener("click", () => {
        display.innerHTML = ""
        fetchLocations(nextLocationsPageUrl)
    })
    
    loadMoreBtn.addEventListener("click", () => {
        if (nextLocationsPageUrl) {
            fetchLocations(nextLocationsPageUrl);
        }
    });
}

const displayEpisodes = () => {
    const allEpisodes = document.querySelector("#episodes")
    
    // Pagination Button implementation

    const loadMoreBtn = document.createElement("button");

    loadMoreBtn.classList.add("more")
    loadMoreBtn.textContent = "More";
    
    // Fetch Locations
    
    const fetchLocations = (url) => {
        fetch(url)
        .then( response => response.json())
        .then( episodes => {
            console.log(episodes)
            episodes.results.forEach( episode => {
                const episodesCard = document.createElement("div");
                episodesCard.classList.add("all-characters-cards");
                
                episodesCard.innerHTML = `
                    <div class="episodes-info">
                        <h3 class="episodes-names">${episode.name}</h3>
                        <p class="episodes-air_date"><strong>Air Date</strong>: ${episode.air_date}</p>
                        <p class="episode"><strong>Episode</strong>: ${episode.episode}</p>
                    </div>
                `
                display.appendChild(episodesCard);

                // Remove existing 'More' buttons before adding a new one
                document.querySelectorAll(".more").forEach(button => button.remove());
                document.body.appendChild(loadMoreBtn);
            })
            nextEpisodesPageUrl = episodes.info.next // Update next page url 
        })
    }
    allEpisodes.addEventListener("click", () => {
        display.innerHTML = ""
        fetchLocations(nextEpisodesPageUrl)
    })

    loadMoreBtn.addEventListener("click", () => {
        if (nextEpisodesPageUrl) {
            fetchLocations(nextEpisodesPageUrl);
        }
    });
}

const like = () => {
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("like-glyph")) {
            const heart = event.target;
            const characterContainer = heart.closest(".character-container");
    
            // Extract character data from the DOM
            const characterData = {
                id: heart.getAttribute("data-character-id"),
                name: characterContainer.querySelector("#char-name").textContent,
                status: characterContainer.querySelector("#char-status").textContent,
                species: characterContainer.querySelector("#char-species").textContent,
                gender: characterContainer.querySelector("#char-gender").textContent,
                origin: { name: characterContainer.querySelector("#char-origin").textContent },
                location: { name: characterContainer.querySelector("#char-location").textContent },
                image: characterContainer.querySelector("img").src
            };
    
            fetch("http://localhost:3000/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(characterData)
            })
            .then(response => response.json())
            .then(() => {
                heart.textContent = FULL_HEART;
                heart.classList.add("activated-heart");
            })
        }
    });   
}

const favoriteCharacters = () => {
    const favorites = document.querySelector("#like");

    favorites.addEventListener("click", () => {
        fetch("http://localhost:3000/favorites", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json"
            }
        })
        .then(response => response.json())
        .then((data) => {
            display.innerHTML = ""; 

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
                characterSpecies.textContent = `Species: ${character.species}`;

                // Create gender element
                const characterGender = document.createElement("p");
                characterGender.classList.add("gender");
                characterGender.textContent = `Gender: ${character.gender}`;

                // Create status element
                const characterStatus = document.createElement("p");
                characterStatus.classList.add("status");
                characterStatus.textContent = `Status: ${character.status}`;

                // Append elements to card
                cardContent.appendChild(characterName);
                cardContent.appendChild(characterSpecies);
                cardContent.appendChild(characterGender);
                cardContent.appendChild(characterStatus);
                characterCard.appendChild(characterImage);
                characterCard.appendChild(cardContent);

                // Append the character card to display
                display.appendChild(characterCard);
            });
        })
        .catch(error => console.error("Error fetching favorites:", error));
    });
};

const dislike = () => {
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("dislike-glyph")) {
            const thumbDown = event.target;
            const characterContainer = thumbDown.closest(".character-container");
    
            // Extract character data from the DOM
            const characterData = {
                id: thumbDown.getAttribute("data-character-id"),
                name: characterContainer.querySelector("#char-name").textContent,
                status: characterContainer.querySelector("#char-status").textContent,
                species: characterContainer.querySelector("#char-species").textContent,
                gender: characterContainer.querySelector("#char-gender").textContent,
                origin: { name: characterContainer.querySelector("#char-origin").textContent },
                location: { name: characterContainer.querySelector("#char-location").textContent },
                image: characterContainer.querySelector("img").src
            };
    
            fetch("http://localhost:3000/disliked", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(characterData)
            })
            .then(response => response.json())
        }
    });
}

const hated = () => {
    const hated = document.querySelector("#dislike");

    hated.addEventListener("click", () => {
        fetch("http://localhost:3000/disliked", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json"
            }
        })
        .then(response => response.json())
        .then((data) => {
            display.innerHTML = ""; 

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
                characterSpecies.textContent = `Species: ${character.species}`;

                // Create gender element
                const characterGender = document.createElement("p");
                characterGender.classList.add("gender");
                characterGender.textContent = `Gender: ${character.gender}`;

                // Create status element
                const characterStatus = document.createElement("p");
                characterStatus.classList.add("status");
                characterStatus.textContent = `Status: ${character.status}`;

                // Append elements to card
                cardContent.appendChild(characterName);
                cardContent.appendChild(characterSpecies);
                cardContent.appendChild(characterGender);
                cardContent.appendChild(characterStatus);
                characterCard.appendChild(characterImage);
                characterCard.appendChild(cardContent);

                // Append the character card to display
                display.appendChild(characterCard);
            });
        })
    });
}

const filterCharacters = () => {
    
}

displayMainCharacters()
displayCharacters()
displayLocations()
displayEpisodes()
like()
favoriteCharacters()
dislike()
hated()