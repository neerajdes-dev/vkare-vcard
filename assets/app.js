document.body.classList.add("dark");
document.documentElement.setAttribute("data-theme","dark");
const shareButton=document.getElementById("shareBtn");
if(shareButton){shareButton.addEventListener("click",async()=>{
 const d={title:"Khagendra Mahant | VKare Pvt Ltd",text:"Khagendra Mahant - Investment Advisor, Banking & Financial Consultant",url:location.origin+location.pathname};
 if(navigator.share){try{await navigator.share(d);return}catch(e){if(e?.name==="AbortError")return}}
 try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(d.url)}else{
 const field=document.createElement("textarea");field.value=d.url;field.style.position="fixed";field.style.opacity="0";document.body.appendChild(field);field.select();const ok=document.execCommand("copy");field.remove();if(!ok)throw Error("Copy unavailable");
 }showVkToast("VCard link copied")}catch(e){window.prompt("Copy this VCard link:",d.url)}
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
 if(cards.length<1)return;
 const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduce)return;
 let started=false;
 cards.forEach((card,i)=>{
  card.style.setProperty("--vk-card-delay",String(i*130)+"ms");
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
  const bounds=section.getBoundingClientRect();
  section.style.setProperty("--vk-tap-x",((event.clientX-bounds.left)/bounds.width*100).toFixed(1)+"%");
  section.style.setProperty("--vk-tap-y",((event.clientY-bounds.top)/bounds.height*100).toFixed(1)+"%");
  active=section;
 },{passive:true});
})();

/* Phase 18.4: premium tactile enhancements with accessible feedback. */
function showVkToast(message){
 let toast=document.getElementById("vk-feedback-toast");
 if(!toast){
  toast=document.createElement("div");toast.id="vk-feedback-toast";
  toast.setAttribute("role","status");toast.setAttribute("aria-live","polite");
  document.body.appendChild(toast);
 }
 toast.textContent=message;
 toast.classList.add("vk-toast-visible");
 clearTimeout(showVkToast.timer);
 showVkToast.timer=setTimeout(()=>toast.classList.remove("vk-toast-visible"),2300);
}
(()=>{
 const portrait=document.querySelector(".hero .profile");
 if(portrait){
  portrait.addEventListener("click",()=>{
   const frame=portrait.closest(".profile-card");
   frame?.classList.remove("vk-portrait-pulse");
   void frame?.offsetWidth;
   frame?.classList.add("vk-portrait-pulse");
  });
 }
 const profile=document.querySelector(".profile-background .background-copy");
 if(profile){
  profile.addEventListener("click",event=>{
   const p=event.target.closest("p");
   if(!p||!profile.contains(p))return;
   profile.querySelectorAll("p").forEach(item=>item.classList.toggle("vk-reading-active",item===p));
  });
 }
 const principles=document.querySelector(".vk-values-signature > p");
 if(principles){
  const nodes=Array.from(principles.childNodes);
  nodes.forEach(node=>{
   if(node.nodeType!==Node.TEXT_NODE||!node.textContent.trim())return;
   const fragment=document.createDocumentFragment();
   node.textContent.split(/(Integrity|Trust|Transparency|Discipline|Client-Centricity)/g).forEach(part=>{
    if(!part)return;
    if(/^(Integrity|Trust|Transparency|Discipline|Client-Centricity)$/.test(part)){
     const chip=document.createElement("button");
     chip.type="button";chip.className="vk-principle-chip";chip.textContent=part;
     chip.setAttribute("aria-pressed","false");
     chip.addEventListener("click",()=>{
      principles.querySelectorAll(".vk-principle-chip").forEach(other=>{
       const on=other===chip&&other.getAttribute("aria-pressed")!=="true";
       other.setAttribute("aria-pressed",String(on));
      });
     });
     fragment.appendChild(chip);
    }else fragment.appendChild(document.createTextNode(part));
   });
   node.replaceWith(fragment);
  });
 }
})();

