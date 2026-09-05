const toggle=document.getElementById("languageToggle");
let lang=localStorage.getItem("anbalayam-language")==="ta"?"ta":"en";
function applyLanguage(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-en][data-ta]").forEach(el=>el.textContent=el.dataset[lang]);
 if(toggle) toggle.textContent=lang==="en"?"தமிழ்":"English";
 localStorage.setItem("anbalayam-language",lang);
}
if(toggle) toggle.addEventListener("click",()=>{lang=lang==="en"?"ta":"en";applyLanguage()});
applyLanguage();

const menu=document.querySelector(".menu-toggle"), links=document.querySelector(".nav-links");
if(menu) menu.addEventListener("click",()=>links.classList.toggle("open"));

const slides=[...document.querySelectorAll(".hero-slide")],dots=[...document.querySelectorAll(".dot")];
let current=0,timer;
function showSlide(i){
 if(!slides.length)return;
 current=(i+slides.length)%slides.length;
 slides.forEach((s,n)=>s.classList.toggle("active",n===current));
 dots.forEach((d,n)=>d.classList.toggle("active",n===current));
}
function startSlideshow(){timer=setInterval(()=>showSlide(current+1),5000)}
dots.forEach((d,i)=>d.addEventListener("click",()=>{clearInterval(timer);showSlide(i);startSlideshow()}));
showSlide(0);startSlideshow();
