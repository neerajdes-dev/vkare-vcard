document.body.classList.add("dark");
document.documentElement.setAttribute("data-theme","dark");
const shareButton=document.getElementById("shareBtn");
if(shareButton){shareButton.addEventListener("click",async()=>{
 const d={title:"Khagendra Mahant | VKare Pvt Ltd",text:"Khagendra Mahant - Investment Advisor, Banking & Financial Consultant",url:location.origin+location.pathname};
 if(navigator.share){try{await navigator.share(d);return}catch(e){if(e?.name==="AbortError")return}}
 try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(d.url)}else{
 const field=document.createElement("textarea");field.value=d.url;field.style.position="fixed";field.style.opacity="0";document.body.appendChild(field);field.select();const ok=document.execCommand("copy");field.remove();if(!ok)throw Error("Copy unavailable");
 }alert("Card link copied.")}catch(e){window.prompt("Copy this VCard link:",d.url)}
})}
const contactForm=document.getElementById("contactForm");
if(contactForm){contactForm.addEventListener("submit",e=>{
 e.preventDefault();
 if(!contactForm.reportValidity())return;
 const val=id=>(document.getElementById(id)?.value||"").trim();
 const n=val("senderName"),em=val("senderEmail"),mob=val("senderMobile"),m=val("senderMessage");
 if(!n||!em||!m){alert("Please enter your name, email and message.");return}
 const subject="VKare - Request from "+n;
 const body=["Name: "+n,"Email: "+em,"Mobile Number: "+mob,"","Requested Details / Message:",m].join("\r\n");
 window.location.href="mailto:connect@vkare.co.in?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
})}

/* Financial Planning Philosophy — robust sequential reveal via Web Animations API.
   Does not rely on CSS animations or scroll-timeline support. */
(()=>{
 const section=document.querySelector(".approach-section");
 const cards=section?[...section.querySelectorAll(".approach-flow > article")]:[];
 if(!cards.length)return;
 const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduced||typeof Element.prototype.animate!=="function")return;
 let played=false;
 let running=[];
 function reveal(){
  if(played)return;
  played=true;
  running=cards.map((card,i)=>card.animate(
   [{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"translateY(0px)"}],
   {duration:720,delay:i*220,easing:"cubic-bezier(.2,.75,.25,1)",fill:"backwards"}
  ));
 }
 // Trigger as soon as the section becomes visible, including on restored scroll position.
 if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(e=>e.isIntersecting)){reveal();observer.disconnect();}
  },{threshold:0,rootMargin:"0px 0px 60px 0px"});
  observer.observe(section);
 }else{
  const onScroll=()=>{
   const box=section.getBoundingClientRect();
   if(box.top<window.innerHeight&&box.bottom>0){reveal();window.removeEventListener("scroll",onScroll);}
  };
  window.addEventListener("scroll",onScroll,{passive:true});
  onScroll();
 }
})();
