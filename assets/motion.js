(function(){
  const targets=[...document.querySelectorAll('.about-left,.focus,.work-card,.quote-block,.signature-block,.foot')];
  targets.forEach((el,i)=>{el.classList.add('reveal-motion');el.style.transitionDelay=((i%5)*70)+'ms';});
  if(!('IntersectionObserver' in window)){targets.forEach(el=>el.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}})},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>observer.observe(el));
})();

(function(){
  // A single stable counter identity is used across the two public site domains.
  // This NEW counter does not overwrite or pretend to include the older provider's figures.
  const widget='https://hits.sh/lemueldanganan.github.io.svg?style=for-the-badge&label=Pageviews&color=38654c&labelColor=233e30';
  const stats='https://hits.sh/lemueldanganan.github.io/';
  const fallback='https://counterapi.com/counter.svg?ns=lemueldanganan.github.io&action=view&key=home&style=big&label=Pageviews&color=38654c';
  function make(tag,className,textContent){
    const el=document.createElement(tag);
    if(className)el.className=className;
    if(textContent!==undefined)el.textContent=textContent;
    return el;
  }
  function install(){
    if(document.getElementById('visitor-world-panel'))return;
    const panel=make('section','vwp-live-panel');
    panel.id='visitor-world-panel';
    panel.setAttribute('aria-label','Visitors from around the world');
    const heading=make('h3','vwp-live-heading','Visitors');
    const subtitle=make('p','vwp-live-subtitle','Page views across both website addresses');
    const badgeRow=make('div','vwp-live-badge-row');
    const statLink=make('a','vwp-live-badge-link');
    statLink.href=stats;
    statLink.target='_blank';
    statLink.rel='noopener noreferrer';
    statLink.setAttribute('aria-label','Open pageview counter statistics');
    const img=make('img','vwp-live-image');
    img.alt='Live website pageview total since the new counter started';
    img.loading='eager';
    img.decoding='async';
    img.referrerPolicy='no-referrer';
    img.src=widget;
    let triedBackup=false;
    const status=make('p','vwp-live-status','Tracking new page views on both sites; historical figures remain separate.');
    img.addEventListener('error',()=>{
      if(!triedBackup){
        triedBackup=true;
        img.alt='Original pageview counter';
        img.src=fallback;
        statLink.href='https://counterapi.com/stats/lemueldanganan.github.io/view/home';
        status.textContent='Original counter displayed as backup. Historical counts have not been reset.';
      }else{
        img.remove();
        statLink.textContent='Counter provider unavailable';
        status.textContent='The counter provider cannot be reached at present. No visitor totals have been reset.';
      }
    });
    statLink.appendChild(img);
    badgeRow.appendChild(statLink);
    const decorative=make('div','vwp-live-countries');
    decorative.setAttribute('aria-label','International visitors motif');
    decorative.innerHTML='<span>🇵🇭</span><span>🇺🇸</span><span>🇸🇬</span><span>🇬🇧</span><span>🇨🇦</span><span>🇦🇺</span><span>🌍</span>';
    const note=make('p','vwp-live-smallprint','Flags are decorative, not measured country totals.');
    const archive=make('div','vwp-live-archive');
    const a=make('a',null,'Original GitHub count');
    a.href='https://counterapi.com/stats/lemueldanganan.github.io/view/home';
    a.target='_blank';
    a.rel='noopener noreferrer';
    const b=make('a',null,'Original Vercel count');
    b.href='https://counterapi.com/stats/lemueldanganan-github-io.vercel.app/view/home';
    b.target='_blank';
    b.rel='noopener noreferrer';
    archive.append(a,b);
    panel.append(heading,subtitle,badgeRow,decorative,status,note,archive);
    const footer=document.querySelector('footer,.foot');
    if(footer&&footer.parentNode)footer.parentNode.insertBefore(panel,footer);
    else document.body.appendChild(panel);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
