let money = 0;
let diamonds = 0;
let prestige = 0;

let clickPower = 1;
let income = 0;

let upgradePrice = 500;

// DOM
const euro = document.getElementById("euro");
const shop = document.getElementById("shop");
const garage = document.getElementById("garage");
const questBox = document.getElementById("quest");

// 🚗 CARS
const cars = {
  rust:{price:1,income:10,color:"brown"},
  audi:{price:5,income:50,color:"silver"},
  bmw:{price:10,income:200,color:"blue"},
  lambo:{price:50,income:10000,color:"lime"}
};

// 📜 QUESTS
let quests = [
  {text:"Earn 500€",goal:500,reward:5,done:false},
  {text:"Earn 5000€",goal:5000,reward:20,done:false},
  {text:"Buy 3 cars",goal:3,reward:50,done:false, type:"cars"}
];

let carsBought = 0;

// CLICK
euro.onclick = () => {
  money += clickPower;
  update();
};

// SHOP
function createShop(){
  shop.innerHTML="";
  for(let k in cars){
    let c = cars[k];
    let div = document.createElement("div");
    div.className="shopItem";
    div.innerHTML=`
      <b>${k.toUpperCase()}</b><br>
      💎 ${c.price} | 💰 ${c.income}/s<br>
      <button onclick="buyCar('${k}')">BUY</button>
    `;
    shop.appendChild(div);
  }
}

// BUY CAR
function buyCar(type){
  let car = cars[type];

  if(diamonds >= car.price){
    diamonds -= car.price;
    income += car.income;
    carsBought++;

    let div = document.createElement("div");
    div.className="car";
    div.style.background=car.color;
    div.innerText=type.toUpperCase();
    garage.appendChild(div);

    update();
  }else{
    alert("Nepietiek dimantu!");
  }
}

// QUESTS
function checkQuests(){
  questBox.innerHTML="";

  quests.forEach(q=>{
    let done = false;

    if(q.type==="cars"){
      done = carsBought >= q.goal;
    }else{
      done = money >= q.goal;
    }

    let div = document.createElement("div");
    div.className="questItem";

    if(done && !q.done){
      q.done = true;
      diamonds += q.reward;
      alert("Quest completed!");
    }

    div.innerHTML=`
      ${q.text}<br>
      🎁 Reward: ${q.reward}💎
      ${q.done ? "✅ DONE" : ""}
    `;

    questBox.appendChild(div);
  });
}

// UPGRADE CLICK
function buyUpgrade(){
  if(money >= upgradePrice){
    money -= upgradePrice;
    clickPower *= 2;
    upgradePrice = Math.floor(upgradePrice*1.7);
    update();
  }
}

// PRESTIGE
function buyPrestige(){
  if(money >= 100000){
    prestige++;
    money=0;
    diamonds=0;
    income=0;
    clickPower=1;
    carsBought=0;
    alert("PRESTIGE DONE!");
    update();
  }
}

// UPDATE
function update(){
  document.getElementById("money").innerText=Math.floor(money);
  document.getElementById("diamonds").innerText=diamonds;
  document.getElementById("prestige").innerText=prestige;

  document.getElementById("upgradeBtn").innerText=
  `Upgrade (${upgradePrice}€)`;

  checkQuests();
}

// PASSIVE INCOME
setInterval(()=>{
  money += income;
  update();
},1000);

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

    } else {
        alert("Nepietiek naudas!");
    }
}

// START
createShop();
update();
