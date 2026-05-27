// Atrodam planētas elementu HTML (uz tā klikšķinās)
const planet = document.getElementById("planet");

// Atrodam tekstu, kur rāda enerģiju
const energyText =
document.getElementById("energy");

// Atrodam tekstu, kur rāda cik /sec iegūst
const perSecondText =
document.getElementById("perSecond");

// Spēlētāja enerģija (galvenais resurss)
let energy = 0;

// Cik enerģijas automātiski nāk sekundē
let perSecond = 0;

// Upgrade sistēma (visi pirkumi)
const items = {

    drone:{
        cost:10,
        gain:1
    },

    miner:{
        cost:50,
        gain:5
    },

    factory:{
        cost:250,
        gain:20
    },

    reactor:{
        cost:1000,
        gain:100
    },

    ai:{
        cost:5000,
        gain:500
    },

    galaxy:{
        cost:25000,
        gain:2500
    }
};

// Kad uzspiež uz planētas
planet.addEventListener("click",()=>{

    energy += 1;

    createParticle();

    updateUI();

   // mazs "click" animācijas efekts
    planet.style.transform = "scale(0.93)";

    setTimeout(()=>{

        planet.style.transform = "scale(1)";

    },80);
});


// Funkcija upgrade pirkšanai
function buyItem(name){

    const item = items[name]; // paņem konkrēto upgrade

   // pārbauda vai pietiek naudas
    if(energy >= item.cost){

        energy -= item.cost; // atņem enerģiju

        perSecond += item.gain; // palielina ienākumu

        // nākamreiz kļūst dārgāks
        item.cost = Math.floor(item.cost * 1.6);

        updateUI(); // atjauno ekrānu
    }
}

// Atjauno visu tekstu UI
function updateUI(){

    energyText.innerText =
    `⚡ Enerģija: ${Math.floor(energy)}`;

    perSecondText.innerText =
    `+${perSecond}/sec`;

    // atjauno shop cenas
    document.getElementById("droneCost")
    .innerText = items.drone.cost;

    document.getElementById("minerCost")
    .innerText = items.miner.cost;

    document.getElementById("factoryCost")
    .innerText = items.factory.cost;

    document.getElementById("reactorCost")
    .innerText = items.reactor.cost;

    document.getElementById("aiCost")
    .innerText = items.ai.cost;

    document.getElementById("galaxyCost")
    .innerText = items.galaxy.cost;
}

// Automātiska enerģijas pievienošana katru sekundi
setInterval(()=>{

    energy += perSecond;

    updateUI();

},1000);

// Izveido "+1" peldošu efektu
function createParticle(){

    
    const particle =
    document.createElement("div");

    particle.classList.add("particle");

    document.body.appendChild(particle);

    // atrod planētas pozīciju
    const rect =
    planet.getBoundingClientRect();

    // sākuma pozīcija (planētas centrs)
    particle.style.left =
    rect.left + rect.width/2 + "px";

    particle.style.top =
    rect.top + rect.height/2 + "px";

    particle.innerText = "+1";

   // random kustība
    const x =
    (Math.random()-0.5)*120;

    const y =
    -100 - Math.random()*50;

    // animācija
    particle.animate([

        {
            transform:"translate(0,0)",
            opacity:1
        },

        {
            transform:
            `translate(${x}px,${y}px)`,

            opacity:0
        }

    ],{

        duration:1000
    });

    // pēc 1s izdzēš elementu
    setTimeout(()=>{

        particle.remove();

    },1000);
}

// pievieno CSS dinamisku "particle" stilam
const style =
document.createElement("style");

style.innerHTML = `
.particle{

    position:absolute;

    color:#6ee7ff;

    font-weight:bold;

    pointer-events:none;

    z-index:999;

    text-shadow:0 0 10px #6ee7ff;
}
`;

document.head.appendChild(style);

// sākumā uzreiz atjauno UI
updateUI();
