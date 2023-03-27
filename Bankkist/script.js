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

const displayMovements = (movemnets, sort = false) => {
  containerMovements.innerHTML = "";

  const movs = sort ? movemnets.slice().sort( (a,b) => a - b) : movemnets

  movs.forEach((movement, index) => {
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

const globalBalance = (account) => {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
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

const calculateBalance = (account) => {
  account.balance = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
};

const calculateTotalDebited = (account) => {
  account.debited = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
};

const calculateTotalInterest = (account) => {
  account.totalInterest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest > 1)
    .reduce((acc, mov) => acc + mov, 0);
};

const getAccount = (accounts, userName) => {
  return accounts.find((acc) => acc.owner === userName);
};

createUserNames(accounts);
totalDepositsUSD(accounts);

let currentAccount;

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  currentAccount = accounts.find(
    (account) => account.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = "";

    displayMovements(currentAccount.movements, sort);
    globalBalance(currentAccount);
    displayGlobalBalance(currentAccount.balance);
    calculateBalance(currentAccount);
    displayBalance(currentAccount.balance);
    calculateTotalDebited(currentAccount);
    displayDebited(currentAccount.debited);
    calculateTotalInterest(currentAccount);
    displayInterest(currentAccount.totalInterest);
    console.log(accounts);
  } else {
    labelWelcome.textContent = `Wrong username or pin`;
  }
});

btnTransfer.addEventListener("click", (event) => {
  event.preventDefault();
  const ammount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find(
    (account) => inputTransferTo.value === account.userName
  );
  console.log(ammount, reciverAccount, currentAccount);

  if (
    ammount > 0 &&
    currentAccount.balance > 0 &&
    reciverAccount &&
    reciverAccount.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(0 - ammount);
    currentAccount.balance -= ammount;
    reciverAccount.movements.push(ammount);

    updateUI();
  }
});

btnClose.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    let index = accounts.findIndex(
      (account) => account.userName === inputCloseUsername.value
    );
    accounts.splice(index, 1);
    inputCloseUsername.value, (inputClosePin.value = "");
    containerApp.style.opacity = 0;
  }
});

btnLoan.addEventListener("click", (event) => {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    console.log(amount);
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

let sort = false;
btnSort.addEventListener("click", (event) => {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sort);
  sort = !sort
  console.log(sort)
});

const updateUI = (account) => {
  displayMovements(account.movements, sort);
  globalBalance(account);
  displayGlobalBalance(account.balance);
  calculateTotalDebited(account);
  displayDebited(account.debited);
};


 // // accending
  // currentAccount.movements.sort((a, b) => {
  //   if (a > b) return 1; // keep order
  //   if (b > a) return -1; // switch order
  // });

  // // decending
  // currentAccount.movements.sort((a, b) => {
  //   if (a > b) return -1;
  //   if (b > a) return 1;
  // });

  // currentAccount.movements.sort((a, b) => a - b);

  // currentAccount.movements.sort((a, b) => b - a);

  // console.log(currentAccount.movements);

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
