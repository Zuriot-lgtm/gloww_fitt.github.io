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


// ===== PRODUCT ILLUSTRATIONS (drawn in code, no image files needed) =====
// Each product has a "kind". To use a new drawing, set kind to one of: bottle, dropper, jar, tube, dumbbell, bands, mat, tracker, roller
const K="stroke='#252525' stroke-width='2.5' stroke-linejoin='round' stroke-linecap='round'";
const ART={
 bottle:`<rect x='40' y='38' width='40' height='72' rx='10' fill='#fff' ${K}/><rect x='50' y='20' width='20' height='18' rx='4' fill='#252525'/><rect x='46' y='62' width='28' height='24' rx='4' fill='#A3B18A' stroke='none'/>`,
 dropper:`<rect x='42' y='50' width='36' height='60' rx='10' fill='#fff' ${K}/><rect x='52' y='36' width='16' height='14' fill='#252525'/><ellipse cx='60' cy='26' rx='9' ry='13' fill='#EACFD0' ${K}/><rect x='48' y='72' width='24' height='20' rx='4' fill='#E9DFD2' stroke='none'/>`,
 jar:`<rect x='28' y='50' width='64' height='50' rx='12' fill='#fff' ${K}/><rect x='24' y='34' width='72' height='20' rx='8' fill='#252525'/><circle cx='60' cy='78' r='10' fill='#EACFD0' stroke='none'/>`,
 tube:`<path d='M42 106V30h36v76z' fill='#fff' ${K}/><rect x='46' y='14' width='28' height='16' rx='3' fill='#252525'/><circle cx='60' cy='68' r='12' fill='#E9DFD2' stroke='#252525' stroke-width='2'/><path d='M60 60v16M52 68h16' stroke='#252525' stroke-width='2'/>`,
 dumbbell:`<rect x='14' y='42' width='16' height='36' rx='4' fill='#252525'/><rect x='30' y='48' width='12' height='24' rx='3' fill='#fff' ${K}/><rect x='42' y='56' width='36' height='8' fill='#fff' ${K}/><rect x='78' y='48' width='12' height='24' rx='3' fill='#fff' ${K}/><rect x='90' y='42' width='16' height='36' rx='4' fill='#252525'/>`,
 bands:`<circle cx='46' cy='62' r='28' fill='none' stroke='#A3B18A' stroke-width='9'/><circle cx='74' cy='62' r='28' fill='none' stroke='#252525' stroke-width='9'/><circle cx='60' cy='46' r='22' fill='none' stroke='#EACFD0' stroke-width='9'/>`,
 mat:`<rect x='18' y='84' width='84' height='14' rx='7' fill='#A3B18A' ${K}/><circle cx='34' cy='56' r='26' fill='#E9DFD2' ${K}/><circle cx='34' cy='56' r='16' fill='none' stroke='#252525' stroke-width='2.5'/><circle cx='34' cy='56' r='6' fill='#252525'/><rect x='34' y='30' width='60' height='52' rx='4' fill='#E9DFD2' ${K}/>`,
 tracker:`<rect x='46' y='6' width='28' height='28' fill='#252525'/><rect x='46' y='86' width='28' height='28' fill='#252525'/><rect x='34' y='30' width='52' height='60' rx='16' fill='#fff' ${K}/><path d='M44 62h10l5-12 8 24 5-12h6' fill='none' stroke='#A3B18A' stroke-width='3.5'/>`,
 roller:`<rect x='22' y='36' width='76' height='48' rx='24' fill='#fff' ${K}/><path d='M46 36v48M70 36v48' stroke='#A3B18A' stroke-width='6'/><circle cx='34' cy='60' r='4' fill='#252525'/><circle cx='86' cy='60' r='4' fill='#252525'/>`
};
const kinds=["bottle","dropper","jar","tube","dropper","dumbbell","bands","mat","tracker","roller"];
products.forEach((p,i)=>{p.kind=p.kind||kinds[i]});
const art=p=>ART[p.kind]?`<svg viewBox='0 0 120 120' role='img' aria-label='${esc(p.name)}'>${ART[p.kind]}</svg>`:p.emoji;

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
      <div class="thumb" style="background:${p.bg}" >${art(p)}</div>
      <div class="body">
        <span class="tag">${esc(p.cat)}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
        <span class="price">$${p.price} <span class="muted small">(demo price)</span></span>
        <a class="btn dark" href="${link(p.url)}" target="_blank" rel="noopener noreferrer sponsored">Shop Now</a>
      </div>
    </article>`).join("") : "<p>No products match. Try clearing your filters.</p>";
  reveal();
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

// ===== SCROLL REVEAL (items fade up as you scroll) =====
const io = "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches
  ? new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12}) : null;
function reveal(){
  document.querySelectorAll(".card:not(.reveal),.wrap h2,.news").forEach((el,i)=>{
    if(!io) return;
    el.classList.add("reveal");
    el.style.transitionDelay=(el.classList.contains("card")?(i%4)*70:0)+"ms";
    io.observe(el);
  });
}
render();
