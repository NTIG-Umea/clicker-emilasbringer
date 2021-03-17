const clickerButton = document.querySelector('#click');
const rocketButton = document.querySelector('#rocketclick');
const moneyTracker = document.querySelector('#money');
const mpsTracker = document.querySelector('#mps');
const bpcTracker = document.querySelector('#bpc');
const monkeyTracker = document.querySelector('#monkey');
const upgradeList = document.querySelector('#upgradelist')
const rocketupgradeList = document.querySelector('#rocketupgradelist');
const msgbox = document.querySelector('#msgbox')
const rocketelement = document.querySelector('#rocket')


let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let monkeySaturation = 0;
let last = 0;
let rocketammount = 0;
let rocket = false;
let rocketanimationspeed = 1;

/* Med ett valt element, som knappen i detta fall så kan vi skapa listeners
 * med addEventListener så kan vi lyssna på ett specifikt event på ett html-element
 * som ett klick.
 * Detta kommer att driva klickerknappen i spelet.
 * Efter 'click' som är händelsen vi lyssnar på så anges en callback som kommer
 * att köras vi varje klick. I det här fallet så använder vi en anonym funktion.
 * Koden som körs innuti funktionen är att vi lägger till moneyPerClick till 
 * money.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
clickerButton.addEventListener('click', () => {
  money += moneyPerClick;
  // console.log(clicker.score);
}, false);

rocketButton.addEventListener('click', () => {
  console.log("rocketb clicked")
  if (rocket == false) {
    console.log("rocketaway!")
    rocket = true;
    rocketammount = money;
    money = 0;

    rocketelement.classList.remove('rocketlaunchanimation'); // reset animation
    void rocketelement.offsetWidth; // trigger reflow
    rocketelement.classList.add('rocketlaunchanimation'); // start animation  
    console.log("playingrocketanimations")
    setTimeout(() => {
      rocket = false;
    monkeySaturation += rocketammount;
    }, rocketanimationspeed * 1000);
    
  } 
}, false)


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

  if (timestamp >= last + 1000) {
    money += moneyPerSecond;
    last = timestamp;
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
    amount: 1
  },
  {
    name: 'Bananplantation',
    cost: 1000,
    amount: 150
  },
  {
    name: 'Bananfabrik',
    cost: 20000,
    amount: 3000
  },
  {
    name: 'Bananrepublik',
    cost: 500000,
    amount: 40000
  },
  {
    name: 'Bananjorden',
    cost: 1000000000,
    amount: 300000
  },
  {
    name: 'Underjordisk Vätekatalysator - Terraformering av mars',
    cost: 100000000000,
    amount: 0
  }
]

rocketupgrades = [
  {
    name: 'SnigelRaket',
    cost: 100,
    speed: 10,
    auto: false
  },
  {
    name: 'RåttaRaket',
    cost: 10000,
    speed: 5,
    auto: false
  },
  {
    name: 'UberUltraKorvSingoMingoRaket',
    cost: 100000,
    speed: 1,
    auto: true
  },
  {
    name: 'LjusetsHastighet-Raket',
    cost: 1000000,
    speed: 0.1,
    auto: true
  }
]

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

  card.addEventListener('click', () => {
    console.log("card" + card.name + " was clicked");
    if (monkeySaturation >= upgrade.cost) {
      moneyPerClick++;
      monkeySaturation -= upgrade.cost;
      upgrade.cost *= 1.5;
      cost.textContent = 'Köp för ' + upgrade.cost + ' Ap-mättnad';
      moneyPerSecond += upgrade.amount;
      console.log("upgrade complete " + upgrade.name);
      message('Upgradering lyckades!', 'success');
      console.log("sucsess");
    } else {
      message('Du har inte råd.', 'warning');
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

  rocketheader.textContent = rocketupgrade.name + ', +' + rocketupgrade.speed + ' bananer per sekund.';
  rocketcost.textContent = 'Köp för ' + Math.round(rocketupgrade.cost) + ' Ap-mättnad';

  rocketcard.addEventListener('click', () => {
    if (monkeySaturation >= rocketupgrade.cost) {
      message('Upgradering lyckades!', 'success');
    } else {
      message('Du har inte råd.', 'warning');
    }
  });

  rocketcard.appendChild(rocketheader);
  rocketcard.appendChild(rocketcost);
  return rocketcard;
}

/* Message visar hur vi kan skapa ett html element och ta bort det.
 * appendChild används för att lägga till och removeChild för att ta bort.
 * Detta görs med en timer.
 * Läs mer: 
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
function message(text, type) {
  const p = document.createElement('p');
  p.classList.add(type);
  p.textContent = text;
  msgbox.appendChild(p);
  setTimeout(() => {
    p.parentNode.removeChild(p);
  }, 2000);




}