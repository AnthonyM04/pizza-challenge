//import files
import { initializeApp, cert } from "firebase-admin/app";
import { service_account } from "./secrets.js"
import { getFirestore } from "firebase-admin/firestore"

// initialize app
initializeApp( { credential:cert ( service_account ) } )

//connect to FS DB
const db = getFirestore()


const pizza1 = {
    type:       'Cheese',
    serving:    '8 slices',
    crust:      'New York Style',
    price:      10.99,
    togo:       true
}

const pizza2 = {
    type:       'Pepperoni',
    serving:    '8 slices',
    crust:      'New York Style',
    price:      14.99,
    togo:       true
}

const pizza3 = {
    type:       'Vegetarian',
    serving:    '8 slices',
    crust:      'Thin Crust Style',
    price:      12.99,
    togo:       true
}

const pizza4 = {
    type:       'Supreme',
    serving:    '8 slices',
    crust:      'New York Style',
    price:      18.99,
    togo:       true
}


/* CUSTOMERS
************************** */
const customer1 = {
    firstName:  'Jiho',
    lastName:   'Sohn',
    phone:      '954777777',
    email:      'jihosohn@bocacode.com',
    address:    '7035 Beracasa Way'
}

const customer2 = {
    firstName:  'Todd',
    lastName:   'Albert',
    phone:      '5617777777',
    email:      'toddalbert@bocacode.com',
    address:    '7035 Beracase Way',
}

const customer3 = {
    firstName:  'Jane',
    lastName:   'Doe',
    phone:      '696777777',
    email:      'janedoe@bocacode.com',
    address:    '7035 Beracase Way',
}


/* ORDERS
************************** */
const order1 = {
    date:       '1/17/23',
    firstName:  customer1.firstName,
    lastName:   customer1.lastName,
    phone:      customer1.phone,
    email:      customer1.email,
    address:    customer1.address,
    pizzaType:  pizza4.type,
    totalPrice: 35.00,
    payment:    'cash',
    delivery:   true
}

const order2 = {
    date:       '1/19/23',
    firstName:  customer2.firstName,
    lastName:   customer2.lastName,
    phone:      customer2.phone,
    email:      customer2.email,
    address:    customer2.address,
    pizzaType:  pizza2.type,
    totalPrice: 35.00,
    payment:    'Visa',
    delivery:   false
}

const order3 = {
    firstName:  customer3.firstName,
    lastName:   customer3.lastName,
    phone:      customer3.phone,
    email:      customer3.email,
    address:    customer3.address,
    pizzaType:  pizza1.type,
    totalPrice: 35.00,
    payment:    'MasterCard',
    delivery:   false
}

//add documents to collection
const addDoc = async (item, coll) => {
    const result = await db.collection(coll).add(item)
    console.log(`Added items to the Collection ${result.id}`)
}

//table data
const getData = async (coll) => {
    const collection = await db.collection(coll).get()
    const pizzaData = collection.docs.map((doc) => {
        let food = doc.data()
        return food
    })
    console.table(pizzaData)
}

// pizzas
await addDoc(pizza1,'Pizza')
await addDoc(pizza2,'Pizza')
await addDoc(pizza3,'Pizza')
await addDoc(pizza4,'Pizza')

//customers
await addDoc(customer1,'Customers')
await addDoc(customer2,'Customers')
await addDoc(customer3,'Customers')

//orders
await addDoc(order1,'Orders')
await addDoc(order2,'Orders')
await addDoc(order3,'Orders')

//gets data
await getData('Pizza')
await getData('Customers')
await getData('Orders')