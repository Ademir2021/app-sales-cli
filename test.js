const axios = require('axios').default;
const url = "http://localhost:3000/products"
getUser()

async function getUser() {
    try {
        const response = await axios.get(url,);
        const res = response.data
        
    } catch (error) {
        console.error(error);
    }
}
