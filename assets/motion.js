(function(){
  const targets=[...document.querySelectorAll('.about-left,.focus,.work-card,.quote-block,.signature-block,.foot')];
  targets.forEach((el,i)=>{el.classList.add('reveal-motion');el.style.transitionDelay=((i%5)*70)+'ms';});
  if(!('IntersectionObserver' in window)){targets.forEach(el=>el.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}})},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>observer.observe(el));
})();
