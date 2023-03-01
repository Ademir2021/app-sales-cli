const url = "http://localhost:3000/products"
const getItem = document.getElementById("submit_item")
const getAmount = document.getElementById("submit_amount")
const option = document.getElementById("options");
const total = document.getElementById("total");
let id = 0
const itens = []
let editId = null
insertItem() /**Importante !! já inicia invocando esta função */

async function insertItem() {
    try {
        await fetch(url)
            .then(data => {
                return data.json();
            })
            .then(products => { /**console.log(products) */
                products.map((val) => {
                    option.innerHTML += ` 
    <option value = "${val.descric_product}"></option>`
                })
                const setItem = getItem.value
                const setAmount = getAmount.value
                for (let i = 0; products.length > i; i++)
                    if (setItem == products[i].descric_product /**item */
                        || setItem == products[i].id_product /**id */
                        || setItem == products[i].bar_code) { /**init insert Item */
                        const item = {}
                        item.id = id++
                        item.item = products[i].id_product
                        item.descric = products[i].descric_product
                        item.amount = setAmount
                        item.valor = parseFloat(products[i].val_max_product).toFixed(2)
                        item.tItem = parseFloat(item.amount * item.valor).toFixed(2)
                        save(item)
                    }
            })
    } catch (error) {
        alert("API de itens não localizada !!")
        console.log(error, "Error Occurred !!")
    }
}

function save(item, sum) {
    sumItens()
    if (valFields(item)) {
        if (editId == null) {
            itens.push(item)
            listItens()
            sumItens()
            cancelItens()
        } else {
            edit(editId, item)
            listItens()
            sumItens()
            cancelItens()
        }
    }
}

function edit(id, item) {
    for (let i = 0; i < itens.length; i++) {
        if (itens[i].id == id) {
            itens[i].item = item.item
            itens[i].descric = item.descric
            itens[i].amount = item.amount
            itens[i].valor = item.valor
            itens[i].tItem = item.tItem
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
        let td_descric = tr.insertCell()
        let td_amount = tr.insertCell()
        let td_valor = tr.insertCell()
        let td_tItem = tr.insertCell()
        let td_acoes = tr.insertCell()
        td_id.innerText = itens[i].id
        td_item.innerText = itens[i].item
        td_descric.innerText = itens[i].descric
        td_amount.innerText = itens[i].amount
        td_valor.innerText = itens[i].valor
        td_tItem.innerText = itens[i].tItem
        td_id.classList.add("center")
        td_item.classList.add("center")
        td_amount.classList.add("center")
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
                sumItens()
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

function sumItens() {
    let sum = 0
    for (var i = 0; i < itens.length; i++) {
        sum += (itens[i].amount * itens[i].valor)
    }
    total.innerHTML = `Total Produto(s): R$ ${parseFloat(sum).toFixed(3)}`
    return sum
} /**Não invocar a função sumItens() para não aparecer Total == 0 */


function payment(sum) {
    let payment = 39.80
    let tProducts = 0
    tProducts = sumItens(sum)
    if (tProducts == 0) { alert("Nenhum item(s) no momento") } else {
        if (payment == tProducts) {
            alert("Pagto efet. com sucesso: " + payment)
            alert("venda está sendo envida ...")
        } else {
            alert("O valor não bate com o Total dos Produtos !" +
                "\nEfetue o pagamento de: " + tProducts)
        }
    }
}
