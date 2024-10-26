const translateBtn = document.querySelector("button");
const fromText = document.getElementById("from-text");
const toText = document.getElementById("from-to"); // Assuming this is the second textarea
const selectTag = document.querySelectorAll('select');
const exchange = document.querySelector(".exchange i"); // Make sure this matches your HTML structure

fetch('countries.json')
  .then(response => response.json())
  .then(countries => {
    selectTag.forEach((tag, index) => {
      for (const country_code in countries) {
        let selected = "";
        if (index === 0 && country_code === "EN-US") {
          selected = "selected";
        } else if (index === 1 && country_code === "AR") {
          selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
      }
    });
  })
  .catch(error => console.error("Error loading countries:", error));

// Exchange language functionality
exchange.addEventListener("click", () => {
  // Swap the text areas' values
  let tempText = fromText.value;
  fromText.value = toText.value;
  toText.value = tempText;

  // Swap the selected options in the dropdowns
  let tempLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value;
  let translateFrom = selectTag[0].value;
  let translateTo = selectTag[1].value;
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data); // Check the API response in the console
      toText.value = data.responseData.translatedText; // Set the translated text
    })
    .catch(error => console.error("Error with translation API:", error));
});

// Speech synthesis functions
function speak() {
  const text = fromText.value;
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function speak1() {
  const text1 = toText.value; // Use the correct reference
  const utterance = new SpeechSynthesisUtterance(text1);
  window.speechSynthesis.speak(utterance);
}

// Copy text to clipboard function
function copyText(elementId) {
  const text = document.getElementById(elementId).value;
  navigator.clipboard.writeText(text)
    .then(() => {
      // Provide feedback
    })
    .catch(err => {
      console.error("Error copying text: ", err);
    });
}
