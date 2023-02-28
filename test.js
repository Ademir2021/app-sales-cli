//const axios = require('axios').default;
//const url = "http://localhost:3000/products"

// const response = fetch(url,)
// const products_ = response
// console.log(products_)

//const products = localStorage.getItem(JSON.parse('product'))

// const products = [
//     { id_product: 1, descric_product: "Mouse", bar_code: 123 },
//     { id_product: 2, descric_product: "Teclado", bar_code: 1234 },
//     { id_product: 3, descric_product: "Conector F", bar_code: 12345 },
//     { id_product: 4, descric_product: "Balum Fdd", bar_code: 123456 }
// ]


const itens = [
        {item:"Mouse", quant:2, valor:19.00, tItem:38.00},
        {item:"Teclado", quant:2, valor:40.00, tItem:80.00},
        {item:"Caixa de som", quant:3, valor:30.00, tItem:9.00},
        {item:"Cabo Coaxial", quant:10, valor:2.30, tItem:23.00}
]        

var sum = 0; 
for(var i =0;i<itens.length;i++){ 
  sum+=itens[i].tItem; 
} 
console.log(sum);

// function sumItens(){
// var sum = itens.reduce(function(accumulator,object){ 
//         return accumulator + object.tItem
//       },0); 
      
//       alert(sum);
// }