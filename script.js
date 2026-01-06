// Red Bull smaken
const redBulls = [
  { id:"original", name:"Red Bull Original", image:"images/redbull-classic.png", color:"from-red-200 to-red-400" },
  { id:"sugarfree", name:"Red Bull Sugarfree", image:"images/redbull-sugarfree.png", color:"from-gray-200 to-gray-400" },
  { id:"zero", name:"Red Bull Zero", image:"images/redbull-zero.png", color:"from-gray-400 to-gray-600" },
  { id:"watermelon", name:"Red Bull Watermelon", image:"images/redbull-red.png", color:"from-pink-200 to-pink-400" },
  { id:"blueberry", name:"Red Bull Blueberry", image:"images/redbull-blue.png", color:"from-blue-200 to-blue-400" },
  { id:"curuba", name:"Red Bull Curuba & Elderflower", image:"images/redbull-lime-green.png", color:"from-green-200 to-green-400" },
  { id:"juneberry", name:"Red Bull Juneberry", image:"images/redbull-sea-blue.png", color:"from-blue-100 to-blue-300" },
  { id:"tropical", name:"Red Bull Tropical", image:"images/redbull-tropical.png", color:"from-yellow-200 to-yellow-400" },
  { id:"wildberries", name:"Red Bull Wild Berries", image:"images/redbull-pink.png", color:"from-pink-300 to-pink-500" },
  { id:"apricot", name:"Red Bull Apricot & Strawberry", image:"images/redbull-apricot.png", color:"from-orange-200 to-orange-400" },
  { id:"winterapple", name:"Red Bull Apple & Ginger", image:"images/redbull-winter-edition.png", color:"from-red-200 to-red-400" },
  { id:"witte-perzik", name:"Red Bull Witte Perzik", image:"images/redbull-witteperzik.png", color:"from-pink-200 to-yellow-200" },
  { id:"cactusvrucht", name:"Red Bull Cactusvrucht", image:"images/redbull-cactusvrucht.png", color:"from-orange-300 to-pink-300" },
  { id:"kokos-blauwe-bosbes", name:"Red Bull Kokos-Blauwe Bosbes", image:"images/redbull-kokos.png", color:"from-blue-200 to-purple-300" }
];

// Monster smaken
const monsters = [
  { id:"monster-original", name:"Monster Original Green", image:"images/monster-original.png", color:"from-green-400 to-green-600" },
  { id:"monster-zero-sugar", name:"Monster Zero Sugar", image:"images/monster-zero.png", color:"from-gray-400 to-gray-600" },
  { id:"monster-full-throttle-zero", name:"Monster Full Throttle Zero Sugar", image:"images/monster-full-throttle-zero.png", color:"from-gray-300 to-gray-500" },
  { id:"monster-lando-norris-zero", name:"Monster Lando Norris Zero Sugar", image:"images/monster-lando-norris-zero.png", color:"from-gray-200 to-gray-400" },
  { id:"monster-vr46-zero", name:"Monster VR46 Zero Sugar", image:"images/monster-vr46-zero.png", color:"from-gray-300 to-gray-500" },
  { id:"monster-ultra-white", name:"Monster Ultra White", image:"images/monster-ultra-white.png", color:"from-white to-gray-200" },
  { id:"monster-ultra-strawberry-dreams", name:"Monster Ultra Strawberry Dreams", image:"images/monster-ultra-strawberry-dreams.png", color:"from-pink-300 to-pink-500" },
  { id:"monster-ultra-peachy-keen", name:"Monster Ultra Peachy Keen", image:"images/monster-ultra-peachy-keen.png", color:"from-yellow-300 to-orange-400" },
  { id:"monster-ultra-gold", name:"Monster Ultra Gold", image:"images/monster-ultra-gold.png", color:"from-yellow-400 to-yellow-600" },
  { id:"monster-ultra-fiesta", name:"Monster Ultra Fiesta", image:"images/monster-ultra-fiesta.png", color:"from-orange-300 to-red-400" },
  { id:"monster-ultra-rosa", name:"Monster Ultra Rosá", image:"images/monster-ultra-rosa.png", color:"from-pink-300 to-pink-500" },
  { id:"monster-pacific-punch", name:"Monster Pacific Punch", image:"images/monster-pacific-punch.png", color:"from-red-300 to-yellow-400" },
  { id:"monster-mango-loco", name:"Monster Mango Loco", image:"images/monster-mango-loco.png", color:"from-yellow-300 to-orange-400" },
  { id:"monster-monarch", name:"Monster Monarch", image:"images/monster-monarch.png", color:"from-purple-300 to-purple-500" },
  { id:"monster-bad-apple", name:"Monster Bad Apple", image:"images/monster-bad-apple.png", color:"from-red-300 to-red-500" },
  { id:"monster-rio-punch", name:"Monster Rio Punch", image:"images/monster-rio-punch.png", color:"from-pink-300 to-red-400" }
];

const datePicker = document.getElementById("datePicker");
const drinksDiv = document.getElementById("drinks");
const totalDiv = document.getElementById("total");

// Standaard vandaag
datePicker.valueAsDate = new Date();
loadDrinks(datePicker.value);

// Event listener
datePicker.addEventListener("change", ()=> loadDrinks(datePicker.value));

function loadDrinks(date){
  drinksDiv.innerHTML = "";

  // Combineer Red Bull en Monster
  const allDrinks = [...redBulls, ...monsters];

  allDrinks.forEach(item => {
    const count = getCount(date, item.id);
    const card = document.createElement("div");

    card.className = `
      flex items-center justify-between p-4 rounded-3xl shadow-xl
      hover:scale-105 transform transition duration-300 bg-gradient-to-r ${item.color} min-h-[100px]
    `;

    card.innerHTML = `
      <div class="flex items-center flex-1 gap-4">
        <img src="${item.image}" class="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-gray-100 p-1 shadow-md">
        <p class="font-semibold text-gray-800 text-sm sm:text-base">${item.name}</p>
      </div>

      <div class="flex items-center gap-2">
        <button class="w-10 h-10 rounded-full bg-red-600 text-white hover:bg-red-700 active:scale-95 transition-transform"
          onclick="changeCount('${date}','${item.id}',-1)">-</button>
        <span class="w-10 text-center font-bold text-lg sm:text-xl" id="${date}-${item.id}">${count}</span>
        <button class="w-10 h-10 rounded-full bg-red-600 text-white hover:bg-red-700 active:scale-95 transition-transform"
          onclick="changeCount('${date}','${item.id}',1)">+</button>
      </div>
    `;

    drinksDiv.appendChild(card);
  });

  updateTotal(date);
}

function getCount(date,id){
  const data = JSON.parse(localStorage.getItem(date)) || {};
  return data[id] || 0;
}

function changeCount(date,id,change){
  const data = JSON.parse(localStorage.getItem(date)) || {};
  data[id] = Math.max(0,(data[id]||0)+change);
  localStorage.setItem(date,JSON.stringify(data));

  const span = document.getElementById(`${date}-${id}`);
  span.innerText = data[id];
  span.classList.add("animate-pulse");
  setTimeout(()=> span.classList.remove("animate-pulse"),300);

  updateTotal(date);
}

function updateTotal(date){
  const data = JSON.parse(localStorage.getItem(date)) || {};
  const total = Object.values(data).reduce((a,b)=>a+b,0);
  totalDiv.innerText = `Totaal: ${total}`;
}
