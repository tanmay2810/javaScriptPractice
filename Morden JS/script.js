import { shipingCost, cart } from './shopingCart.js';
import  cloneDeep  from './node_modules/lodash-es/cloneDeep.js';
// importing module

// Blockling code
console.log('Start fetcing users')
await fetch(`https://jsonplaceholder.typicode.com/users`)
console.log('finsih fetching users')

console.log('Importing module');

console.log(shipingCost,cart)
const res = await fetch(`https://www.boredapi.com/api/activity`)
const data = await res.json()
console.log(data)


const getLastPost = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await res.json()
    return {title: data.at(-1).title, text: data.at(-1).body}
}

const lastPost = getLastPost()
console.log(lastPost)
// not very clean
lastPost.then(last => console.log(last)).catch(error => console.error(error)).finally(console.log('last post fetch complete'))

// top level await
const lastPost2 = await getLastPost()
console.log(lastPost2)

const state ={
    cart: [
        {product: "bread", quantity: 3},
        {product: "tea", quantity: 3}
    ],
    user: {logged : true}
};

const stateClone = Object.assign({}, state)
state.user.logged = false;
console.log(stateClone)