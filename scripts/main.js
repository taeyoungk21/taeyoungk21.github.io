//Change images when image clicked
let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/game-controller-icon.png') {
      myImage.setAttribute ('src','images/Megumin.jpeg');
    } else {
      myImage.setAttribute ('src','images/game-controller-icon.png');
    }
}

//If screen is clicked display relevant message
let myHTML = document.querySelector('html');
myHTML.onclick = function() {
    alert('Ouch! Stop poking me!');
};

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
    let myName = prompt('Please enter your name.');
    if(!myName) {
      setUserName();
    } else {
      localStorage.setItem('name', myName);
      myHeading.innerHTML = 'You are gay ' + myName;
    }
  }

  if(!localStorage.getItem('name')) {
    setUserName();
  } else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'You are gay ' + storedName;
  }

  myButton.onclick = function() {
    setUserName();
  }
