let eyeicon = document.getElementById('eyeicon');
let password = document.getElementById('password');
let eyeicon_register = document.getElementById('eyeicon-register');
let password_register = document.getElementById('password-register');

eyeicon.onclick = function(){
  if(password.type == "password"){
    password.type = "text";
    eyeicon.src = "images/eye-open.png"
  }else{
    password.type = "password";
    eyeicon.src = "images/eye-close.png"
  }
}
eyeicon_register.onclick = function(){
  if(password_register.type == "password"){
    password_register.type = "text";
    eyeicon_register  .src = "images/eye-open.png"
  }else{
    password_register.type = "password";
    eyeicon_register.src = "images/eye-close.png"
  }
}
