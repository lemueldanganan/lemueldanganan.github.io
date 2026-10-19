(function(){
  const targets=[...document.querySelectorAll('.about-left,.focus,.work-card,.quote-block,.signature-block,.foot')];
  targets.forEach((el,i)=>{el.classList.add('reveal-motion');el.style.transitionDelay=((i%5)*70)+'ms';});
  if(!('IntersectionObserver' in window)){targets.forEach(el=>el.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}})},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>observer.observe(el));
})();

(function(){
  // Original CounterAPI data remains untouched. Both domains now share one counter key.
  const primary='lemueldanganan.github.io';
  const legacy='lemueldanganan-github-io.vercel.app';
  const official='https://counterapi.com/counter.svg?ns='+encodeURIComponent(primary)+'&action=view&key=home&label=page%20views&style=flat&color=365D47';
  const backup='https://hits.sh/lemueldanganan.github.io.svg?label=New%20page%20views&style=flat-square&color=365D47';
  function installVisitorPanel(){
    if(document.getElementById('visitor-world-panel'))return;
    const panel=document.createElement('section');
    panel.id='visitor-world-panel';
    panel.setAttribute('aria-label','Website page views');
    const heading=document.createElement('div');
    heading.className='vwp-title';
    heading.textContent='Website Page Views';
    const row=document.createElement('div');
    row.className='vwp-row';
    const img=document.createElement('img');
    img.alt='Shared page-view counter for both website addresses';
    img.style.cssText='max-width:100%;width:auto;height:30px;vertical-align:middle';
    img.decoding='async';
    img.loading='eager';
    const link=document.createElement('a');
    link.href='https://counterapi.com/'+primary+'/view/home';
    link.rel='noopener noreferrer';
    link.target='_blank';
    link.className='vwp-link';
    link.appendChild(img);
    const note=document.createElement('div');
    note.className='vwp-note';
    note.textContent='One page-view counter shared by GitHub Pages and Vercel.';
    let fallback=false;
    img.addEventListener('error',function(){
      if(!fallback){
        fallback=true;
        link.href='https://hits.sh/lemueldanganan.github.io/';
        img.alt='New page views since the counter repair';
        note.textContent='Backup counter: new page views only. The original historical counts have not been reset.';
        img.src=backup+'&reload='+Date.now();
      }else{
        img.remove();
        link.textContent='Live counter unavailable';
        note.textContent='Neither counter service could load; historical data has not been changed.';
      }
    });
    img.src=official+'&refresh='+Date.now();
    row.appendChild(link);
    const archived=document.createElement('div');
    archived.className='vwp-note';
    const oldLink=document.createElement('a');
    oldLink.href='https://counterapi.com/'+legacy+'/view/home';
    oldLink.target='_blank';
    oldLink.rel='noopener noreferrer';
    oldLink.textContent='Previous Vercel-only counter history';
    archived.append('Earlier Vercel views were counted separately. ',oldLink,'.');
    panel.append(heading,row,note,archived);
    const footer=document.querySelector('footer,.foot');
    if(footer && footer.parentNode)footer.parentNode.insertBefore(panel,footer);
    else document.body.appendChild(panel);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installVisitorPanel,{once:true});
  else installVisitorPanel();
})();