/* Phase 18.5–18.8: progressive, Android-conscious premium interactions. */
(()=>{
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
 const fine=window.matchMedia("(hover: hover) and (pointer: fine)");
 const sections=[...document.querySelectorAll(".shell .section,.approach-flow > article")];
 const cards=[...document.querySelectorAll(".approach-flow > article")];
 const progress=document.createElement("div");
 progress.className="vk-scroll-progress";progress.setAttribute("aria-hidden","true");
 document.body.appendChild(progress);
 let scrollFrame=0,lastY=window.scrollY,prevY=lastY;
 const dock=document.querySelector(".mobile-bar");
 const hero=document.querySelector(".hero");
 const onScroll=()=>{
  if(scrollFrame)return;
  scrollFrame=requestAnimationFrame(()=>{
   const y=window.scrollY;
   const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
   progress.style.transform="scaleX("+Math.min(1,Math.max(0,y/max))+")";
   if(dock&&Math.abs(y-prevY)>12){
    dock.classList.toggle("vk-dock-compact",y>300&&y>prevY);
    prevY=y;
   }
   if(hero&&!reduced.matches){
    hero.style.setProperty("--vk-depth",Math.max(-16,Math.min(0,-y*.035))+"px");
   }
   lastY=y;scrollFrame=0;
  });
 };
 window.addEventListener("scroll",onScroll,{passive:true});onScroll();
 if(!reduced.matches){
  const quote=document.querySelector(".vk-values-signature blockquote");
  if(quote&&"IntersectionObserver" in window){
   quote.classList.add("vk-signature-ready");
   const observer=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){
     quote.classList.add("vk-signature-visible");observer.disconnect();
    }
   },{threshold:.12});
   observer.observe(quote);
  }
 }
 // Spotlight only tracks a pointer on desktop; touch uses existing tap positions.
 if(fine.matches&&!reduced.matches){
  let pending=null,frame=0;
  document.addEventListener("pointermove",e=>{
   const target=e.target.closest(".shell .section,.approach-flow > article");
   if(!target)return;
   pending={target,x:e.clientX,y:e.clientY};
   if(frame)return;
   frame=requestAnimationFrame(()=>{
    const p=pending,rect=p.target.getBoundingClientRect();
    const x=(p.x-rect.left)/rect.width,y=(p.y-rect.top)/rect.height;
    p.target.style.setProperty("--vk-spot-x",(x*100).toFixed(1)+"%");
    p.target.style.setProperty("--vk-spot-y",(y*100).toFixed(1)+"%");
    p.target.classList.add("vk-spotlight-on");
    frame=0;
   });
  },{passive:true});
  sections.forEach(section=>section.addEventListener("pointerleave",()=>{
   section.classList.remove("vk-spotlight-on");
  },{passive:true}));
  cards.forEach(card=>{
   card.addEventListener("pointermove",e=>{
    const rect=card.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-.5;
    const y=(e.clientY-rect.top)/rect.height-.5;
    card.style.setProperty("--vk-tilt-x",(-y*2).toFixed(2)+"deg");
    card.style.setProperty("--vk-tilt-y",(x*2).toFixed(2)+"deg");
   },{passive:true});
   card.addEventListener("pointerleave",()=>{
    card.style.setProperty("--vk-tilt-x","0deg");
    card.style.setProperty("--vk-tilt-y","0deg");
   },{passive:true});
  });
 }
 // A maximum of three short-lived decorative particles per card tap.
 if(!reduced.matches){
  cards.forEach(card=>card.addEventListener("click",e=>{
   if(e.target.closest("a,button,input,textarea"))return;
   const rect=card.getBoundingClientRect();
   for(let i=0;i<3;i++){
    const dot=document.createElement("span");dot.className="vk-tap-particle";
    dot.style.left=(e.clientX-rect.left)+"px";
    dot.style.top=(e.clientY-rect.top)+"px";
    dot.style.setProperty("--vk-particle-x",((i-1)*22)+"px");
    dot.style.setProperty("--vk-particle-y",(-15-i*7)+"px");
    card.appendChild(dot);dot.addEventListener("animationend",()=>dot.remove(),{once:true});
   }
  }));
 }
 // Ensure OS motion preferences are respected when changed while the page is open.
 reduced.addEventListener?.("change",()=>{
  if(reduced.matches){
   document.querySelectorAll(".vk-tap-particle").forEach(el=>el.remove());
   document.querySelector(".vk-signature-ready")?.classList.add("vk-signature-visible");
   hero?.style.removeProperty("--vk-depth");
  }
 });
})();
