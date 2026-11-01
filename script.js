const content = window.RANGOLI_CONTENT || {contact:{},artworks:[]};
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
document.querySelector('#year').textContent=new Date().getFullYear();
const grid=document.querySelector('.gallery-grid');
const empty=document.querySelector('.gallery-empty');
const status=document.querySelector('.gallery-status');
const dialog=document.querySelector('#lightbox');
const artworks=(content.artworks||[]).filter(a=>a.src&&a.title&&a.alt&&Array.isArray(a.categories));
// Shuffle a separate copy so the gallery keeps the artist's chosen order.
const featured=[...artworks];
for(let i=featured.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[featured[i],featured[j]]=[featured[j],featured[i]];}
const slideshow=document.querySelector('.hero-slideshow');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
let featuredIndex=0,slideshowTimer,slideshowPaused=motionPreference.matches;
const featuredStage=document.createElement('div');
featuredStage.className='featured-stage';
const mainCard=slideshow.querySelector('.hero-photo-link');
mainCard.before(featuredStage);
const backCards=[1,2].map(depth=>{const card=document.createElement('div');card.className='featured-back featured-back-'+depth;card.setAttribute('aria-hidden','true');const image=document.createElement('img');image.alt='';image.decoding='async';card.append(image);featuredStage.append(card);return image;});
featuredStage.append(mainCard);
const featuredLabel=document.createElement('div');featuredLabel.className='featured-label';featuredLabel.textContent='SELECTED WORKS';slideshow.prepend(featuredLabel);
const featuredTitle=document.createElement('p');featuredTitle.className='featured-title';featuredStage.after(featuredTitle);
const progress=document.createElement('div');progress.className='featured-progress';progress.setAttribute('aria-hidden','true');slideshow.append(progress);
function displayFeatured(){const artwork=featured[featuredIndex];const photo=slideshow.querySelector('.hero-photo');photo.src=artwork.src;photo.alt=artwork.alt;backCards.forEach((image,i)=>{image.src=featured[(featuredIndex+i+1)%featured.length].src;image.parentElement.hidden=featured.length<i+2;});featuredTitle.textContent=artwork.title;slideshow.querySelector('.hero-photo-count').textContent=String(featuredIndex+1).padStart(2,'0')+' / '+String(featured.length).padStart(2,'0');if(!motionPreference.matches){mainCard.animate([{opacity:.35,transform:'translateY(16px) rotate(2deg)'},{opacity:1,transform:'translateY(0) rotate(-2deg)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});}progress.classList.remove('running');void progress.offsetWidth;progress.classList.add('running');}
function scheduleSlideshow(){clearInterval(slideshowTimer);const paused=slideshowPaused||document.hidden||featured.length<2;slideshow.classList.toggle('is-paused',paused);const pause=slideshow.querySelector('.hero-pause');pause.textContent=slideshowPaused?'▶':'Ⅱ';pause.setAttribute('aria-label',slideshowPaused?'Play slideshow':'Pause slideshow');pause.title=slideshowPaused?'Play slideshow':'Pause slideshow';if(!paused)slideshowTimer=setInterval(()=>{featuredIndex=(featuredIndex+1)%featured.length;displayFeatured();},5000);}
if(featured.length){slideshow.hidden=false;displayFeatured();slideshow.querySelector('.hero-pause').hidden=featured.length<2;slideshow.querySelector('.hero-next').hidden=featured.length<2;slideshow.querySelector('.hero-pause').addEventListener('click',()=>{slideshowPaused=!slideshowPaused;scheduleSlideshow();});slideshow.querySelector('.hero-next').addEventListener('click',()=>{featuredIndex=(featuredIndex+1)%featured.length;displayFeatured();scheduleSlideshow();});document.addEventListener('visibilitychange',scheduleSlideshow);motionPreference.addEventListener('change',event=>{slideshowPaused=event.matches;scheduleSlideshow();});scheduleSlideshow();}
let visible=[],current=0,opener;
function showArtwork(index){current=(index+visible.length)%visible.length;const a=visible[current];dialog.querySelector('img').src=a.src;dialog.querySelector('img').alt=a.alt;const caption=dialog.querySelector('figcaption');const heading=document.createElement('div');heading.textContent=a.title+' · '+a.categories.join(' / ');const description=document.createElement('p');description.className='lightbox-description';description.textContent=a.description||a.alt;caption.replaceChildren(heading,description);dialog.querySelector('.previous').hidden=visible.length<2;dialog.querySelector('.next').hidden=visible.length<2;}
function render(filter='All'){visible=artworks.filter(a=>filter==='All'||a.categories.includes(filter));grid.replaceChildren();empty.hidden=visible.length>0;empty.querySelector('h3').textContent=artworks.length?'More colour to come.':'A space for colour.';empty.querySelector('p').textContent=artworks.length?'No artworks in this category yet. Explore another category.':'The artwork collection will be added soon.';status.textContent=artworks.length?visible.length+' artwork'+(visible.length===1?'':'s'):'';visible.forEach((a,i)=>{const button=document.createElement('button');button.className='artwork';button.setAttribute('aria-label','View '+a.title);const img=document.createElement('img');img.src=a.src;img.alt=a.alt;img.loading='lazy';img.decoding='async';img.width=600;img.height=600;const title=document.createElement('h3');title.textContent=a.title;const category=document.createElement('p');category.textContent=a.categories.join(' / ');button.append(img,title,category);button.addEventListener('click',()=>{opener=button;showArtwork(i);dialog.showModal();});grid.append(button);});}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render(button.dataset.filter);}));
dialog.querySelector('.close-lightbox').addEventListener('click',()=>dialog.close());
dialog.querySelector('.previous').addEventListener('click',()=>showArtwork(current-1));
dialog.querySelector('.next').addEventListener('click',()=>showArtwork(current+1));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showArtwork(current-1);}if(event.key==='ArrowRight'){event.preventDefault();showArtwork(current+1);}});
dialog.addEventListener('close',()=>{dialog.querySelector('img').removeAttribute('src');opener?.focus();});
const contact=content.contact||{};
const links=document.querySelector('#contact-links');
function addLink(label,href){const a=document.createElement('a');a.textContent=label+' ↗';a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}links.append(a);}
if(contact.whatsapp?.trim()){const number=contact.whatsapp.replace(/\D/g,'');if(number)addLink('WhatsApp','https://wa.me/'+number);}
if(contact.phone?.trim())addLink('Call '+contact.phone,'tel:'+contact.phone.replace(/[^+\d]/g,''));
if(contact.email?.trim())addLink('Email','mailto:'+contact.email.trim());
if(contact.instagram?.trim()){try{const url=new URL(contact.instagram);if(url.protocol==='https:'&&(url.hostname==='instagram.com'||url.hostname==='www.instagram.com'))addLink('Instagram',url.href);}catch{}}
document.querySelector('#contact-pending').hidden=links.children.length>0;
render();
