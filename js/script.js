// Pequenas interações: menu mobile, scroll suave, preenchimento do ano e validação do formulário
(function(){
  // Toggle do menu em telas pequenas: mostra/oculta a nav quando o botão é clicado
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', ()=>{
    nav.classList.toggle('open');
    nav.style.display = nav.classList.contains('open') ? 'flex' : '';
  });

  // Scroll suave para links internos (âncoras)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // Fecha menu mobile se estiver aberto
        if(nav.classList.contains('open')){nav.classList.remove('open');nav.style.display='';}
      }
    })
  });

  // Atualiza o ano no rodapé automaticamente
  const year = document.getElementById('year'); if(year) year.textContent = new Date().getFullYear();

  // === Tema (escuro/claro) ===
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  // Se o usuário já escolheu, aplica; caso contrário, mantém o padrão (escuro)
  if(currentTheme === 'light'){
    document.body.classList.add('light-theme');
    if(themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('light-theme');
    if(themeToggle) themeToggle.textContent = '🌙';
  }

  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const isLight = document.body.classList.toggle('light-theme');
      // Atualiza ícone e armazena preferência
      themeToggle.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    })
  }

  // Validação simples do formulário e simulação de envio (não há backend)
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if(!form) return;

  // Mostra mensagem de erro para um campo específico (pequeno helper)
  function showError(el, msg){
    const s = form.querySelector(`small[data-for="${el}"]`);
    if(s) s.textContent = msg || '';
  }

  // Limpa mensagens de erro antes de validar novamente
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

    // Regras de validação simples, suficientes para um formulário de contato
    if(name.length < 2){ showError('name','Nome muito curto'); valid=false }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ showError('email','E-mail inválido'); valid=false }
    if(message.length < 10){ showError('message','Mensagem muito curta'); valid=false }
    if(!valid) return;

    // Simula envio e mostra feedback ao usuário
    feedback.textContent = 'Enviando...';
    // Simulação: substitua por integração real (fetch/axios) quando tiver backend
    setTimeout(()=>{
      feedback.textContent = 'Mensagem enviada com sucesso — agradeço o contato! (simulação)';
      form.reset();
      // Log local para depuração do aluno (não enviar em produção)
      console.log('Simulação envio:', {name,email,message});
    }, 900);
  });
})();