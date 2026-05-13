let money = 0;
let diamonds = 0;

const euro = document.getElementById("euro");
const shop = document.getElementById("shop");
const win = document.getElementById("win");

const left = document.getElementById("leftCars");
const right = document.getElementById("rightCars");

// 🚗 cars
const cars = {
  rust:   { price: 1,  income: 10,     color: "brown" },
  audi:   { price: 5,  income: 50,     color: "silver" },
  bmw:    { price: 10,  income: 200,    color: "blue" },
  porsche:{ price: 20,  income: 1000,   color: "yellow" },
  lambo:  { price: 50, income: 10000,  color: "lime" },
  pagani: { price: 100, income: 100000, color: "purple" }
};

// 💰 click
euro.onclick = () => {
  money++;
  update();
};

// 💎 exchange
function buyDiamonds(option) {

  // option = 1, 5, 10 diamonds pack

  let cost = 0;
  let reward = 0;

  if (option === 1) {
    cost = 100;
    reward = 1;
  }

  if (option === 5) {
    cost = 1000;
    reward = 5;
  }

  if (option === 10) {
    cost = 2500;
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

// 🏪 create shop UI (AR PRICE REDZAMS)
function createShop() {

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

// 🚗 buy car
function buyCar(type) {

  const car = cars[type];

  if (diamonds >= car.price) {

    diamonds -= car.price;

    const img = document.createElement("div");
    img.className = "car";
    img.style.background = car.color;
    img.innerText = type.toUpperCase();

    if (Math.random() > 0.5) left.appendChild(img);
    else right.appendChild(img);

    setInterval(() => {
      money += car.income;
      update();
    }, 1000);

    update();
  }
}

// 🔑 win
function buyKey() {
  if (money >= 100000000000000) {
    win.style.display = "block";
  } else {
    alert("Nepietiek naudas!");
  }
}

// UI update
function update() {
  document.getElementById("money").innerText = Math.floor(money);
  document.getElementById("diamonds").innerText = diamonds;
}

// init
createShop();
update();
