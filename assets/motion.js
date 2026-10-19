(function(){
  const targets=[...document.querySelectorAll('.about-left,.focus,.work-card,.quote-block,.signature-block,.foot')];
  targets.forEach((el,i)=>{el.classList.add('reveal-motion');el.style.transitionDelay=((i%5)*70)+'ms';});
  if(!('IntersectionObserver' in window)){targets.forEach(el=>el.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}})},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>observer.observe(el));
})();

(function(){
  const mainNs='lemueldanganan.github.io';
  const legacyNs='lemueldanganan-github-io.vercel.app';
  const base='https://counterapi.com/api/';
  const nsUrl=(ns,readonly)=>base+encodeURIComponent(ns)+'/view/home'+(readonly?'?readOnly=true':'');
  async function count(ns,readOnly){
    const ctrl=new AbortController();
    const timer=setTimeout(()=>ctrl.abort(),10000);
    try{
      const response=await fetch(nsUrl(ns,readOnly),{cache:'no-store',signal:ctrl.signal});
      if(!response.ok)throw new Error('HTTP '+response.status);
      const json=await response.json();
      const value=Number(json&&json.value);
      if(!Number.isSafeInteger(value)||value<0)throw new Error('Invalid count');
      return value;
    }finally{clearTimeout(timer);}
  }
  function el(tag,cls,text){
    const node=document.createElement(tag);
    if(cls)node.className=cls;
    if(text!==undefined)node.textContent=text;
    return node;
  }
  function install(){
    if(document.getElementById('visitor-world-panel'))return;
    const section=el('section','vwp-classic');
    section.id='visitor-world-panel';
    section.setAttribute('aria-label','Website visitor counter');
    section.appendChild(el('h3','vwp-classic-title','Visitors'));
    const body=el('div','vwp-classic-body');
    const line=el('div','vwp-total-line');
    const label=el('span','vwp-total-label','Pageviews');
    const total=el('strong','vwp-total-number','Loading…');
    total.setAttribute('aria-live','polite');
    line.append(label,total);
    const mini=el('div','vwp-flags-illustration');
    mini.setAttribute('aria-label','Decorative international flags; not a country ranking');
    mini.textContent='🇵🇭  🇺🇸  🇸🇬  🇮🇳  🇬🇧  🇨🇦  🇦🇺  🌍';
    const status=el('div','vwp-stats-note','Shared visitor count across both website addresses.');
    const country=el('div','vwp-stats-note');
    const countryLink=el('a','vwp-country-link','Country-by-country counter');
    countryLink.href='https://flagcounter.com/';
    countryLink.target='_blank';
    countryLink.rel='noopener noreferrer';
    country.append('For verified country totals, ',countryLink,' requires its own tracking ID.');
    body.append(line,mini,status,country);
    const bottom=el('div','vwp-classic-bottom');
    const old=el('span','vwp-history','Preserving previous counter records');
    const stats=el('a','vwp-stats-link','View source statistics ↗');
    stats.href='https://counterapi.com/'+mainNs+'/view/home';
    stats.target='_blank';
    stats.rel='noopener noreferrer';
    bottom.append(old,stats);
    section.append(body,bottom);
    const footer=document.querySelector('footer,.foot');
    if(footer&&footer.parentNode)footer.parentNode.insertBefore(section,footer);
    else document.body.appendChild(section);
    Promise.allSettled([count(mainNs,false),count(legacyNs,true)]).then(results=>{
      const a=results[0].status==='fulfilled'?results[0].value:null;
      const b=results[1].status==='fulfilled'?results[1].value:null;
      if(a!==null&&b!==null){
        total.textContent=(a+b).toLocaleString('en-US');
        old.textContent='Includes earlier counts from both domains';
      }else if(a!==null){
        total.textContent=a.toLocaleString('en-US');
        old.textContent='Earlier Vercel views not available';
      }else if(b!==null){
        total.textContent=b.toLocaleString('en-US');
        old.textContent='Historical Vercel views; current service unavailable';
      }else{
        total.textContent='Unavailable';
        old.textContent='The existing numbers have not been reset';
      }
    }).catch(()=>{
      total.textContent='Unavailable';
      old.textContent='The existing numbers have not been reset';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
