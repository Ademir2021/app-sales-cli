const url_prod = "http://localhost:3000/products"
const getItem = document.getElementById("submit_item")
const getAmount = document.getElementById("submit_amount")
const option = document.getElementById("options");

let id = 0
const itens = []

const products = [ /**inclui estes itens */
    { id: 1, item: "Mouse", bar_code: 123 },
    { id: 2, item: "Teclado", bar_code: 1234 },
    { id: 3, item: "Conector F", bar_code: 12345 }
]
products.map((val) => {
    option.innerHTML += ` 
    <option value = "${val.item}"></option>`
})

function insertItem() {
    const setItem = getItem.value
    const setAmount = getAmount.value
    for (let i = 0; products.length > i; i++)
        if (setItem == products[i].item
            || setItem == products[i].id
            || setItem == products[i].bar_code) { /**init sales */
            const item = {}
            item.id = id++
            item.item = products[i].item
            item.amount = setAmount

            if (item.item && item.amount != "") {
                itens.push(item)
                listItens()
                cancelItens()
            } else {
                valFields(item)
            }
        }
}

function listItens() {
    let tbody = document.getElementById('tbody')
    tbody.innerText = ''
    for (i = 0; i < itens.length; i++) {
        let tr = tbody.insertRow()
        let td_id = tr.insertCell()
        let td_item = tr.insertCell()
        let td_amount = tr.insertCell()
        let td_acoes = tr.insertCell()
        td_id.innerText = itens[i].id
        td_item.innerText = itens[i].item
        td_amount.innerText = itens[i].amount
        td_id.classList.add("center")
        let imgEdit = document.createElement('img')
        imgEdit.src = 'img/edit.svg'
        let imgDelete = document.createElement('img')
        imgDelete.src = 'img/delete.svg'
        imgDelete.setAttribute("onclick", "delItem(" + itens[i].id + ")")
        td_acoes.appendChild(imgEdit)
        td_acoes.appendChild(imgDelete)
        console.log(itens)
    }
}

function cancelItens() {
    document.getElementById("submit_item").value = ""
    document.getElementById("submit_amount").value = ""
}

function delItem(id) {
    let tbody = document.getElementById("tbody")
    for (let i = 0; itens.length > i; i++) {
        if (itens[i].id == id) {
            itens.splice(i, 1)
            tbody.deleteRow(i)
        }
    }
}

function valFields(item) {
    let msg = ''
    if (item.item == '') { msg += 'Pesquise um Item !!\n' };
    if (item.amount == '') { msg += 'Informe a Quant !!\n' };
    if (msg != '') {
        alert(msg);
        return false;
    };
    return true;
}