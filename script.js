// ===== SETTINGS =====
// Add your affiliate tracking tag here. It is appended to every Shop Now link.
const AFFILIATE_PARAM = ""; // example: "tag=yourid-20"

// ===== DEMO PRODUCTS (replace with real ones) =====
// To add a product, copy one line and change it. "url" is your affiliate link.
const products = [
  {name:"Gentle Gel Cleanser",cat:"Skincare: Face Cleansers",price:14,emoji:"🧴",bg:"#EACFD0",desc:"Daily gel cleanser for most skin types.",url:"https://example.com/cleanser"},
  {name:"Vitamin C Serum",cat:"Skincare: Vitamin C Serums",price:28,emoji:"🍊",bg:"#E9DFD2",desc:"Brightening serum for morning use.",url:"https://example.com/vitamin-c"},
  {name:"Barrier Moisturizer",cat:"Skincare: Moisturizers",price:22,emoji:"🫧",bg:"#EACFD0",desc:"Lightweight cream with ceramides.",url:"https://example.com/moisturizer"},
  {name:"Daily Mineral Sunscreen SPF 50",cat:"Skincare: Sunscreens",price:18,emoji:"☀️",bg:"#E9DFD2",desc:"Broad-spectrum protection, no white cast.",url:"https://example.com/sunscreen"},
  {name:"Retinol Night Treatment",cat:"Skincare: Retinol",price:32,emoji:"🌙",bg:"#EACFD0",desc:"Night serum to help with fine lines.",url:"https://example.com/retinol"},
  {name:"Adjustable Dumbbell Set",cat:"Fitness: Dumbbells",price:149,emoji:"🏋️",bg:"#A3B18A",desc:"Replaces several pairs, saves space.",url:"https://example.com/dumbbells"},
  {name:"Resistance Band Set",cat:"Fitness: Resistance Bands",price:19,emoji:"🪢",bg:"#A3B18A",desc:"Five levels for strength and mobility.",url:"https://example.com/bands"},
  {name:"Non-Slip Yoga Mat",cat:"Fitness: Yoga Mats",price:35,emoji:"🧘",bg:"#E9DFD2",desc:"6mm cushioning with strong grip.",url:"https://example.com/yoga-mat"},
  {name:"Fitness Tracker",cat:"Fitness: Fitness Trackers",price:59,emoji:"⌚",bg:"#A3B18A",desc:"Steps, heart rate and sleep tracking.",url:"https://example.com/tracker"},
  {name:"Foam Recovery Roller",cat:"Fitness: Recovery Products",price:24,emoji:"🌀",bg:"#E9DFD2",desc:"Eases sore muscles after workouts.",url:"https://example.com/roller"}
];

const $ = id => document.getElementById(id);
const grid=$("grid"), search=$("search"), category=$("category"), price=$("price"), sort=$("sort");

// Build category dropdown
const cats = ["All categories","All Skincare","All Fitness",...new Set(products.map(p=>p.cat))];
category.innerHTML = cats.map(c=>`<option>${c}</option>`).join("");

function link(url){
  if(!AFFILIATE_PARAM) return url;
  return url + (url.includes("?")?"&":"?") + AFFILIATE_PARAM;
}
function esc(s){const d=document.createElement("div");d.textContent=s;return d.innerHTML}

function render(){
  const q = search.value.trim().toLowerCase();
  const c = category.value;
  const [min,max] = price.value==="all" ? [0,Infinity] : price.value.split("-").map(Number);
  let list = products.filter(p=>{
    const catOk = c==="All categories" || (c==="All Skincare"&&p.cat.startsWith("Skincare")) || (c==="All Fitness"&&p.cat.startsWith("Fitness")) || p.cat===c;
    return catOk && p.price>=min && p.price<max && (p.name+p.desc+p.cat).toLowerCase().includes(q);
  });
  if(sort.value==="low") list.sort((a,b)=>a.price-b.price);
  if(sort.value==="high") list.sort((a,b)=>b.price-a.price);
  $("count").textContent = list.length+" product"+(list.length===1?"":"s");
  grid.innerHTML = list.length ? list.map(p=>`
    <article class="card">
      <div class="thumb" style="background:${p.bg}" aria-hidden="true">${p.emoji}</div>
      <div class="body">
        <span class="tag">${esc(p.cat)}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
        <span class="price">$${p.price} <span class="muted small">(demo price)</span></span>
        <a class="btn dark" href="${link(p.url)}" target="_blank" rel="noopener noreferrer sponsored">Shop Now</a>
      </div>
    </article>`).join("") : "<p>No products match. Try clearing your filters.</p>";
}
[search,category,price,sort].forEach(el=>el.addEventListener("input",render));

document.querySelectorAll("[data-jump]").forEach(b=>b.addEventListener("click",()=>{
  category.value = b.dataset.jump==="skincare" ? "All Skincare" : "All Fitness";
  render();
  $("shop").scrollIntoView({behavior:"smooth"});
}));

$("news-form").addEventListener("submit",e=>{
  e.preventDefault();
  // Demo only: connect a service like Mailchimp or ConvertKit to really collect emails.
  $("news-msg").textContent = "Thanks! (Demo only: connect an email service to collect real signups.)";
  e.target.reset();
});

$("year").textContent = new Date().getFullYear();
render();
