let upgradePrice = 500;
let money = 0;
let diamonds = 0;
let level = 1;
let totalClicks = 0;
let clickPower = 1;
let incomePerSecond = 0;

const euro = document.getElementById("euro");
const shop = document.getElementById("shop");
const carsDiv = document.getElementById("cars");
const win = document.getElementById("win");

const cars = {

    rust:{
        price:1,
        income:10,
        color:"brown"
    },

    audi:{
        price:5,
        income:50,
        color:"silver"
    },

    bmw:{
        price:10,
        income:200,
        color:"skyblue"
    },

    porsche:{
        price:20,
        income:1000,
        color:"yellow"
    },

    lambo:{
        price:50,
        income:10000,
        color:"lime"
    },

    pagani:{
        price:100,
        income:100000,
        color:"violet"
    }

};

function update(){

    document.getElementById("money").innerText =
    Math.floor(money);

    document.getElementById("diamonds").innerText =
    diamonds;

    document.getElementById("level").innerText =
    level;

    document.getElementById("clicks").innerText =
    totalClicks;

}

function checkLevel(){

    let newLevel =
    Math.floor(money / 50000) + 1;

    if(newLevel > level){

        level = newLevel;

        alert("⭐ Level Up!");

    }

}

euro.onclick = () => {

    money += clickPower;

    totalClicks++;

    checkLevel();

    update();

};

function buyDiamonds(option){

    let cost = 0;
    let reward = 0;

    if(option === 1){

        cost = 50;
        reward = 1;

    }

    if(option === 5){

        cost = 400;
        reward = 5;

    }

    if(option === 10){

        cost = 700;
        reward = 10;

    }

    if(money >= cost){

        money -= cost;

        diamonds += reward;

        update();

    }
    else{

        alert("Nepietiek naudas!");

    }

}

function createShop(){

    for(let key in cars){

        const car = cars[key];

        const div = document.createElement("div");

        div.className = "shopItem";

        div.innerHTML = `

        <h3>${key.toUpperCase()}</h3>

        <p>💎 Price: ${car.price}</p>

        <p>💰 Income: ${car.income}/s</p>

        <button class="buyBtn"
        onclick="buyCar('${key}')">

        BUY

        </button>

        `;

        shop.appendChild(div);

    }

}

function buyCar(type){

    const car = cars[type];

    if(diamonds >= car.price){

        diamonds -= car.price;

        incomePerSecond += car.income;

        const div = document.createElement("div");

        div.className = "car";

        div.style.background = car.color;

        div.innerText = type.toUpperCase();

        carsDiv.appendChild(div);

        update();

    }
    else{

        alert("Nepietiek dimantu!");

    }

}

setInterval(() => {

    money += incomePerSecond;

    checkLevel();

    update();

},1000);

function buyUpgrade(){

    if(money >= upgradePrice){

        money -= upgradePrice;

        clickPower *= 2;

        upgradePrice =
        Math.floor(upgradePrice * 1.8);

        alert("🚀 Click upgraded!");

        update();

    }
    else{

        alert("Need more money!");

    }

}

function buyKey(){

    if(money >= 1000000){

        win.style.display = "block";

    }
    else{

        alert("Need 1,000,000€!");

    }

}

function darkMode(){

    document.body.classList.toggle("dark");

}

function saveGame(){

    localStorage.setItem("money", money);
    localStorage.setItem("diamonds", diamonds);
    localStorage.setItem("level", level);
    localStorage.setItem("clicks", totalClicks);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("income", incomePerSecond);

}

function loadGame(){

    money =
    Number(localStorage.getItem("money")) || 0;

    diamonds =
    Number(localStorage.getItem("diamonds")) || 0;

    level =
    Number(localStorage.getItem("level")) || 1;

    totalClicks =
    Number(localStorage.getItem("clicks")) || 0;

    clickPower =
    Number(localStorage.getItem("clickPower")) || 1;

    incomePerSecond =
    Number(localStorage.getItem("income")) || 0;

}
document.getElementById("upgradeBtn").innerText =
`🚀 Upgrade Click (${upgradePrice}€)`;

setInterval(saveGame,2000);

loadGame();

createShop();

update();
