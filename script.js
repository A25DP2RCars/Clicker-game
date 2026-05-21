let money = 0;
let diamonds = 0;

// DOM
const euro = document.getElementById("euro");
const shop = document.getElementById("shop");
const win = document.getElementById("win");

// cars
const cars = {
    rust: { price: 1, income: 10, color: "brown" },
    audi: { price: 5, income: 50, color: "silver" },
    bmw: { price: 10, income: 200, color: "blue" },
    porsche: { price: 20, income: 1000, color: "yellow" },
    lambo: { price: 50, income: 10000, color: "lime" },
    pagani: { price: 100, income: 100000, color: "purple" }
};

// CLICK (FIXED)
if (euro) {
    euro.onclick = () => {
        money++;
        update();
    };
}

// BUY DIAMONDS
function buyDiamonds(option) {

    let cost = 0;
    let reward = 0;

    if (option === 1) { cost = 100; reward = 1; }
    if (option === 5) { cost = 1000; reward = 5; }
    if (option === 10) { cost = 2500; reward = 10; }

    if (money >= cost) {
        money -= cost;
        diamonds += reward;
        update();
    } else {
        alert("Nepietiek naudas!");
    }
}

// SHOP
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

// BUY CAR
function buyCar(type) {

    const car = cars[type];

    if (diamonds >= car.price) {

        diamonds -= car.price;

        const div = document.createElement("div");
        div.className = "car";
        div.style.background = car.color;
        div.innerText = type.toUpperCase();

        shop.appendChild(div);

        setInterval(() => {
            money += car.income;
            update();
        }, 1000);

        update();

    } else {
        alert("Nepietiek dimantu!");
    }
}

// WIN
function buyKey() {

    if (money >= 100000000000000) {
        win.style.display = "block";
    } else {
        alert("Nepietiek naudas!");
    }
}

// UPDATE UI
function update() {

    const moneyEl = document.getElementById("money");
    const diamondsEl = document.getElementById("diamonds");

    if (moneyEl) moneyEl.innerText = Math.floor(money);
    if (diamondsEl) diamondsEl.innerText = diamonds;
}

// START
createShop();
update();
