document.addEventListener("DOMContentLoaded", () => {

    const carta = document.querySelector(".carta");
    const boton = document.getElementById("volver");


    /* =========================================
       EFECTO DE MOVIMIENTO DE LA CARTA
    ========================================= */

    document.addEventListener("mousemove", (e) => {

        if (window.innerWidth <= 700) return;

        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);

        const movimientoX = x * 5;
        const movimientoY = y * 5;

        carta.style.setProperty(
            "--movimiento-x",
            `${movimientoX}px`
        );

        carta.style.setProperty(
            "--movimiento-y",
            `${movimientoY}px`
        );

    });


    /* =========================================
       BOTÓN REGRESAR
    ========================================= */

    boton.addEventListener("click", () => {

        // Animación de salida

        carta.classList.add("salir");

        setTimeout(() => {

            window.history.back();

        }, 600);

    });


    /* =========================================
       EFECTO DE ESCRITURA EN EL TÍTULO
    ========================================= */

    const titulo = document.querySelector(".titulo");

    const textoOriginal = titulo.textContent.trim();

    titulo.textContent = "";

    let i = 0;

    function escribirTitulo() {

        if (i < textoOriginal.length) {

            titulo.textContent += textoOriginal.charAt(i);

            i++;

            setTimeout(escribirTitulo, 100);

        }

    }


    setTimeout(() => {

        titulo.style.opacity = "1";
        titulo.style.transform = "translateX(0)";

        escribirTitulo();

    }, 900);


});
