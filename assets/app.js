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
