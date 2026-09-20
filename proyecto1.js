
document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       1. REPRODUCTOR DE MÚSICA
    ===================================================== */

    let isPlaying = false;

    const btnMusica = document.getElementById('btnMusica');
    const iconoMusica = document.getElementById('iconoMusica');
    const textoMusica = document.getElementById('textoMusica');
    const musicaFondo = document.getElementById('musicaFondo');

    btnMusica.addEventListener('click', async () => {

        if (!isPlaying) {

            try {

                await musicaFondo.play();

                isPlaying = true;

                textoMusica.textContent = 'Música: ON';
                iconoMusica.textContent = '🎶';

                btnMusica.classList.add(
                    'ring-2',
                    'ring-amber-300'
                );

            } catch (error) {

                console.error(
                    'No se pudo reproducir la música:',
                    error
                );

                textoMusica.textContent = 'Error de música';
                iconoMusica.textContent = '⚠️';

                setTimeout(() => {

                    textoMusica.textContent = 'Música: OFF';
                    iconoMusica.textContent = '🎵';

                }, 2000);

            }

        } else {

            musicaFondo.pause();

            isPlaying = false;

            textoMusica.textContent = 'Música: OFF';
            iconoMusica.textContent = '🎵';

            btnMusica.classList.remove(
                'ring-2',
                'ring-amber-300'
            );

        }

    });


    /* =====================================================
       2. CANVAS DE GALAXIA Y ESTRELLAS FUGACES
    ===================================================== */

    const canvas = document.getElementById('galaxia');
    const ctx = canvas.getContext('2d');

    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // Estrellas

    const NUM_ESTRELLAS = 200;
    const estrellas = [];

    for (let i = 0; i < NUM_ESTRELLAS; i++) {
        estrellas.push({
            x: Math.random() * width,
            y: Math.random() * height,
            tamano: Math.random() * 2.2 + 0.5,
            alfa: Math.random(),
            velocidad: Math.random() * 0.02 + 0.005
        });
    }

    // Pétalos de Girasol

    const NUM_PETALOS = 45;
    const petalos = [];

    for (let i = 0; i < NUM_PETALOS; i++) {
        petalos.push({
            x: Math.random() * width,
            y: Math.random() * height,
            tamano: Math.random() * 8 + 5,
            velocidadY: Math.random() * 1.2 + 0.6,
            velocidadX: Math.random() * 0.8 - 0.4,
            rotacion: Math.random() * 360,
            vRotacion: Math.random() * 2 - 1,
            color: Math.random() > 0.35 ? '#fbbf24' : '#f59e0b'
        });
    }

    // Estrellas Fugaces

    let estellaFugaz = null;

    function crearEstrellaFugaz() {
        if (Math.random() < 0.015 && !estellaFugaz) {
            estellaFugaz = {
                x: Math.random() * width,
                y: Math.random() * (height / 2),
                largo: Math.random() * 80 + 50,
                speed: Math.random() * 10 + 6,
                alfa: 1
            };
        }
    }

    function animarGalaxia() {
        ctx.fillStyle = 'rgba(3, 1, 8, 0.35)';
        ctx.fillRect(0, 0, width, height);

        // Dibujar Estrellas

        for (let i = 0; i < NUM_ESTRELLAS; i++) {
            const e = estrellas[i];

            e.alfa += e.velocidad;

            if (e.alfa > 1 || e.alfa < 0) {
                e.velocidad = -e.velocidad;
            }

            ctx.beginPath();

            ctx.arc(
                e.x,
                e.y,
                e.tamano,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = '#ffffff';

            ctx.globalAlpha = Math.abs(e.alfa);

            ctx.fill();
        }

        // Dibujar Estrella Fugaz

        crearEstrellaFugaz();

        if (estellaFugaz) {

            ctx.beginPath();

            ctx.moveTo(
                estellaFugaz.x,
                estellaFugaz.y
            );

            ctx.lineTo(
                estellaFugaz.x - estellaFugaz.largo,
                estellaFugaz.y + estellaFugaz.largo
            );

            ctx.strokeStyle =
                'rgba(255, 230, 150, ' +
                estellaFugaz.alfa +
                ')';

            ctx.lineWidth = 2;

            ctx.stroke();

            estellaFugaz.x += estellaFugaz.speed;
            estellaFugaz.y += estellaFugaz.speed;
            estellaFugaz.alfa -= 0.02;

            if (estellaFugaz.alfa <= 0) {
                estellaFugaz = null;
            }
        }

        // Dibujar Pétalos

        for (let i = 0; i < NUM_PETALOS; i++) {

            const p = petalos[i];

            p.y += p.velocidadY;
            p.x += p.velocidadX;
            p.rotacion += p.vRotacion;

            if (p.y > height + 20) {
                p.y = -20;
                p.x = Math.random() * width;
            }

            ctx.save();

            ctx.translate(p.x, p.y);

            ctx.rotate(
                (p.rotacion * Math.PI) / 180
            );

            ctx.beginPath();

            ctx.ellipse(
                0,
                0,
                p.tamano,
                p.tamano / 2.2,
                0,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = p.color;

            ctx.globalAlpha = 0.85;

            ctx.shadowColor = '#f59e0b';

            ctx.shadowBlur = 8;

            ctx.fill();

            ctx.restore();
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        requestAnimationFrame(animarGalaxia);
    }

    animarGalaxia();


    /* =====================================================
       3. CONTROLES DE PAUSA / REANUDAR LLUVIA
    ===================================================== */

    const btnVelocidad =
        document.getElementById('btnVelocidad');

    const fotoCards =
        document.querySelectorAll('.foto-card');

    let caidaPausada = false;

    btnVelocidad.addEventListener('click', () => {

        caidaPausada = !caidaPausada;

        fotoCards.forEach(card => {

            card.style.animationPlayState =
                caidaPausada
                    ? 'paused'
                    : 'running';

        });

        btnVelocidad.innerHTML = caidaPausada

            ? '<span>▶️ Reanudar Lluvia</span>'

            : '<span>⚡ Pausar Lluvia</span>';
    });


    /* =====================================================
       4. EXPLOSIÓN DE CORAZONES (EFECTO INTERACTIVO)
    ===================================================== */

    function dispararExplosion(x, y) {

        const simbolos = [
            '❤️',
            '🌻',
            '✨',
            '💛',
            '💖'
        ];

        for (let i = 0; i < 12; i++) {

            const el = document.createElement('span');

            el.className = 'particula-clic';

            el.textContent =
                simbolos[
                    Math.floor(
                        Math.random() * simbolos.length
                    )
                ];

            el.style.left = `${x}px`;
            el.style.top = `${y}px`;

            const angle =
                Math.random() * Math.PI * 2;

            const dist =
                Math.random() * 120 + 40;

            const tx =
                Math.cos(angle) * dist + 'px';

            const ty =
                Math.sin(angle) * dist + 'px';

            const rot =
                Math.random() * 360 + 'deg';

            el.style.setProperty('--tx', tx);
            el.style.setProperty('--ty', ty);
            el.style.setProperty('--rot', rot);

            document.body.appendChild(el);

            setTimeout(
                () => el.remove(),
                1000
            );
        }
    }


    /* =====================================================
       5. VISOR MODAL DE RECUERDOS (ZOOM & DETALLES)
    ===================================================== */

    const visorModal =
        document.getElementById('visorModal');

    const modalImg =
        document.getElementById('modalImg');

    const modalTitulo =
        document.getElementById('modalTitulo');

    const modalSub =
        document.getElementById('modalSub');

    const cerrarVisor =
        document.getElementById('cerrarVisor');

    const btnLike =
        document.getElementById('btnLike');

    const likeIcon =
        document.getElementById('likeIcon');

    const likeText =
        document.getElementById('likeText');


    fotoCards.forEach(card => {

        card.addEventListener('click', (e) => {

            dispararExplosion(
                e.clientX,
                e.clientY
            );

            const imgSrc =
                card.querySelector('img').src;

            const titulo =
                card.getAttribute('data-titulo') ||
                'Recuerdo Especial';

            const sub =
                card.getAttribute('data-sub') ||
                'Momentos inolvidables juntos';

            modalImg.src = imgSrc;

            modalTitulo.textContent = titulo;

            modalSub.textContent = sub;

            likeText.textContent = 'Me encanta';

            likeIcon.classList.remove(
                'anim-latido'
            );

            visorModal.classList.remove('hidden');

        });

    });


    btnLike.addEventListener('click', (e) => {

        dispararExplosion(
            e.clientX,
            e.clientY
        );

        likeText.textContent =
            '¡Guardado con amor! ❤️';

        likeIcon.classList.add(
            'anim-latido'
        );

    });


    const cerrarModal = () => {

        visorModal.classList.add('hidden');

    };


    cerrarVisor.addEventListener(
        'click',
        cerrarModal
    );


    visorModal.addEventListener(
        'click',
        (e) => {

            if (e.target === visorModal) {
                cerrarModal();
            }

        }
    );

});

