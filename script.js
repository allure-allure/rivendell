function showSection(id) {
  // скрываем главный экран
  document.getElementById('mainHeader').style.display = 'none';
  document.getElementById('fixedHeader').style.display = 'flex';

  // скрыть все секции
  document.querySelectorAll('.section').forEach(s => s.classList.remove('show'));

  // показать нужную секцию
  const section = document.getElementById(id);
  section.classList.add('show');

  // обновить активный пункт меню
  document.querySelectorAll('.menu li').forEach(li => li.classList.remove('active'));
  document.querySelectorAll('.menu li').forEach(li => li.classList.remove('hover'));
  const active = Array.from(document.querySelectorAll('.menu li')).find(li => li.textContent.includes(section.querySelector('h2').textContent));
  if (active) active.classList.add('active');
}

function shakeOnClick(element, sectionId) {
  // Добавляем эффект вибрации
  element.classList.add('shake');
  
  // Удаляем через 300 мс, чтобы можно было повторно нажимать
  setTimeout(() => {
    element.classList.remove('shake');
  }, 300);

  // Показываем нужную секцию
  showSection(sectionId);
}


window.addEventListener('DOMContentLoaded', () => {
  const slogan = document.getElementById('slogan');
  const text = slogan.textContent;
  slogan.textContent = ''; // очищаем

  let index = 0;
  const typingSpeed = 75; // скорость набора (мс)

  document.querySelectorAll('.menu li').forEach(li => {
    li.addEventListener('mouseenter', () => li.classList.add('hover'));
    li.addEventListener('mouseleave', () => li.classList.remove('hover'));
  });

  function typeNextChar() {
    if (index < text.length) {
      slogan.textContent += text.charAt(index);
      index++;
      setTimeout(typeNextChar, typingSpeed);
    }
  }
  

  // Стартуем после небольшой задержки — чтобы успела сработать анимация появления
  setTimeout(typeNextChar, 1100);
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  const menuLinks = document.querySelectorAll('.menu li');
  let currentSectionId = null;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
      currentSectionId = section.id;
    }
  });

  if (currentSectionId) {
    menuLinks.forEach(link => {
      const sectionId = link.getAttribute('onclick')?.match(/'(.+)'/)?.[1];
      if (sectionId === currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
});