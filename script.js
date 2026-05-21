let money = 0;
let diamonds = 0;

let clickPower = 1;
let income = 0;

let prestige = 0;
let prestigeNeed = 100000;
let prestigeMultiplier = 1;

// DOM
const euro = document.getElementById("euro");
const shop = document.getElementById("shop");
const garage = document.getElementById("garage");

// 🚗 CARS
const cars = {
    rust: { price: 1, income: 10, color: "brown" },
    audi: { price: 5, income: 50, color: "silver" },
    bmw: { price: 10, income: 200, color: "blue" },
    porsche: { price: 20, income: 1000, color: "yellow" },
    lambo: { price: 50, income: 10000, color: "lime" },
    pagani: { price: 100, income: 100000, color: "purple" }
};

// 🖱 CLICK
euro.onclick = () => {
    money += clickPower * prestigeMultiplier;
    update();
};

// 🏪 SHOP
function createShop() {

    shop.innerHTML = "";

    for (let key in cars) {

        const c = cars[key];

        const div = document.createElement("div");
        div.className = "shopItem";

        div.innerHTML = `
            <h3>${key.toUpperCase()}</h3>
            <p>💎 ${c.price}</p>
            <p>💰 ${c.income}/s</p>
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

        income += car.income * prestigeMultiplier;

        const div = document.createElement("div");
        div.className = "car";
        div.style.background = car.color;
        div.innerText = type.toUpperCase();

        garage.appendChild(div);
carsBought++;
        update();

    } else {
        alert("Nepietiek dimantu!");
    }
}

// 💎 BUY DIAMONDS
function buyDiamonds(option) {

    let cost = 0;
    let reward = 0;

    if (option === 1) { cost = 50; reward = 1; }
    if (option === 5) { cost = 400; reward = 5; }
    if (option === 10) { cost = 700; reward = 10; }

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

    let cost = 500 * prestigeMultiplier;

    if (money >= cost) {

        money -= cost;
        clickPower *= 2;

        update();

    } else {
        alert("Nepietiek naudas!");
    }
}

// 🏆 PRESTIGE
function buyPrestige() {

    if (money >= prestigeNeed) {

        prestige++;
        money = 0;
        diamonds = 0;
        income = 0;
        clickPower = 1;

        prestigeMultiplier *= 2;
        prestigeNeed *= 2;

        update();

        alert("🏆 PRESTIGE DONE!");

    } else {
        alert("Nepietiek naudas!");
    }
}

// 💰 PASSIVE INCOME
setInterval(() => {
    money += income;
    update();
}, 1000);

// 🔄 UPDATE UI
function update() {

    document.getElementById("money").innerText = Math.floor(money);
    document.getElementById("diamonds").innerText = diamonds;
    document.getElementById("prestige").innerText = prestige;
    document.getElementById("prestigeNeed").innerText = prestigeNeed;

    const btn = document.getElementById("upgradeBtn");
   if (btn) btn.innerText = `Upgrade (${500 * prestigeMultiplier}€)`;
}
let quests = [
  {text:"Earn 100€", goal:100, reward:5, type:"money", done:false},
  {text:"Earn 1,000€", goal:1000, reward:10, type:"money", done:false},
  {text:"Buy 1 car", goal:1, reward:5, type:"cars", done:false}
];

let carsBought = 0;

function updateQuests(){

    const box = document.getElementById("quest");

    if(!box){
        console.log("QUEST BOX NOT FOUND");
        return;
    }

    box.innerHTML = "";

    quests.forEach(q => {

        let ok = false;

        if(q.type === "money") ok = money >= q.goal;
        if(q.type === "cars") ok = carsBought >= q.goal;

        if(ok && !q.done){
            q.done = true;
            diamonds += q.reward;
            alert("Quest done! +"+q.reward+" 💎");
        }

        const div = document.createElement("div");
        div.className = "shopItem";

        div.innerHTML = `
            ${q.text}<br>
            🎁 ${q.reward} 💎 ${q.done ? "DONE" : ""}
        `;

        box.appendChild(div);
    });
}
function updateQuests(){

    const qbox = document.getElementById("quest");
    qbox.innerHTML = "";

    quests.forEach(q => {

        let progress = false;

        if(q.type === "money") progress = money >= q.goal;
        if(q.type === "diamonds") progress = diamonds >= q.goal;
        if(q.type === "cars") progress = carsBought >= q.goal;
        if(q.type === "prestige") progress = prestige >= q.goal;

        if(progress && !q.done){
            q.done = true;

            diamonds += q.reward;
            alert("Quest completed! +"+q.reward+" 💎");
        }

        let div = document.createElement("div");
        div.className = "shopItem";

        div.innerHTML = `
            ${q.text}<br>
            🎁 ${q.reward} 💎 ${q.done ? "✅ DONE" : ""}
        `;

        qbox.appendChild(div);
    });
}
let carsBought = 0;
let rewardPlayed = false;

function checkAllQuests(){

    let allDone = quests.every(q => q.done);

    if(allDone && !rewardPlayed){

        rewardPlayed = true;

        // SOUND
        document.getElementById("winSound").play();

        // ANIMATION TEXT
        let box = document.getElementById("questComplete");
        box.style.display = "block";

        // SCREEN FLASH
        document.body.classList.add("flash");

        setTimeout(()=>{
            document.body.classList.remove("flash");
        },1000);

        setTimeout(()=>{
            box.style.display = "none";
        },3000);
    }
}
// 🚀 START
updateQuests();
createShop();
update();
checkAllQuests();
