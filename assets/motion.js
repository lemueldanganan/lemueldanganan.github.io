(function(){
  const targets=[...document.querySelectorAll('.about-left,.focus,.work-card,.quote-block,.signature-block,.foot')];
  targets.forEach((el,i)=>{el.classList.add('reveal-motion');el.style.transitionDelay=((i%5)*70)+'ms';});
  if(!('IntersectionObserver' in window)){targets.forEach(el=>el.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}})},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>observer.observe(el));
})();

(function(){
  function installVisitorPanel(){
    if(document.getElementById('visitor-world-panel')) return;
    const host=location.hostname || 'lemueldanganan.github.io';
    const panel=document.createElement('section');
    panel.id='visitor-world-panel';
    panel.setAttribute('aria-label','Worldwide visitors');
    panel.innerHTML=
      '<div class="vwp-title">Visitors Worldwide</div>'+
      '<div class="vwp-row">'+
        '<div class="counterapi" ns="'+host+'" key="home" action="view" label="visits" noIcon="true" bg="transparent" color="inherit"></div>'+
        '<span class="vwp-flags" aria-hidden="true">🌏 🇵🇭 🇺🇸 🇬🇧 🇨🇦 🇦🇺</span>'+
        '<a class="vwp-link" href="https://counterapi.com/stats/'+encodeURIComponent(host)+'/view/home" target="_blank" rel="noopener">View countries &amp; flags</a>'+
      '</div>'+
      '<div class="vwp-note">Country statistics appear automatically as visits are recorded.</div>';
    const footer=document.querySelector('footer,.foot');
    if(footer && footer.parentNode){footer.parentNode.insertBefore(panel,footer);}else{document.body.appendChild(panel);}
    if(!document.querySelector('script[data-counterapi-loader]')){
      const s=document.createElement('script');
      s.src='https://counterapi.com/c.js?ns='+encodeURIComponent(host);
      s.async=true;
      s.dataset.counterapiLoader='1';
      document.head.appendChild(s);
    }
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',installVisitorPanel,{once:true});}
  else{installVisitorPanel();}
})();