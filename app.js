const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionariesBtn = document.getElementById("show-millionaries");
const sortRichestBtn = document.getElementById("sort-richest");
const calculateWealthBtn = document.getElementById("calculate-wealth");

// get random user and money
getRandomUser();

let data = [];
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const newUser = {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addUser(newUser);
}

// double money
function doubleMoney() {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM();
}
// sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// show millionaries
function showMillionaries() {
  data = data.filter((item) => item.money > 1000000);
  updateDOM();
}
// calculate entire wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3><strong>Entire Wealth : ${formatNumber(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl)
}

// add new user
function addUser(user) {
  data.push(user);
  updateDOM();
}

// update DOM

function updateDOM(providedData = data) {
  main.innerHTML = " <h2><strong>Person</strong><strong> Wealth</strong></h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> <strong>${formatNumber(
      item.money
    )}</strong>`;
    main.appendChild(element);
  });
}
// format number to currency format
function formatNumber(num) {
  return `$` + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

// event listener

addUserBtn.addEventListener("click", () => {
  getRandomUser();
});

doubleMoneyBtn.addEventListener("click", () => {
  doubleMoney();
});
sortRichestBtn.addEventListener("click", () => {
  sortByRichest();
});

showMillionariesBtn.addEventListener("click", () => {
  showMillionaries();
});

calculateWealthBtn.addEventListener("click", () => {
  calculateWealth();
});
