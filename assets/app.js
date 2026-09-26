const CONFIG={
  linkedin:"",
  meeting:"",
  googleMeet:""
};
const optional=[
  ["LinkedIn",CONFIG.linkedin],
  ["Schedule a Meeting",CONFIG.meeting],
  ["Google Meet",CONFIG.googleMeet]
].filter(([,url])=>url && url.trim());
if(optional.length){
  document.getElementById("optionalLinks").hidden=false;
  document.getElementById("optionalActions").innerHTML=optional.map(([label,url])=>'<a href="'+url+'" target="_blank" rel="noopener">'+label+'</a>').join("");
}
const themeToggle=document.getElementById("themeToggle");
const savedTheme=localStorage.getItem("vkare-theme");
if(savedTheme==="dark") document.body.classList.add("dark");
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("vkare-theme",document.body.classList.contains("dark")?"dark":"light");
});
document.getElementById("shareBtn").addEventListener("click",async()=>{
  const data={title:"Khagendra Mahant | VKare Pvt Ltd",text:"Khagendra Mahant - Investment Banker & Financial Professional, VKare Pvt Ltd",url:location.href};
  if(navigator.share){try{await navigator.share(data);}catch(e){}}
  else{await navigator.clipboard.writeText(location.href);alert("Card link copied to clipboard.");}
});