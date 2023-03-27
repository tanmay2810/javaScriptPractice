"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = (movemnets) => {
  containerMovements.innerHTML = "";

  movemnets.forEach((movement, index) => {
    const type = movement > 0 ? "deposit" : "withdrawal";
    console.log(movement);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__value">${movement}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const displayGlobalBalance = (balance) => {
  labelBalance.textContent = `${balance}€`;
};

const displayBalance = (totalDeposit) => {
  labelSumIn.textContent = `${totalDeposit}€`;
};

const displayDebited = (debited) => {
  labelSumOut.textContent = `${Math.abs(debited)}€`;
};

const displayInterest = (interestRate) => {
  labelSumInterest.textContent = `${interestRate}€`;
};

// function
const userNames = (userName) => {
  const user = userName.map((name) => name[0]).join("");
  return user;
};

const createUserNames = (accounts) => {
  console.log("createUserNames");
  accounts.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

const withdawals = (accounts) => {
  accounts.forEach((account) => {
    account.withdraw = account.movements.filter((ammount) => {
      return ammount > 0;
    });
  });
};

const globalBalance = (accounts) => {
  accounts.forEach((account) => {
    account.balance = account.movements.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  });
};

const eurToUsd = 1.1;
const totalDepositsUSD = (accounts) => {
  accounts.forEach((account) => {
    account.euroToUsd = account.movements
      .filter((mov) => mov > 0)
      .map((mov) => mov * eurToUsd)
      .reduce((acc, mov) => acc + mov, 0);
  });
};

const calculateBalance = (accounts) => {
  accounts.forEach((account) => {
    account.balance = account.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
  });
};

const calculateTotalDebited = (accounts) => {
  accounts.forEach((account) => {
    account.debited = account.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
  });
};

const calculateTotalInterest = (accounts) => {
  accounts.forEach((account) => {
    account.totalInterest = account.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * account.interestRate) / 100)
      .filter((interest) => interest > 1)
      .reduce((acc, mov) => acc + mov, 0);
  });
};

const getAccount = (accounts, userName) =>{
  return accounts.find( acc => acc.owner === userName)
}

displayMovements(account1.movements);
createUserNames(accounts);
globalBalance(accounts);
displayGlobalBalance(account1.balance);
totalDepositsUSD(accounts);
// diplayTotalDeposit(account1.euroToUsd)
calculateBalance(accounts);
displayBalance(account1.balance);
calculateTotalDebited(accounts);
displayDebited(account1.debited);
calculateTotalInterest(accounts);
displayInterest(account1.totalInterest);

console.log(getAccount(accounts,account1.owner))

console.log(accounts);

// console.log(userNames(account1.owner.toLowerCase().split(' ')))

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements){
//   if(movement > 0){
//     console.log(`You deposited ${movement}`)
//   }else{
//     console.log(`You withdraw ${movement}`)
//   }
// }

// console.log('-------------- for of -----------------------')

// for (const [index, movement] of movements.entries()){
//   if(movement > 0){
//     console.log(`You deposited ${movement} at ${index+1}`)
//   }else{
//     console.log(`You withdraw ${movement} at ${index+1}`)
//   }
// }

// console.log('-------------- for each -----------------------')

// movements.forEach( (movement, index, array) => {
//   if(movement > 0){
//     console.log(`You deposited ${movement} at ${index+1} in array ${array}`)
//   }else{
//     console.log(`You withdraw ${movement} from ${index+1} in array ${array}`)
//   }
// } )

// const eurToUsd = 1.1

// const euroToUsdMov = account1.movements.map( (mov) =>{
//   return mov * eurToUsd;
// })

// console.log(euroToUsdMov)
