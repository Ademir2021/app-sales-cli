const url = "http://localhost:3000/users"
const email = document.getElementById('email')
const psw = document.getElementById('psw')
const psw_repeat = document.getElementById('psw-repeat')
let user = {}

function register(e) {
    event.preventDefault(e)
    if (valPass(user)) {
        registerUser()
        clear()
        window.location.replace("http://127.0.0.1:5500/auth.html");
    }
}

function registerUser(){
    axios.post(url, user)
        .then(response => {
            alert(JSON.stringify(response.data))
        })
        .catch(error => console.log(error))
}

function valPass() {
    user.name = "default"
    user.username = email.value
    if (psw.value == psw_repeat.value) {
        let password = psw.value
        user.password = password
        return user
    } else {
        alert("senha não confere")
    }
}

function clear(){
    email.value = ""
    psw.value = ""
    psw_repeat.value = ''
}