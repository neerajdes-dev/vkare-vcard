document.body.classList.add("dark");document.documentElement.setAttribute("data-theme","dark");document.getElementById("shareBtn").addEventListener("click",async()=>{const d={title:"Khagendra Mahant | VKare Pvt Ltd",text:"Khagendra Mahant - Investment Advisor, Banking & Financial Consultant",url:location.href};if(navigator.share){try{await navigator.share(d)}catch(e){}}else{await navigator.clipboard.writeText(location.href);alert("Card link copied.")}});document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();
const n=document.getElementById("senderName").value.trim();
const em=document.getElementById("senderEmail").value.trim();
const mob=document.getElementById("senderMobile").value.trim();
const m=document.getElementById("senderMessage").value.trim();
const subject="VKare - Request from "+n;
const body=["Name: "+n,"Email: "+em,"Mobile Number: "+mob,"","Requested Details / Message:",m].join("\r\n");
window.location.href="mailto:connect@vkare.co.in?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
});