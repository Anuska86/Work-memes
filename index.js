import { memesData } from "./memesData.js";

const emotionRadiosDiv = document.getElementById("emotion-radios");

const getImageBtn = document.getElementById("get-image-btn");
const onlyGiftsCheckbox = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const closeModalBtn = document.getElementById("meme-modal-close-btn");

emotionRadiosDiv.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", renderMeme);
closeModalBtn.addEventListener("click", closeModal);

memeModalInner.addEventListener("click", (e) => {
  const button = e.target.closest(".copy-btn");

  if (button) {
    e.preventDefault();

    const imagePath = button.dataset.imageSrc;
    const fullUrl = window.location.origin + imagePath.substring(1);

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        button.textContent = "✅ Copied!";
        setTimeout(() => {
          button.textContent = "📋 Copy Link";
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        button.textContent = "❌ Failed!";
      });
  }
});

// fetching memes
function getMatchingMemesArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isOnlyGiftsChecked = onlyGiftsCheckbox.checked;

    const matchingMemes = memesData.filter((meme) => {
      if (isOnlyGiftsChecked) {
        return meme.emotionTags.includes(selectedEmotion) && meme.isGif;
      } else {
        return meme.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingMemes;
  }

  return [];
}

// get random meme
function getRandomMeme(memesArray) {
  const randomIndex = Math.floor(Math.random() * memesArray.length);
  return memesArray[randomIndex];
}

// get single meme
function getSingleMeme() {
  const memesArray = getMatchingMemesArray();

  if (memesArray.length > 0) {
    return getRandomMeme(memesArray);
  } else {
    console.log("No matching memes found.");
    return null;
  }
}

// render memes
function renderMeme() {
  const memeObject = getSingleMeme();
  if (!memeObject) {
    console.log("No meme to render");
    return;
  }

  memeModalInner.innerHTML = `
    <div class="meme-content">
      <img 
      class="work-meme-img" 
      src="./images/${memeObject.image}"
      alt="${memeObject.alt}"
      >
      <div class="meme-actions">
        <a href="./images/${memeObject.image}" 
           download="${memeObject.alt || "work-meme"}" 
           class="action-btn download-btn">
          ⬇️ Download Image
        </a>
        <button class="action-btn copy-btn" data-image-src="./images/${
          memeObject.image
        }">
          📋 Copy Link
        </button>
      </div>
    </div>
    `;
  memeModal.style.display = "flex";
}

//Highlight the choice

function highlightCheckedOption(e) {
  const currentHighlight = emotionRadiosDiv.querySelector(".highlight");
  const selectedRadio = e.target;
  const parentContainer = selectedRadio.parentElement;

  if (currentHighlight) {
    currentHighlight.classList.remove("highlight");
  }

  parentContainer.classList.add("highlight");
}

// fetching emotions
function getEmotionsArray(memes) {
  const memeEmotions = [];

  for (let meme of memes) {
    for (let emotion of meme.emotionTags) {
      memeEmotions.push(emotion);
    }
  }
  return memeEmotions;
}

// render emotions radios
function renderEmotionsRadios(memes) {
  const emotions = getEmotionsArray(memes);

  let radioItemsHtml = "";

  const uniqueEmotions = [...new Set(emotions)];

  uniqueEmotions.sort();

  for (let emotion of uniqueEmotions) {
    radioItemsHtml += `<div class="radio">
            <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
            <label for="${emotion}">${emotion.toUpperCase()}</label><br>
            </div>
        `;
  }

  emotionRadiosDiv.innerHTML = radioItemsHtml;
}

renderEmotionsRadios(memesData);

// Function to handle link copying
function copyImageLink(e) {
  const button = e.target.closest(".copy-btn");
  if (!button) return;

  // Get the relative path from the data attribute
  const imagePath = button.dataset.imageSrc;

  // Construct the full absolute URL (important for sharing)
  const fullUrl = window.location.origin + imagePath.substring(1);

  navigator.clipboard
    .writeText(fullUrl)
    .then(() => {
      // Provide visual feedback to the user
      button.textContent = "✅ Copied!";
      setTimeout(() => {
        button.textContent = "📋 Copy Link";
      }, 1500);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      button.textContent = "❌ Failed!";
    });
}

//Close the modal

function closeModal() {
  memeModal.style.display = "none";
}
