// ===== SETTINGS =====
// Each product: name, cat (category), kind (drawing), bg (card color), desc, url (your Amazon link).
// To add a product, copy one block and change it. Do not type prices: Amazon prices change.
const products = [
  {name:"Honest Beauty Gentle Gel Daily Face Cleanser",cat:"Skincare: Face Cleansers",kind:"bottle",bg:"#EACFD0",desc:"Gentle gel cleanser for sensitive skin. Vegan. 5 fl oz.",url:"https://link.amazon/B05VthwQt"},
  {name:"Naturium Vitamin C Complex Serum",cat:"Skincare: Vitamin C Serums",kind:"dropper",bg:"#E9DFD2",desc:"Vitamin C serum with hyaluronic acid and vitamin E, to support a radiant-looking complexion. 1 fl oz.",url:"https://link.amazon/B04A6YJxi"},
  {name:"La Roche-Posay Toleriane Double Repair Face Moisturizer",cat:"Skincare: Moisturizers",kind:"jar",bg:"#EACFD0",desc:"Daily face cream with glycerin, niacinamide and ceramide. Oil free and fragrance free.",url:"https://link.amazon/B0gUsIkZc"},
  {name:"La Roche-Posay Anthelios Mineral Light Fluid Sunscreen",cat:"Skincare: Sunscreens",kind:"tube",bg:"#E9DFD2",desc:"Broad spectrum mineral sunscreen with titanium dioxide and zinc oxide. No white cast, oil free.",url:"https://link.amazon/B0dUzkPO8"},
  {name:"CeraVe Retinol Serum with Niacinamide",cat:"Skincare: Retinol",kind:"dropper",bg:"#EACFD0",desc:"Anti-aging serum with encapsulated retinol, hyaluronic acid and ceramides. 1 oz.",url:"https://link.amazon/B01FwOBJi"},
  {name:"GOIMU Adjustable Dumbbells, 4 in 1 Free Weight Set",cat:"Fitness: Dumbbells",kind:"dumbbell",bg:"#A3B18A",desc:"Adjustable weight set in 32, 54, 76 and 94 lb options.",url:"https://link.amazon/B0btLNGMB"},
  {name:"Gruper Non-Slip Yoga Mat with Carrying Strap",cat:"Fitness: Yoga Mats",kind:"mat",bg:"#E9DFD2",desc:"Eco-friendly non-slip exercise mat with a carrying strap.",url:"https://link.amazon/B0hfz2oa1"},
  {name:"Weighted Jump Rope for Fitness",cat:"Fitness: Workout Accessories",kind:"rope",bg:"#A3B18A",desc:"Heavy skipping rope for home workouts, strength training and boxing.",url:"https://link.amazon/B0eF5hX9Y"}
];

const $ = id => document.getElementById(id);
const grid=$("grid"), search=$("search"), category=$("category"), sort=$("sort");

const cats = ["All categories","All Skincare","All Fitness",...new Set(products.map(p=>p.cat))];
category.innerHTML = cats.map(c=>`<option>${c}</option>`).join("");

function esc(s){const d=document.createElement("div");d.textContent=s;return d.innerHTML}

// ===== PRODUCT ILLUSTRATIONS (drawn in code, no image files needed) =====
// Each product has a "kind". To use a new drawing, set kind to one of: bottle, dropper, jar, tube, dumbbell, bands, mat, tracker, roller
const K="stroke='#252525' stroke-width='2.5' stroke-linejoin='round' stroke-linecap='round'";
const ART={
 rope:`<path d='M34 36C22 118 98 118 86 36' fill='none' stroke='#252525' stroke-width='5' stroke-linecap='round'/><rect x='24' y='14' width='20' height='34' rx='8' fill='#A3B18A' ${K}/><rect x='76' y='14' width='20' height='34' rx='8' fill='#A3B18A' ${K}/>`,
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
const art=p=>ART[p.kind]?`<svg viewBox='0 0 120 120' role='img' aria-label='Illustration: ${esc(p.name)}'>${ART[p.kind]}</svg>`:"";

function render(){
  const q = search.value.trim().toLowerCase();
  const c = category.value;
  let list = products.filter(p=>{
    const catOk = c==="All categories" || (c==="All Skincare"&&p.cat.startsWith("Skincare")) || (c==="All Fitness"&&p.cat.startsWith("Fitness")) || p.cat===c;
    return catOk && (p.name+p.desc+p.cat).toLowerCase().includes(q);
  });
  if(sort.value==="az") list.sort((a,b)=>a.name.localeCompare(b.name));
  $("count").textContent = list.length+" product"+(list.length===1?"":"s");
  grid.innerHTML = list.length ? list.map(p=>`
    <article class="card">
      <div class="thumb" style="background:${p.bg}">${art(p)}</div>
      <div class="body">
        <span class="tag">${esc(p.cat)}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
        <a class="btn dark" href="${p.url}" target="_blank" rel="noopener noreferrer sponsored">Check price on Amazon</a>
      </div>
    </article>`).join("") : "<p>No products match. Try clearing your filters.</p>";
  reveal();
}
[search,category,sort].forEach(el=>el.addEventListener("input",render));

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

// ===== GLOW ON TOUCH (phones have no hover, so touching a card makes it glow) =====
document.addEventListener("pointerdown",e=>{
  const el=e.target.closest(".card,.news,.note,.arch,.disc,.pill");
  if(!el) return;
  el.classList.add("glow");
  setTimeout(()=>el.classList.remove("glow"),900);
});
