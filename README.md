📊 Work Meme Picker

🌟 Overview

The Work Meme Picker is a relatable and humorous web application designed to match a user's current office mood (e.g., Stressed, Lazy, Confused) with a corresponding workplace meme or animated GIF. It serves as a fun tool to capture the universal experience of the daily grind. The project is built primarily with vanilla HTML, CSS, and JavaScript, focusing on DOM manipulation, data handling, and responsive user interface design.

✨ Features

Office Mood Selection: Users can select their current workplace emotion from a dynamically generated list (e.g., Angry, Confused, Fed-Up).

GIF Filtering: A checkbox allows users to narrow down the results to show Animated GIFs only.

Dynamic Image Rendering: Fetches a random meme image/GIF from the local dataset that matches the selected criteria.

Modal Display: Displays the selected meme in a clean, centered modal window, ready for sharing.

Easy Sharing: Dedicated buttons inside the modal allow users to Download the image or Copy the Link to quickly share the meme on Slack or in a team email.

Tablet Simulation: The application interface is housed within a stylish, centered container to simulate a tablet viewing experience.

🚀 Getting Started

Prerequisites

You only need a modern web browser to run this application.

Installation

Clone the repository (if hosted on Git) or download the project files.

Ensure you have the following files:

index.html (The main structure)

index.css (The styles and tablet frame)

index.js (The core application logic)

memesData.js (The data source for work memes and emotions)

A directory structure for images (e.g., ./images/) containing the work meme images/GIFs referenced in memesData.js.

Open index.html in your web browser, or serve it using a simple local server (like Live Server in VS Code) for best results.

⚙️ Project Structure

The project is straightforward and organized:

File/Folder,Description

index.html,"Defines the structure, links the CSS and JS, and contains the header, controls, and image modal."

index.css,"Handles all styling, including typography, layout, responsiveness, and the special .tablet-container view."

index.js,"Contains the core logic: event listeners, fetching emotions, filtering memes, and rendering the final image."

memesData.js,"External file containing the array of meme objects, including their emotionTags, isGif status, and image filename."

./images/,Directory where all static assets (like office-logo.jpg and the individual work meme images/GIFs) are stored.

💻 Key JavaScript Functions

Function,Purpose

renderEmotionsRadios(memesData),Reads emotions from the data and dynamically inserts radio buttons into the DOM.

highlightCheckedOption(e),Visually styles the selected emotion radio button with the .highlight class.

getMatchingMemesArray(),Filters the memesData array based on the user's selected emotion and the GIF checkbox state.

getRandomMeme(memesArray),Selects a random meme object if multiple matches are found.

renderMeme(),Executes the selection logic and displays the resulting meme image in the modal.

closeModal(),Hides the meme modal.

🎨 Styling Highlights

Responsive Tablet View: The entire app is contained within a CSS-styled .tablet-container with specific dimensions, borders, and shadows to simulate a device frame.

Custom Fonts: Uses the Karla font from Google Fonts.

Color Palette: A professional yet fun color palette centered around Corporate Blue (#3f51b5), Success Green (#8bc34a), and a bright accent Orange (#ff9800).

📜 License
This project is licensed under the MIT License.

MIT License
Copyright (c) 2023 Ana Sappia Rey

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author

**Ana Sappia Rey** — [GitHub](https://github.com/anuska86)