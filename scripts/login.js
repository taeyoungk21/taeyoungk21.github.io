// Attempt to connect to websocket server on private network
webSocket = new WebSocket("ws://192.9.238.237:80");

function tryLogin() {
  let currentTextValue = document.getElementById("loginInputText").value;
  if(currentTextValue.length > 0) {
    const loginObj = {
      type: "login",
      username: currentTextValue
    }
    console.log(JSON.stringify(loginObj));
    webSocket.send(JSON.stringify(loginObj));
  }
}

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", tryLogin);

// To be modified and displayed later on login failure
const error_para = document.createElement("p");
error_para.className = "error_msg"

// Check for a successful/failure login message from server
webSocket.onmessage = (event) => {
  const serverMessage = JSON.parse(event.data);

  if(serverMessage["type"] != "loginResponse") {
    return;
  }

  if(serverMessage["available"] == "false") {
    // Reset login input text, display error msg
    error_para.innerHTML = "username " + document.getElementById("loginInputText").value + " is already taken";
    if(!document.body.contains(error_para)) {
      document.body.appendChild(error_para);
    }

  } else {
    // Go to chat page with username
    window.location.replace('./chat.html?username='
                            + serverMessage["username"]);
  }
};