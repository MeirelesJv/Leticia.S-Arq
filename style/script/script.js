const slider = document.querySelector('.slider');

function activatee(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}
document.addEventListener('click',activatee,false);

const projetoSlider = document.querySelector('.projetoSlider');

function activate(e) {
  const items = document.querySelectorAll('.projetoItem');
  e.target.matches('.projetoNext') && projetoSlider.append(items[0])
  e.target.matches('.projetoPrev') && projetoSlider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

function init(e) {
  if (!e.target.closest('.projeto')) return;
  let hero = document.querySelector('div[data-pos="0"]');
  let target = e.target.parentElement;
  hero.addEventListener('click', function() {
    hero.classList.toggle('fullscreen');
  });
  [target.dataset.pos,hero.dataset.pos] = [hero.dataset.pos,target.dataset.pos];
}

window.addEventListener('click',init,false);





window.onload = function() {
  document.getElementById('preloader').style.transition = 'opacity 0.5s ease'; // Iniciar a transição de opacidade
  document.getElementById('preloader').style.opacity = 0; // Definir opacidade para 0 (inicia a transição)

  // Aguardar o término da transição antes de ocultar a tela
  setTimeout(function() {
    document.getElementById('preloader').style.display = 'none';
  }, 500);
};