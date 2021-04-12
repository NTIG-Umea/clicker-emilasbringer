const clickerButton = document.querySelector('#click');
const rocketButton = document.querySelector('#rocketclick');
const rocketUpgradeButton = document.querySelector('#rocketupgradeclick')
const moneyTracker = document.querySelector('#money');
const mpsTracker = document.querySelector('#mps');
const bpcTracker = document.querySelector('#bpc');
const monkeyTracker = document.querySelector('#monkey');
const upgradeButton = document.querySelector('#upgradebuttonsymbol');
const upgradeList = document.querySelector('#upgradelist')
const rocketupgradeList = document.querySelector('#rocketupgradelist');
const msgbox = document.querySelector('#msgbox')
const rocketelement = document.querySelector('#rocket');
const rocketupgradelistelement = document.getElementById('rocketupgradeelement');
const moneyupgradelistelement = document.getElementById('moneyupgradeelement');
const bigfont = document.getElementById('#moneycounter');

let showmoneyupgrade = true;
let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let monkeySaturation = 0;
let last = 0;
let rocketammount = 0;
let rocket = false;
let rocketanimationspeed = 12.5;
let autofly = false;
let marsmode = false;

setInterval(() => {
  console.log("interval is executed");
  if (autofly == true) {
    rocketclickbutton();  
  }
}, 100);

rocketelement.style.animationDuration = "12.5s";

rocketUpgradeButton.addEventListener('click', () => {
  if (!showmoneyupgrade) {
    upgradeButton.textContent = '🍌⏫'; 
    showmoneyupgrade = true;
    rocketupgradelistelement.style.display = "none";
    moneyupgradelistelement.style.display = "block";
  } 
  else {
    upgradeButton.textContent = '🚀⏫'
    showmoneyupgrade = false 
    moneyupgradelistelement.style.display = "none";
    rocketupgradelistelement.style.display = "block";  
  }
  
}, false)


clickerButton.addEventListener('click', () => {
  money += moneyPerClick;
  // console.log(clicker.score);
  clickerButton.style.background = "yellow";
  setTimeout(() => {
  clickerButton.style.background = "white";
  }, 100);

}, false);

rocketButton.addEventListener('click', () => {
  console.log("rocketb clicked")
  rocketclickbutton();
}, false)


function rocketclickbutton (){
  if (rocket == false) {
    rocket = true;
    rocketammount = money;
    money = 0;

    rocketelement.classList.remove('rocketlaunchanimation'); // reset animation
    void rocketelement.offsetWidth; // trigger reflow
    rocketelement.classList.add('rocketlaunchanimation'); // start animation  
    setTimeout(() => {
      rocket = false;
    monkeySaturation += rocketammount;
    }, rocketanimationspeed * 1000);
    
  } 
}

/* För att driva klicker spelet så kommer vi att använda oss av en metod som heter
 * requestAnimationFrame.
 * requestAnimationFrame försöker uppdatera efter den refresh rate som användarens
 * maskin har, vanligtvis 60 gånger i sekunden.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * funktionen step används som en callback i requestanaimationframe och det är 
 * denna metod som uppdaterar webbsidans text och pengarna.
 * Sist i funktionen så kallar den på sig själv igen för att fortsätta uppdatera.
 */
function step(timestamp) {
  mpsTracker.textContent = moneyPerSecond;
  bpcTracker.textContent = moneyPerClick;
  moneyTracker.textContent = Math.round(money);
  monkeyTracker.textContent = Math.round(monkeySaturation);

  if (money >= 1000000) {
    moneyTracker.textContent = ((money/1000000).toPrecision(4)) + " Miljoner";
   
  }

  if (monkeySaturation >= 1000000) {
    monkeyTracker.textContent = ((monkeySaturation/1000000).toPrecision(4)) + " Miljoner";
    
  }


  if (timestamp >= last + 1000/moneyPerSecond) {
    money += moneyPerSecond/moneyPerSecond;
    last = timestamp;
  }
  
  if (marsmode == true) {
    
    document.getElementById("backgroundimg").style.background = 'url("../img/mars.jpg")'
  }
  window.requestAnimationFrame(step);
}

/* Här använder vi en listener igen. Den här gången så lyssnar iv efter window
 * objeket och när det har laddat färdigt webbsidan(omvandlat html till dom)
 * När detta har skett så skapar vi listan med upgrades, för detta använder vi 
 * en forEach loop. För varje element i arrayen upgrades så körs metoden upgradeList
 * för att skapa korten. upgradeList returnerar ett kort som vi fäster på webbsidan
 * med appendChild.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * Efter det så kallas requestAnimationFrame och spelet är igång.
 */
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    upgrades.forEach(upgrade => {
      upgradeList.appendChild(createCard(upgrade));
    });
    rocketupgrades.forEach(rocketupgrade => {
      rocketupgradeList.appendChild(createrocketCard(rocketupgrade));
    });

    window.requestAnimationFrame(step);
});


