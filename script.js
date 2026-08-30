const themeToggle=document.getElementById('themeToggle');
const themeIcon=document.querySelector('.theme-icon');
function applyTheme(theme){
  document.body.classList.toggle('dark-theme',theme==='dark');
  if(themeIcon) themeIcon.textContent=theme==='dark'?'☀':'☾';
  themeToggle?.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');
  localStorage.setItem('portfolio-theme',theme);
}
applyTheme(localStorage.getItem('portfolio-theme')||'light');
themeToggle?.addEventListener('click',()=>applyTheme(document.body.classList.contains('dark-theme')?'light':'dark'));

const menuBtn=document.getElementById('menuBtn');
const topnav=document.querySelector('.topnav');
menuBtn?.addEventListener('click',()=>topnav.classList.toggle('open'));
document.querySelectorAll('.topnav a').forEach(a=>a.addEventListener('click',()=>topnav.classList.remove('open')));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.topnav a')];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));
    }
  });
},{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>observer.observe(s));

async function updateViewCount(){
  try{
    const response=await fetch('https://api.countapi.xyz/hit/neha-morti-portfolio/visits',{cache:'no-store'});
    if(!response.ok) throw new Error();
    const data=await response.json();
    const count=Number(data.value||0).toLocaleString();
    const a=document.getElementById('viewCount'),b=document.getElementById('footerViewCount');
    if(a)a.textContent=count;if(b)b.textContent=count;
  }catch(e){
    const a=document.getElementById('viewCount'),b=document.getElementById('footerViewCount');
    if(a)a.textContent='—';if(b)b.textContent='—';
  }
}
updateViewCount();
