let money = 0;
let diamonds = 0;

let clickPower = 1;
let incomePerSecond = 0;

let upgradePrice = 500;

// 🏪 DOM
const euro = document.getElementById("euro");
const shop = document.getElementById("shop");
const garage = document.getElementById("cars");

// 🚗 cars
const cars = {
    rust:   { price: 1, income: 10, color: "brown" },
    audi:   { price: 5, income: 50, color: "silver" },
    bmw:    { price: 10, income: 200, color: "blue" },
    porsche:{ price: 20, income: 1000, color: "yellow" },
    lambo:  { price: 50, income: 10000, color: "lime" },
    pagani: { price: 100, income: 100000, color: "purple" }
};

// 🖱 CLICK MONEY
euro.onclick = () => {
    money += clickPower;
    update();
};

// 🏪 CREATE SHOP
function createShop() {

    shop.innerHTML = "";

    for (let key in cars) {

        const c = cars[key];

        const div = document.createElement("div");
        div.className = "shopItem";

        div.innerHTML = `
            <h3>${key.toUpperCase()}</h3>
            <p>💎 Price: ${c.price}</p>
            <p>💰 Income: ${c.income}/s</p>
            <button onclick="buyCar('${key}')">BUY</button>
        `;

        shop.appendChild(div);
    }
}

// 🚗 BUY CAR
function buyCar(type) {

    const car = cars[type];

    if (diamonds >= car.price) {

        diamonds -= car.price;
        incomePerSecond += car.income;

        const div = document.createElement("div");
        div.className = "car";
        div.style.background = car.color;
        div.innerText = type.toUpperCase();

        garage.appendChild(div);

        update();

    } else {
        alert("Nepietiek dimantu!");
    }
}

// 💎 BUY DIAMONDS
function buyDiamonds(option) {

    let cost = 0;
    let reward = 0;

    if (option === 1) {
        cost = 50;
        reward = 1;
    }

    if (option === 5) {
        cost = 400;
        reward = 5;
    }

    if (option === 10) {
        cost = 700;
        reward = 10;
    }

    if (money >= cost) {
        money -= cost;
        diamonds += reward;
        update();
    } else {
        alert("Nepietiek naudas!");
    }
}

// 🚀 CLICK UPGRADE
function buyUpgrade() {

    if (money >= upgradePrice) {

        money -= upgradePrice;
        clickPower *= 2;

        upgradePrice = Math.floor(upgradePrice * 1.8);

        update();

    } else {
        alert("Nepietiek naudas!");
    }
}

// 💰 PASSIVE INCOME
setInterval(() => {
    money += incomePerSecond;
    update();
}, 1000);

// 🔄 UPDATE UI
function update() {

    document.getElementById("money").innerText = Math.floor(money);
    document.getElementById("diamonds").innerText = diamonds;

    const btn = document.getElementById("upgradeBtn");
    if (btn) {
        btn.innerText = `Upgrade Click (${upgradePrice}€)`;
    }
}

// 🌙 DARK MODE
function darkMode() {
    document.body.classList.toggle("dark");
}

// 💾 SAVE (optional)
setInterval(() => {
    localStorage.setItem("money", money);
    localStorage.setItem("diamonds", diamonds);
}, 3000);

// 📥 LOAD
money = Number(localStorage.getItem("money")) || 0;
diamonds = Number(localStorage.getItem("diamonds")) || 0;

// 🚀 START
createShop();
update();
