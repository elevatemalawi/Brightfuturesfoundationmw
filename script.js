document.addEventListener('DOMContentLoaded',function(){
 const header=document.querySelector('header'), menu=document.querySelector('.menu');
 if(menu) menu.addEventListener('click',()=>header.classList.toggle('mobile-open'));
 document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('mobile-open')));
 const year=document.querySelector('#year'); if(year) year.textContent=new Date().getFullYear();
 // Active navigation state is based on the current page.
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 document.querySelectorAll('nav a[href]').forEach(a=>{const target=(a.getAttribute('href')||'').split('#')[0].toLowerCase();if(target===current)a.classList.add('active')});
 // Slider controls and gentle auto-advance; pause while hovered, focused or off-screen.
 document.querySelectorAll('.slider-shell').forEach(shell=>{
  const track=shell.querySelector('.horizontal-slider'); if(!track)return;
  const prev=shell.querySelector('.slider-arrow.prev'), next=shell.querySelector('.slider-arrow.next');
  const step=()=>Math.max(260,Math.round(track.clientWidth*.82));
  if(prev)prev.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
  if(next)next.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let timer=null,visible=true,paused=false;
  const advance=()=>{if(track.scrollWidth<=track.clientWidth+5)return;const end=track.scrollWidth-track.clientWidth;if(track.scrollLeft>=end-8)track.scrollTo({left:0,behavior:'smooth'});else track.scrollBy({left:step(),behavior:'smooth'})};
  const start=()=>{if(timer||paused||!visible)return;timer=setInterval(advance,4800)};
  const stop=()=>{if(timer){clearInterval(timer);timer=null}};
  shell.addEventListener('mouseenter',()=>{paused=true;stop()});
  shell.addEventListener('mouseleave',()=>{paused=false;start()});
  shell.addEventListener('focusin',()=>{paused=true;stop()});
  shell.addEventListener('focusout',()=>{paused=false;start()});
  if('IntersectionObserver'in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop()},{threshold:.12}).observe(shell)}else start();
 });
 // Reveal content as it enters the viewport, with a no-JS fallback.
 const reveal=document.querySelectorAll('main section .container > *, main section .container .card, main section .container .slide-card');
 if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  reveal.forEach(el=>el.classList.add('js-reveal'));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});
  reveal.forEach(el=>observer.observe(el));
 }
});
fetch('content/news/index.json').then(r=>r.ok?r.json():[]).then(items=>{
 const published=items.filter(x=>x.published).sort((a,b)=>new Date(b.date)-new Date(a.date));
 ['news-list','home-news-list'].forEach(id=>{
  const host=document.getElementById(id); if(!host)return;
  if(!published.length)return; host.innerHTML='';
  published.forEach(item=>{const article=document.createElement('article');article.className='slide-card news';
   if(item.image){const img=document.createElement('img');img.src=item.image;img.alt=item.title;img.loading='eager';article.appendChild(img)}
   const copy=document.createElement('div');copy.className='slide-card-copy';
   const tag=document.createElement('span');tag.className='tag';tag.textContent=item.category||'Update';copy.appendChild(tag);
   const h=document.createElement('h3');h.textContent=item.title;copy.appendChild(h);
   const date=document.createElement('p');date.className='small';date.textContent=new Date(item.date).toLocaleDateString();copy.appendChild(date);
   const summary=document.createElement('p');summary.textContent=item.summary;copy.appendChild(summary);
   article.appendChild(copy);host.appendChild(article);
  });
 });
}).catch(()=>{});
