// Scroll reveal
const els = document.querySelectorAll('.fade');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.12});
els.forEach(el=>io.observe(el));

// Animated stat counters (elements with data-count="123" and optional data-suffix="+")
const counters = document.querySelectorAll('[data-count]');
const countIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1100;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  });
}, {threshold:0.4});
counters.forEach(el=>countIO.observe(el));
