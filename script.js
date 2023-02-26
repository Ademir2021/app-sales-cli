const url = "http://localhost:3000/products"
const getItem = document.getElementById("submit_item")
const getAmount = document.getElementById("submit_amount")
const option = document.getElementById("options");
let id = 0
const itens = []
let editId = null
insertItem() /**Importante !! já inicia invocando a esta função */

async function insertItem() {

    await fetch(url)
        .then(data => {
            return data.json();
        })
        .then(products => {/** console.log(products)*/
            products.map((val) => {
                option.innerHTML += ` 
        <option value = "${val.descric_product}"></option>`
            })

            const setItem = getItem.value
            const setAmount = getAmount.value
            for (let i = 0; products.length > i; i++)
                if (setItem == products[i].descric_product //item
                    || setItem == products[i].id_product //id
                    || setItem == products[i].bar_code) { /**init sales */
                    const item = {}
                    item.id = id++
                    item.item = products[i].descric_product
                    item.amount = setAmount

                    if (item.item != "" && item.amount > 0) {
                        if (editId == null) {
                            itens.push(item)
                            listItens()
                            cancelItens()
                        } else {
                            edit(editId, item)
                            listItens()
                            cancelItens()
                        }
                    } else {
                        valFields(item)
                    }
                }
        })
}
function edit(id, item) {
    for (let i = 0; i < itens.length; i++) {
        if (itens[i].id == id) {
            itens[i].item = item.item
            itens[i].amount = item.amount
        }
    }
}

function listItens() {
    let tbody = document.getElementById('tbody')
    tbody.innerText = ''
    for (let i = 0; i < itens.length; i++) {
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
        imgEdit.setAttribute("onclick", "prepareEdition(" + JSON.stringify(itens[i]) + ")")
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

    document.getElementById('btn1').innerText = "Salvar"
    editId = null
}

function delItem(id) {
    if (confirm("Deseja remover o produto do ID: " + id)) {
        let tbody = document.getElementById("tbody")
        for (let i = 0; itens.length > i; i++) {
            if (itens[i].id == id) {
                itens.splice(i, 1)
                tbody.deleteRow(i)
            }
        }
    }
}

function valFields(item) {
    let msg = ''
    if (item.item == '') { msg += 'Pesquise um Item !!\n' }
    if (item.amount < 1) { msg += 'Informe a Quant !!\n' }
    if (msg != '') {
        alert(msg)
        return false
    }
    return true
}

function prepareEdition(dados) {
    if (confirm("deseja relamente atualizar o item: " + dados.id)) {
        editId = dados.id
        document.getElementById("submit_item").value = dados.item
        document.getElementById("submit_amount").value = dados.amount
        document.getElementById('btn1').innerText = 'Atualizar'
    }
}