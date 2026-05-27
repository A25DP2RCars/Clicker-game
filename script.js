const planet = document.getElementById("planet");

const energyText =
document.getElementById("energy");

const perSecondText =
document.getElementById("perSecond");

let energy = 0;

let perSecond = 0;

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

planet.addEventListener("click",()=>{

    energy += 1;

    createParticle();

    updateUI();

    planet.style.transform = "scale(0.93)";

    setTimeout(()=>{

        planet.style.transform = "scale(1)";

    },80);
});

function buyItem(name){

    const item = items[name];

    if(energy >= item.cost){

        energy -= item.cost;

        perSecond += item.gain;

        item.cost =
        Math.floor(item.cost * 1.6);

        updateUI();
    }
}

function updateUI(){

    energyText.innerText =
    `⚡ Enerģija: ${Math.floor(energy)}`;

    perSecondText.innerText =
    `+${perSecond}/sec`;

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

setInterval(()=>{

    energy += perSecond;

    updateUI();

},1000);

function createParticle(){

    const particle =
    document.createElement("div");

    particle.classList.add("particle");

    document.body.appendChild(particle);

    const rect =
    planet.getBoundingClientRect();

    particle.style.left =
    rect.left + rect.width/2 + "px";

    particle.style.top =
    rect.top + rect.height/2 + "px";

    particle.innerText = "+1";

    const x =
    (Math.random()-0.5)*120;

    const y =
    -100 - Math.random()*50;

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

    setTimeout(()=>{

        particle.remove();

    },1000);
}

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

updateUI();
