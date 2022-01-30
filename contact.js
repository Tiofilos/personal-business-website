//Get data
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");

//Validate data
function validateForm(){
    clearMessages();
    let errorFlag = false;
    if(nameInput.value.length < 1){
        errorNodes[0].innerText = "Please input your name";
        nameInput.classList.add("error-border");
        errorFlag = true;
    }
    if(!emailIsValid(email.value)){
        errorNodes[1].innerText = "Email not valid";
        email.classList.add("error-border");
        errorFlag = true;
    }
    if(message.value.length > 200){
        errorNodes[1].innerText = "Message is more than 200 words";
        message.classList.add("error-border");
        errorFlag = true;
    }
    if(!errorFlag){
        success.innerText = "Message sent!";
    }
}



//Clearing error 
function clearMessages(){
    for(let i = 0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    nameInput.classList.remove("error-border");
    email.classList.remove("error-border");
    message.classList.remove("error-border");
}

//Checking email validity
function emailIsValid(email){
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}

