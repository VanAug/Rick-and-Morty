## Rick and Morty Website

This is a single-page application (SPA) that fetches and displays data 
from the Rick and Morty API. It allows users to browse characters, 
locations, and episodes from the show, with additional features such as 
adding favorites and disliked characters.

### Functionalities Implemented
    .Search
    .Like and dislike characters
    .filter
    .Fetch and display characters, locations, and episodes.
    .Data persistence via a JSON Server API.

### Live Demo

    🔗 Frontend: Rick and Morty App
    🔗 Backend API: JSON Server API

### Technologies Used
    .Frontend: HTML, CSS, JavaScript
    .Backend: JSON Server, Node.js
    .Hosting: GitHub Pages (Frontend), Render (Backend)

### Installation

#### Prerequisites
    Ensure you have the following installed:
    Node.js (v16 or later)
    npm (comes with Node.js)
    Clone the Repository
    git clone https://github.com/VanAug/Rick-and-Morty.git
    cd Rick-and-Morty
    Install Dependencies
    npm install
    Running the Project Locally
    Start the JSON Server
    npm run server
    This will start the backend API at http://localhost:5000/api/.
    Start the Frontend (Using Live Server)
    Open index.html in a browser.
    Or, use VS Code Live Server extension for better experience.

### Deployment
#### Frontend (GitHub Pages)
    Push your code to GitHub.
    Go to Settings > Pages.
    Select main branch and / (root).
    Click Save and your site will be deployed.

#### Backend (Render)
    Create a new Web Service on Render.
    Connect your GitHub repository.
    Set the build command to:
    npm install
    Set the start command to:
    node server.js
    Deploy and get the API URL.

    To ensure the project runs on github pages ensure that the project is 
    outside the public folder and in the root directory.
    However to ensure the project runs on render it should be inside a public 
    folder.
    There is a conflict. I have opted for the second option since I am using the
    free version of render and after a few minutes of inactivity the server shuts down
    and I have to turn it back on. This means I will be on the render page more than github pages
    and thus more convenient.

### API Endpoints

Method       Endpoint                Description

GET          /api/characters         Fetch all characters

GET          /api/locations          Fetch all locations

GET          /api/episodes           Fetch all episodes

GET          /api/favorites          Get all favorite characters

POST         /api/favorites          Add a favorite character

DELETE       /api/favorites/:id      Remove a favorite character

### Issues & Improvements

Data Persistence: Render resets data on restart, consider using Firebase or Supabase.

UI Enhancements: Improve styling and responsiveness.

### Contributing
    Fork the repo.
    Create a new branch (feature-branch)
    Commit changes and push.
    Open a Pull Request.

#### License

This project is licensed under the MIT License.

🚀 Developed by Brian Okello