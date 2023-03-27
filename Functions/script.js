'use strict'

const bookings = []

const createBooking = (flightNumber, numberOfPassengers = 1, price = 199 * numberOfPassengers) =>{

    // numberOfPassengers ||= 1
    // price ||=199

    const booking = {
        flightNumber,
        numberOfPassengers,
        price,
    }

    console.log(booking)
    bookings.push(booking)
}

createBooking('LH44')
createBooking('LH44',8,5000)


let names = ['Tanmay', 'Sunil', 'Kabade']
console.log(names.join(' '))