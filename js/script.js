// Pequenas interações: nav mobile, scroll suave, validação de formulário
(function(){
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', ()=>{
    nav.classList.toggle('open');
    nav.style.display = nav.classList.contains('open') ? 'flex' : '';
  });

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});
        if(nav.classList.contains('open')){nav.classList.remove('open');nav.style.display='';}
      }
    })
  });

  // Footer year
  const year = document.getElementById('year'); if(year) year.textContent = new Date().getFullYear();

  // Form validation + simulate send
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if(!form) return;

  function showError(el, msg){
    const s = form.querySelector(`small[data-for="${el}"]`);
    if(s) s.textContent = msg || '';
  }

  function clearErrors(){
    form.querySelectorAll('small.error').forEach(s=>s.textContent='');
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    clearErrors();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let valid = true;
    if(name.length < 2){ showError('name','Nome muito curto'); valid=false }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ showError('email','E-mail inválido'); valid=false }
    if(message.length < 10){ showError('message','Mensagem muito curta'); valid=false }
    if(!valid) return;

    feedback.textContent = 'Enviando...';
    // Simula envio (sem backend) — aqui você pode integrar API real
    setTimeout(()=>{
      feedback.textContent = 'Mensagem enviada com sucesso — agradeço o contato! (simulação)';
      form.reset();
      console.log('Simulação envio:', {name,email,message});
    }, 900);
  });
})();