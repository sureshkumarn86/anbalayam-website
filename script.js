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

const galleryItems=[...document.querySelectorAll(".gallery-item")];
const lightbox=document.getElementById("galleryLightbox");
const lightboxImage=document.getElementById("lightboxImage");
const lightboxCaption=document.getElementById("lightboxCaption");
const lightboxClose=document.getElementById("lightboxClose");
const lightboxPrev=document.getElementById("lightboxPrev");
const lightboxNext=document.getElementById("lightboxNext");
let activeImageIndex=0;

function updateLightbox(index){
 if(!galleryItems.length||!lightboxImage||!lightboxCaption)return;
 activeImageIndex=(index+galleryItems.length)%galleryItems.length;
 const item=galleryItems[activeImageIndex];
 lightboxImage.src=item.dataset.fullSrc||"";
 lightboxImage.alt=item.querySelector("img")?.alt||"Gallery image";
 lightboxCaption.textContent=lang==="ta"?item.dataset.captionTa:item.dataset.captionEn;
}

function openLightbox(index){
 if(!lightbox)return;
 updateLightbox(index);
 lightbox.classList.add("open");
 lightbox.setAttribute("aria-hidden","false");
 document.body.style.overflow="hidden";
}

function closeLightbox(){
 if(!lightbox)return;
 lightbox.classList.remove("open");
 lightbox.setAttribute("aria-hidden","true");
 document.body.style.overflow="";
}

galleryItems.forEach((item,index)=>item.addEventListener("click",()=>openLightbox(index)));
if(lightboxClose) lightboxClose.addEventListener("click",closeLightbox);
if(lightboxPrev) lightboxPrev.addEventListener("click",()=>updateLightbox(activeImageIndex-1));
if(lightboxNext) lightboxNext.addEventListener("click",()=>updateLightbox(activeImageIndex+1));

if(lightbox){
 lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
 document.addEventListener("keydown",e=>{
  if(lightbox.getAttribute("aria-hidden")==="true")return;
  if(e.key==="Escape")closeLightbox();
  if(e.key==="ArrowLeft")updateLightbox(activeImageIndex-1);
  if(e.key==="ArrowRight")updateLightbox(activeImageIndex+1);
 });
}

const originalApplyLanguage=applyLanguage;
applyLanguage=function(){
 originalApplyLanguage();
 if(lightbox&&lightbox.getAttribute("aria-hidden")==="false")updateLightbox(activeImageIndex);
};

