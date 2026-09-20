
document.addEventListener(
    'DOMContentLoaded',
    () => {


        /* ==========================================
           CARTAS
        =========================================== */

        const cartas =
            document.querySelectorAll('.carta');


        const modal =
            document.getElementById('modalCarta');


        const modalTitulo =
            document.getElementById('modalTitulo');


        const modalTexto =
            document.getElementById('modalTexto');


        const cerrarModal =
            document.getElementById('cerrarModal');


        /* ==========================================
           ABRIR CARTA
        =========================================== */

        cartas.forEach(
            carta => {

                carta.addEventListener(
                    'click',
                    () => {

                        const titulo =
                            carta.getAttribute(
                                'data-titulo'
                            );


                        const contenido =
                            carta.getAttribute(
                                'data-contenido'
                            );


                        modalTitulo.textContent =
                            titulo;


                        modalTexto.textContent =
                            contenido;


                        modal.style.display =
                            'flex';

                    }
                );

            }
        );


        /* ==========================================
           CERRAR MODAL
        =========================================== */

        cerrarModal.addEventListener(
            'click',
            () => {

                modal.style.display =
                    'none';

            }
        );


        /* ==========================================
           CERRAR AL HACER CLICK AFUERA
        =========================================== */

        window.addEventListener(
            'click',
            (e) => {

                if (e.target === modal) {

                    modal.style.display =
                        'none';

                }

            }
        );


    }
);

