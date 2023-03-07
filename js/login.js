const userLogin = document.getElementById("user");
const passLogin = document.getElementById("pass");


const password = passLogin.value
const result = "123"


function login() {
    if (passLogin.value == result) {
        let id = 1
        let user_ = {}
         user_.auth = id++
         user_.user = userLogin.value
         localStorage.setItem('key', JSON.stringify(user_))
         window.location.replace("http://127.0.0.1:5500/index.html");
        alert("conectado com sucesso !!")

    } else {
        alert("usuário e ou senha Inválida !!")
    }
}