upgrades = [
  {
    name: 'Sydamerikansk Bananbonde',
    cost: 10,
    amount: 1,
    marsenable: false
  },
  {
    name: 'Bananplantation',
    cost: 1000,
    amount: 2500,
    marsenable: false
  },
  {
    name: 'Bananfabrik',
    cost: 20000,
    amount: 10000,
    marsenable: false
  },
  {
    name: 'Bananrepublik',
    cost: 500000,
    amount: 150000,
    marsenable: false
  },
  {
    name: 'Bananjorden',
    cost: 10000000,
    amount: 3000000,
    marsenable: false
  },
  {
    name: 'Underjordisk Vätekatalysator - Terraformering av mars',
    cost: 1000000000,
    amount: 0,
    marsenable: true
  }
]

rocketupgrades = [
  {
    name: 'Mentosraket',
    cost: 100,
    speed: 8,
    auto: false,
    img: 'coke.png'
  },
  {
    name: '"Big boy" fyrverkeriraket',
    cost: 10000,
    speed: 5,
    auto: false,
    img: 'firework.png'  
  },
  {
    name: 'Falcon 9',
    cost: 100000,
    speed: 1,
    auto: true,
    img: 'f9.png'
  },
  {
    name: 'Starship',
    cost: 1000000,
    speed: 0.1,
    auto: true,
    img: 'starship.png'
  }
]

function playgame() {
  window.location.href = "http://www.w3schools.com";
}

/* createCard är en funktion som tar ett upgrade objekt som parameter och skapar
 * ett html kort för det.
 * För att skapa nya html element så används document.createElement(), elementen
 * sparas i en variabel så att vi kan manipulera dem ytterligare.
 * Vi kan lägga till klasser med classList.add() och text till elementet med
 * textcontent = 'värde'.
 * Sedan skapas en listener för kortet och i den hittar vi logiken för att köpa
 * en uppgradering.
 * Funktionen innehåller en del strängar och konkatenering av dessa, det kan göras
 * med +, variabel + 'text'
 * Sist så fäster vi kortets innehåll i kortet och returnerar elementet.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 */
function createCard(upgrade) {
  const card = document.createElement('div');
  card.classList.add('card');
  const header = document.createElement('p');
  header.classList.add('title');
  const cost = document.createElement('p');

  header.textContent = upgrade.name + ', +' + upgrade.amount + ' BPS.';
  cost.textContent = 'Köp för ' + Math.round(upgrade.cost) + ' Ap-mättnad';
  if (upgrade.cost > 1000000) {
    cost.textContent = 'Köp för ' + Math.round(upgrade.cost/1000000) + " miljoner" + ' Ap-mättnad';
  }

  card.addEventListener('click', () => {
    console.log("card" + card.name + " was clicked");
    if (monkeySaturation >= upgrade.cost) {
      moneyPerClick++;
      monkeySaturation -= upgrade.cost;
      upgrade.cost *= 1.5;
      cost.textContent = 'Köp för ' + Math.round(upgrade.cost) + ' Ap-mättnad';
      if (upgrade.cost > 1000000) {
        cost.textContent = 'Köp för ' + Math.round(upgrade.cost/1000000) + " miljoner" + ' Ap-mättnad';
      }
      if (upgrade.marsenable) {
        marsmode = true;
        console.log("marsmode " + marsmode)
      }
      moneyPerSecond += upgrade.amount;
      card.style.background = "rgb(66, 245, 66)";
      setTimeout(() => {
        card.style.background = "white";
      }, 100);
  
    } else {
      card.style.background = "rgb(255, 51, 51)";
      setTimeout(() => {
        card.style.background = "white";
      }, 100);
    }
  });

  card.appendChild(header);
  card.appendChild(cost);
  return card;
}

function createrocketCard(rocketupgrade) {
  const rocketcard = document.createElement('div');
  rocketcard.classList.add('card');
  const rocketheader = document.createElement('p');
  rocketheader.classList.add('title');
  const rocketcost = document.createElement('p');

  rocketheader.textContent = rocketupgrade.name + ', ' + rocketupgrade.speed + ' sekunder flygtid';
  rocketcost.textContent = 'Köp för ' + Math.round(rocketupgrade.cost) + ' Ap-mättnad';
 

  rocketcard.addEventListener('click', () => {
    if (monkeySaturation >= rocketupgrade.cost) {
      rocketanimationspeed = rocketupgrade.speed;
      monkeySaturation -= rocketupgrade.cost;
      console.log("The rocket is flying at " + rocketanimationspeed + " seconds per cycle");
      rocketelement.style.animationDuration = rocketanimationspeed + 's';
      rocketcard.style.background = "rgb(66, 245, 66)";
      rocketelement.src = "img/" + rocketupgrade.img;
      autofly = rocketupgrade.auto;

    } 
    if (monkeySaturation <= rocketupgrade.cost & rocketcard.style.background != "rgb(66, 245, 66)") {
      rocketcard.style.background = "rgb(255, 51, 51)";
      setTimeout(() => {
        rocketcard.style.background = "white";
      }, 100);
    }
  });

  rocketcard.appendChild(rocketheader);
  rocketcard.appendChild(rocketcost);
  return rocketcard;
}