// Red Bull smaken + kleuren
const redBulls = [
    { id: "original", name: "Red Bull Original", color: ["#F87171","#B91C1C"] },
    { id: "sugarfree", name: "Red Bull Sugarfree", color: ["#D1D5DB","#6B7280"] },
    { id: "zero", name: "Red Bull Zero", color: ["#9CA3AF","#374151"] },
    { id: "watermelon", name: "Red Bull Watermelon", color: ["#FB7185","#BE123C"] },
    { id: "blueberry", name: "Red Bull Blueberry", color: ["#60A5FA","#1E40AF"] },
    { id: "curuba", name: "Red Bull Curuba & Elderflower", color: ["#34D399","#047857"] },
    { id: "juneberry", name: "Red Bull Juneberry", color: ["#93C5FD","#1E3A8A"] },
    { id: "tropical", name: "Red Bull Tropical", color: ["#FACC15","#B45309"] },
    { id: "wildberries", name: "Red Bull Wild Berries", color: ["#F472B6","#9D174D"] },
    { id: "apricot", name: "Red Bull Apricot & Strawberry", color: ["#FDBA74","#C2410C"] },
    { id: "winterapple", name: "Red Bull Apple & Ginger", color: ["#F87171","#B91C1C"] }
];

const monthPicker = document.getElementById("monthPicker");
const totalMonth = document.getElementById("totalMonth");
const top3FlavorsDiv = document.getElementById("top3Flavors");
const barCtx = document.getElementById("barChart").getContext("2d");
let barChart;

// Standaard deze maand
const now = new Date();
monthPicker.value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
updateMonthRecap();

// Event
monthPicker.addEventListener("change", updateMonthRecap);

function updateMonthRecap(){
    const [year, month] = monthPicker.value.split("-").map(Number);
    const flavorCounts = {};
    redBulls.forEach(rb=> flavorCounts[rb.name]=0);

    for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));
        const d = new Date(key);
        if(d.getFullYear()===year && d.getMonth()===month-1){
            for(let id in data){
                const rb = redBulls.find(r=>r.id===id);
                if(rb) flavorCounts[rb.name]+=data[id];
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
            const rb = redBulls.find(r=>r.name===name);
            const badge = document.createElement("div");
            badge.className = "px-5 py-2 rounded-2xl shadow-lg text-white text-lg font-semibold animate-pulse";
            badge.style.background = `linear-gradient(135deg, ${rb.color[0]}, ${rb.color[1]})`;
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
                backgroundColor: redBulls.map(rb=> {
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
