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

/* Chrome Android: scroll-triggered sequential reveal with CSS state changes. */
(()=>{
 const section=document.querySelector(".approach-section");
 const cards=section?Array.from(section.querySelectorAll(".approach-flow > article")):[];
 if(cards.length!==4)return;
 const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduce)return;
 let started=false;
 cards.forEach((card,i)=>{
  card.style.setProperty("--vk-card-delay",String(i*240)+"ms");
  card.classList.add("vk-sequence-ready");
 });
 function show(){
  if(started)return;
  started=true;
  section.classList.add("vk-sequence-start");
  window.removeEventListener("scroll",check);
  window.removeEventListener("resize",check);
  if(observer)observer.disconnect();
 }
 function check(){
  const box=section.getBoundingClientRect();
  if(box.top<window.innerHeight*0.87&&box.bottom>0)show();
 }
 let observer=null;
 if("IntersectionObserver" in window){
  observer=new IntersectionObserver(entries=>{
   if(entries.some(e=>e.isIntersecting))check();
  },{rootMargin:"0px 0px -10% 0px",threshold:0});
  observer.observe(section);
 }
 window.addEventListener("scroll",check,{passive:true});
 window.addEventListener("resize",check,{passive:true});
 // First frame: ensure hidden state is painted before activating.
 requestAnimationFrame(()=>requestAnimationFrame(check));
 // Never leave the cards hidden if the page is backgrounded or a callback is missed.
 window.addEventListener("pagehide",show,{once:true});
})();

/* Phase 18.3: single active section/card touch highlight. */
(()=>{
 const selector=".shell .section, .approach-flow > article";
 const sections=Array.from(document.querySelectorAll(selector));
 if(!sections.length)return;
 let active=null;
 const ignore="a,button,input,textarea,select,label,[role='button']";
 document.addEventListener("click",event=>{
  if(event.target.closest(ignore))return;
  const card=event.target.closest(".approach-flow > article");
  const section=card||event.target.closest(".shell .section");
  if(!section)return;
  if(active&&active!==section)active.classList.remove("vk-touch-active");
  if(active===section){section.classList.remove("vk-touch-active");active=null;return}
  section.classList.add("vk-touch-active");
  active=section;
 },{passive:true});
})();
