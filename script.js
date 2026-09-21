// 1. Contador de Tiempo Juntos
// Define la fecha de inicio de la relación (Año, Mes - 1, Día)
const fechaInicio = new Date(2022, 7, 10); // Ejemplo: 10 de Febrero de 2022

function actualizarContador() {
  const ahora = new Date();
  const diferencia = ahora - fechaInicio;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  document.getElementById('counter').innerText = `Llevamos ${dias} días juntos ❤️`;
}

actualizarContador();

// 2. Animación Simple del Libro 3D
const page1 = document.getElementById('page1');
const nextPageBtn = document.getElementById('nextPage');
const prevPageBtn = document.getElementById('prevPage');
const book = document.getElementById('book');

page1.addEventListener('click', () => {
  book.style.transform = 'rotateY(-180deg)';
});

// "Siguiente Página" ahora abre la galaxia de amor
nextPageBtn.addEventListener('click', () => {
  window.location.href = 'galaxia.html';
});

prevPageBtn.addEventListener('click', () => {
  book.style.transform = 'rotateY(0deg)';
});

// 4. Al regresar de la galaxia, el libro se abre en la última página
// (la galaxia regresa con la dirección index.html?libro=3)
const parametros = new URLSearchParams(window.location.search);

if (parametros.get('libro') === '3') {

  // Muestra directamente la página final del libro
  book.style.transform = 'rotateY(-360deg)';

  // Y lleva la vista hasta el libro
  book.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Salta la introducción de las flores al volver
  const intro = document.getElementById('flowersIntro');
  if (intro) {
    intro.style.display = 'none';
  }
}
