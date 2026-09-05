const nav=document.querySelector('.nav'), menu=document.querySelector('.menu');
if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));
const slides=[...document.querySelectorAll('.slide')],dots=[...document.querySelectorAll('.dot')];let current=0;
function showSlide(n){if(!slides.length)return;current=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===current));dots.forEach((d,i)=>d.classList.toggle('active',i===current));}
dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));if(slides.length){showSlide(0);setInterval(()=>showSlide(current+1),5500)}
const toggle=document.querySelector('.lang');let lang=localStorage.getItem('anbalayam-language')||'en';
function setLang(l){lang=l;document.documentElement.lang=l;document.querySelectorAll('[data-en][data-ta]').forEach(e=>e.textContent=e.dataset[l]);if(toggle)toggle.textContent=l==='en'?'தமிழ்':'English';localStorage.setItem('anbalayam-language',l)}
setLang(lang);if(toggle)toggle.addEventListener('click',()=>setLang(lang==='en'?'ta':'en'));
