document.addEventListener('DOMContentLoaded',function(){
 const header=document.querySelector('header'), menu=document.querySelector('.menu');
 if(menu) menu.addEventListener('click',()=>header.classList.toggle('mobile-open'));
 document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('mobile-open')));
 const year=document.querySelector('#year'); if(year) year.textContent=new Date().getFullYear();
 document.querySelectorAll('.slider-shell').forEach(shell=>{
  const track=shell.querySelector('.horizontal-slider'); if(!track)return;
  const prev=shell.querySelector('.slider-arrow.prev'), next=shell.querySelector('.slider-arrow.next');
  const step=()=>Math.max(260,Math.round(track.clientWidth*.82));
  if(prev)prev.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
  if(next)next.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
  let timer=setInterval(()=>{if(track.scrollWidth<=track.clientWidth+5)return;const end=track.scrollWidth-track.clientWidth;if(track.scrollLeft>=end-8)track.scrollTo({left:0,behavior:'smooth'});else track.scrollBy({left:step(),behavior:'smooth'});},4500);
  shell.addEventListener('mouseenter',()=>clearInterval(timer));
 });
});
