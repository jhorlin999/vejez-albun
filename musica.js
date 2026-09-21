(function () {
  const CLAVE = 'musicaVejez';
  const datosGuardados = JSON.parse(sessionStorage.getItem(CLAVE) || '{}');
  const pistasGuardadas = datosGuardados.pistas || {};
  let audio = document.getElementById('bgMusic') || document.getElementById('musicaFondo');

  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'musicaCompartida';
    audio.loop = true;
    audio.hidden = true;
    document.body.appendChild(audio);
  }

  audio.preload = 'auto';
  const fuente = audio.querySelector('source');
  const RUTA_CANCION = audio.getAttribute('src') || (fuente && fuente.getAttribute('src')) || 'musica/canserbero.mp3';
  let restauracionCompletada = false;
  audio.src = RUTA_CANCION;

  function guardarEstado() {
    if (audio.readyState < 1 || !restauracionCompletada) return;

    pistasGuardadas[RUTA_CANCION] = audio.currentTime;
    sessionStorage.setItem(CLAVE, JSON.stringify({
      pistas: pistasGuardadas,
      isPlaying: !audio.paused
    }));
  }

  function obtenerBoton() {
    let boton = document.getElementById('musicToggle') || document.getElementById('btnMusica');

    if (!boton) {
      if (!document.getElementById('estiloMusicaCompartida')) {
        const estilo = document.createElement('style');
        estilo.id = 'estiloMusicaCompartida';
        estilo.textContent = `
          .music-player-shared {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 1000;
            border: 0;
            border-radius: 30px;
            padding: 12px 20px;
            background: #d63384;
            color: #fff;
            cursor: pointer;
            font: 600 14px sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, .3);
          }
          .music-player-shared:hover { background: #b8256f; }
        `;
        document.head.appendChild(estilo);
      }

      boton = document.createElement('button');
      boton.id = 'musicToggle';
      boton.type = 'button';
      boton.className = 'music-player-shared';
      boton.title = 'Pausar o reanudar la canción';
      document.body.appendChild(boton);
    }

    return boton;
  }

  function actualizarBoton() {
    const boton = obtenerBoton();
    const texto = document.getElementById('textoMusica');
    const icono = document.getElementById('iconoMusica');
    const reproduciendo = !audio.paused;

    if (boton) boton.textContent = reproduciendo ? '⏸️ Pausar Canción' : '🎵 Reproducir Canción';
    if (texto) texto.textContent = reproduciendo ? 'Música: ON' : 'Música: OFF';
    if (icono) icono.textContent = reproduciendo ? '🎶' : '🎵';
  }

  function restaurarCancion() {
    const posicion = pistasGuardadas[RUTA_CANCION];

    if (Number.isFinite(posicion)) {
      audio.currentTime = posicion;
    }

    restauracionCompletada = true;

    if (datosGuardados.isPlaying) {
      audio.play().catch(() => {
        actualizarBoton();
      });
    }
  }

  const boton = obtenerBoton();
  if (boton) {
    boton.addEventListener('click', async () => {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
      guardarEstado();
      actualizarBoton();
    });
  }

  audio.addEventListener('play', actualizarBoton);
  audio.addEventListener('pause', actualizarBoton);
  audio.addEventListener('timeupdate', guardarEstado);
  audio.addEventListener('loadedmetadata', restaurarCancion, { once: true });
  window.addEventListener('pagehide', guardarEstado);
  window.addEventListener('beforeunload', guardarEstado);
  actualizarBoton();

  if (audio.readyState >= 1) restaurarCancion();
})();