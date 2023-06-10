let memeNumber = 0;

function createParagraph() {
  const para = document.createElement("p");
  para.textContent = "You clicked the button!";
  document.body.appendChild(para);
}

async function generateMeme() {
  memeNumber++;
  // get json from backend
  let backendUrl = 'https://meme-api.com/gimme';
  const response = await fetch(backendUrl);
  const jsonData = await response.json();

  const para = document.createElement("p");
  para.textContent = "Meme " + memeNumber + " url: ";

  // create link
  let memeLink = document.createElement('a');
  var linkText = document.createTextNode("link");
  memeLink.setAttribute('href', jsonData["url"]);
  memeLink.innerHTML = "link";

  para.appendChild(memeLink);

  document.body.appendChild(para);
}

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", generateMeme);
}