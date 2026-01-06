// Red Bull smaken + kleuren
const redBulls = [
  { id:"original", name:"Red Bull Original", color:["#F87171","#B91C1C"] },
  { id:"sugarfree", name:"Red Bull Sugarfree", color:["#D1D5DB","#6B7280"] },
  { id:"zero", name:"Red Bull Zero", color:["#9CA3AF","#374151"] },
  { id:"watermelon", name:"Red Bull Watermelon", color:["#FB7185","#BE123C"] },
  { id:"blueberry", name:"Red Bull Blueberry", color:["#60A5FA","#1E40AF"] },
  { id:"curuba", name:"Red Bull Curuba & Elderflower", color:["#34D399","#047857"] },
  { id:"juneberry", name:"Red Bull Juneberry", color:["#93C5FD","#1E3A8A"] },
  { id:"tropical", name:"Red Bull Tropical", color:["#FACC15","#B45309"] },
  { id:"wildberries", name:"Red Bull Wild Berries", color:["#F472B6","#9D174D"] },
  { id:"apricot", name:"Red Bull Apricot & Strawberry", color:["#FDBA74","#C2410C"] },
  { id:"winterapple", name:"Red Bull Apple & Ginger", color:["#F87171","#B91C1C"] },
  { id:"witte-perzik", name:"Red Bull Witte Perzik", color:["#FBCFE8","#FDE68A"] },
  { id:"cactusvrucht", name:"Red Bull Cactusvrucht", color:["#FB923C","#F472B6"] },
  { id:"kokos-blauwe-bosbes", name:"Red Bull Kokos-Blauwe Bosbes", color:["#60A5FA","#A78BFA"] }
];

// Monster smaken + kleuren
const monsters = [
  { id:"monster-original", name:"Monster Original Green", color:["#22C55E","#166534"] },
  { id:"monster-zero-sugar", name:"Monster Zero Sugar", color:["#9CA3AF","#374151"] },
  { id:"monster-full-throttle-zero", name:"Monster Full Throttle Zero Sugar", color:["#D1D5DB","#6B7280"] },
  { id:"monster-lando-norris-zero", name:"Monster Lando Norris Zero Sugar", color:["#E5E7EB","#6B7280"] },
  { id:"monster-vr46-zero", name:"Monster VR46 Zero Sugar", color:["#D1D5DB","#4B5563"] },
  { id:"monster-ultra-white", name:"Monster Ultra White", color:["#F3F4F6","#D1D5DB"] },
  { id:"monster-ultra-strawberry-dreams", name:"Monster Ultra Strawberry Dreams", color:["#F472B6","#DB2777"] },
  { id:"monster-ultra-peachy-keen", name:"Monster Ultra Peachy Keen", color:["#FCD34D","#F97316"] },
  { id:"monster-ultra-gold", name:"Monster Ultra Gold", color:["#FBBF24","#B45309"] },
  { id:"monster-ultra-fiesta", name:"Monster Ultra Fiesta", color:["#F97316","#DC2626"] },
  { id:"monster-ultra-rosa", name:"Monster Ultra Rosá", color:["#F472B6","#DB2777"] },
  { id:"monster-pacific-punch", name:"Monster Pacific Punch", color:["#F87171","#FCD34D"] },
  { id:"monster-mango-loco", name:"Monster Mango Loco", color:["#FDE68A","#F97316"] },
  { id:"monster-monarch", name:"Monster Monarch", color:["#C084FC","#7C3AED"] },
  { id:"monster-bad-apple", name:"Monster Bad Apple", color:["#EF4444","#B91C1C"] },
  { id:"monster-rio-punch", name:"Monster Rio Punch", color:["#F472B6","#DC2626"] }
];

// DOM elementen
const monthPicker = document.getElementById("monthPicker");
const totalMonth = document.getElementById("totalMonth");
const top3FlavorsDiv = document.getElementById("top3Flavors");
const barCtx = document.getElementById("barChart").getContext("2d");
let barChart;

// Standaard deze maand
const now = new Date();
monthPicker.value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
updateMonthRecap();

// Event listener
monthPicker.addEventListener("change", updateMonthRecap);

function updateMonthRecap(){
    const [year, month] = monthPicker.value.split("-").map(Number);
    const allDrinks = [...redBulls, ...monsters];
    const flavorCounts = {};
    allDrinks.forEach(rb=> flavorCounts[rb.name]=0);

    // Tel alles uit localStorage
    for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));
        const d = new Date(key);
        if(d.getFullYear()===year && d.getMonth()===month-1){
            for(let id in data){
                const drink = allDrinks.find(r=>r.id===id);
                if(drink) flavorCounts[drink.name] += data[id];
            }
        }
    }

    // totaal
    const total = Object.values(flavorCounts).reduce((a,b)=>a+b,0);
    totalMonth.textContent = total;

    // top 3
    const top3 = Object.entries(flavorCounts).sort((a,b)=>b[1]-a[1]).slice(0,3);
    top3FlavorsDiv.innerHTML = "";
    top3.forEach(([name,count])=>{
        if(count>0){
            const drink = allDrinks.find(r=>r.name===name);
            const badge = document.createElement("div");
            badge.className = "px-5 py-2 rounded-2xl shadow-lg text-white text-lg font-semibold animate-pulse";
            badge.style.background = `linear-gradient(135deg, ${drink.color[0]}, ${drink.color[1]})`;
            badge.textContent = `${name} (${count})`;
            top3FlavorsDiv.appendChild(badge);
        }
    });

    // chart
    if(barChart) barChart.destroy();
    barChart = new Chart(barCtx,{
        type:"bar",
        data:{
            labels: Object.keys(flavorCounts),
            datasets:[{
                label:"Aantal gedronken",
                data: Object.values(flavorCounts),
                backgroundColor: allDrinks.map(rb=>{
                    const gradient = barCtx.createLinearGradient(0,0,0,400);
                    gradient.addColorStop(0, rb.color[0]);
                    gradient.addColorStop(1, rb.color[1]);
                    return gradient;
                }),
                borderRadius: 10
            }]
        },
        options:{
            responsive:true,
            plugins:{legend:{display:false}},
            animation:{duration:1200, easing:'easeOutBounce'},
            scales:{
                y:{beginAtZero:true, ticks:{precision:0}},
                x:{ticks:{maxRotation:90, minRotation:45}}
            }
        }
    });
}
