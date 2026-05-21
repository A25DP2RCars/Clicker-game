
let diamonds = 0;
let money = 0;
let clickPower = 1;

const euro = document.getElementById("euro");

function update(){
    console.log("Money:", money);
}

euro.addEventListener("click", () => {
    money += clickPower;
    update();
});


let incomePerSecond = 0;

let upgradePrice = 500;
let hasKey = false;

// 🧠 DOM
const shop = document.getElementById("shop");
const garage = document.getElementById("cars");

// 🚗 CARS
const cars = {
    rust:   { price: 1, income: 10, color: "brown" },
    audi:   { price: 5, income: 50, color: "silver" },
    bmw:    { price: 10, income: 200, color: "blue" },
    porsche:{ price: 20, income: 1000, color: "gold" },
    lambo:  { price: 50, income: 10000, color: "lime" },
    pagani: { price: 100, income: 100000, color: "purple" }
};

// 🖱 CLICK MONEY
euro.onclick = () => {
    money += clickPower;
    update();
};

// 🏪 SHOP
function createShop() {

    if (!shop) return;

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

// 🚀 UPGRADE CLICK
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

// 🔑 GOLDEN KEY (WIN)
function buyKey() {

    if (hasKey) {
        alert("Tu jau uzvarēji!");
        return;
    }

    if (money >= 1000000) {

        money -= 1000000;
        hasKey = true;

        document.getElementById("win").style.display = "block";

        alert("🏆 YOU WON!");

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

    const moneyEl = document.getElementById("money");
    const diamondsEl = document.getElementById("diamonds");

    if (moneyEl) moneyEl.innerText = Math.floor(money);
    if (diamondsEl) diamondsEl.innerText = diamonds;

    const btn = document.getElementById("upgradeBtn");
    if (btn) {
        btn.innerText = `Upgrade Click (${upgradePrice}€)`;
    }
}

// 🌙 DARK MODE
function darkMode() {
    document.body.classList.toggle("dark");
}

    update();
};
// 🚀 START GAME
createShop();
update();
