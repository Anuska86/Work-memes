import { memesData } from "./memesData.js";

const emotionRadiosDiv = document.getElementById("emotion-radios");

const getImageBtn = document.getElementById("get-image-btn");
const onlyGiftsCheckbox = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const closeModalBtn = document.getElementById("meme-modal-close-btn");

emotionRadiosDiv.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", renderCat);

getImageBtn.addEventListener("click", renderCat);
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

//Get the matching cats

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isOnlyGiftsChecked = onlyGiftsCheckbox.checked;

    const matchingCat = catsData.filter((cat) => {
      if (isOnlyGiftsChecked) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCat;
  }

  return [];
}

//fetch a single cat

function getRandomCat(catsArray) {
  const randomIndex = Math.floor(Math.random() * catsArray.length);
  return catsArray[randomIndex];
}

function getSingleCat() {
  const catsArray = getMatchingCatsArray();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else if (catsArray.length > 1) {
    return getRandomCat(catsArray);
  } else {
    console.log("No matching cats found.");
    return null;
  }
}

function renderCat() {
  const catObject = getSingleCat();
  if (!catObject) {
    console.log("No cat to render");
    return;
  }

  memeModalInner.innerHTML = `
    <div class="meme-content">
      <img 
      class="cat-img" 
      src="./images/${catObject.image}"
      alt="${catObject.alt}"
      >
      <div class="meme-actions">
        <a href="./images/${catObject.image}" 
           download="${catObject.alt || "cat-meme"}" 
           class="action-btn download-btn">
          ⬇️ Download Image
        </a>
        <button class="action-btn copy-btn" data-image-src="./images/${
          catObject.image
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

//Fetch the emotions

function getEmotionsArray(cats) {
  const catsEmotions = [];

  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      catsEmotions.push(emotion);
    }
  }
  return catsEmotions;
}

//Render the emotions

function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats);

  let radioItemsHtml = "";

  const uniqueEmotions = [...new Set(emotions)];

  for (let emotion of uniqueEmotions) {
    radioItemsHtml += `<div class="radio">
            <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
            <label for="${emotion}">${emotion.toUpperCase()}</label><br>
            </div>
        `;
  }

  emotionRadiosDiv.innerHTML = radioItemsHtml;
}

renderEmotionsRadios(catsData);

// Function to handle link copying
function copyImageLink(e) {
  const button = e.target.closest(".copy-btn");
  if (!button) return;

  // Get the relative path from the data attribute
  const imagePath = button.dataset.imageSrc;

  // Construct the full absolute URL (important for sharing)
  // This assumes the meme is being served from a known base URL
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
