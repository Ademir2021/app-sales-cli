const userLogin = document.getElementById("user");

function login() {
    if (user.value == "centroserra@gmail.com" && pass.value == "123") {
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