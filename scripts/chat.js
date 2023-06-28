// Redirect to login page if query string is not set - this page
// is not accessible if we have not logged in
const queryString = window.location.search;
console.log(queryString);
const params = new URLSearchParams(queryString);

let usernameParam = "";

if(!params.has("username")) {
  // Redirect is not instant, so wrapped in if-else
  window.location.replace("./index.html");
} else {
  usernameParam = params.get("username");

  // Attempt to connect to websocket server on private network, special connect
  // request to be handled differently by server
  webSocket = new WebSocket("ws://192.9.238.237:80?chat=true&username=" + usernameParam);
}


function sendMessage() {
  let currentTextValue = document.getElementById("inputText").value;

  // Only case where we send the text to the server
  if(currentTextValue.length > 0) {
    const messageObj = {
      type: "text",
      content: currentTextValue,
      sender: usernameParam
    }
    webSocket.send(JSON.stringify(messageObj));
    document.getElementById("inputText").value = ""; // reset
  }

}


const button = document.getElementById("sendButton");
const chatLog = document.getElementById("messageLog");
button.addEventListener("click", sendMessage);

// Chat log contents is received by client, sent from server
webSocket.onmessage = (event) => {
  const serverMessage = JSON.parse(event.data);

  if(serverMessage["type"] == "messages") {
    chatLog.innerHTML = ''; // Reset
    for(const message of serverMessage["messages"]) {
      const para = document.createElement("p");
      let usernameSpanElem = document.createElement("span");
      if(message["type"] == "text") {
        if(message["sender"] == usernameParam) {
          usernameSpanElem.className = "myusername";
        } else {
          usernameSpanElem.className = "otherusernames";
        }
        usernameSpanElem.innerHTML = message["sender"] + ": ";
        para.appendChild(usernameSpanElem);
  
        const node = document.createTextNode(message["content"] + " ");
        para.appendChild(node);
      } else if(message["type"] == "userJoinEvent") {
        if(message["user"] == usernameParam) {
          usernameSpanElem.className = "myusername";
        } else {
          usernameSpanElem.className = "otherusernames";
        }
        usernameSpanElem.innerHTML = message["user"] + " ";
        para.appendChild(usernameSpanElem);
        const node = document.createTextNode("has entered the chat" + " ");
        para.appendChild(node);
      } else if(message["type"] == "userLeaveEvent") {
        if(message["user"] == usernameParam) {
          usernameSpanElem.className = "myusername";
        } else {
          usernameSpanElem.className = "otherusernames";
        }
        usernameSpanElem.innerHTML = message["user"] + " ";
        para.appendChild(usernameSpanElem);
        const node = document.createTextNode("has left the chat" + " ");
        para.appendChild(node);
      }

      let timestamp = document.createElement("span");
      timestamp.className = "timestamp"
      const msgDate = new Date(message["timestamp"]);

      timestamp.innerHTML = msgDate.toLocaleTimeString() + " " + msgDate.toLocaleDateString();
      para.appendChild(timestamp);

      chatLog.appendChild(para);
    }
  
    chatLog.scrollTop = chatLog.scrollHeight;
  } else if(serverMessage["type"] == "loginResponse" &&
            serverMessage["available"] == "false") {
    //Go back to login page
    window.location.replace('./index.html')
  }
};
