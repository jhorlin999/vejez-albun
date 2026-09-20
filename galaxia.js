/* =====================================
   ESTRELLAS
===================================== */

const estrellas =
    document.getElementById("estrellas");


for (let i = 0; i < 100; i++) {

    const estrella =
        document.createElement("div");

    estrella.classList.add("estrella");

    estrella.style.left =
        Math.random() * 100 + "%";

    estrella.style.top =
        Math.random() * 80 + "%";


    const tamaño =
        Math.random() * 3 + 1;

    estrella.style.width =
        tamaño + "px";

    estrella.style.height =
        tamaño + "px";


    estrella.style.animationDelay =
        Math.random() * 3 + "s";


    estrella.style.animationDuration =
        (1.5 + Math.random() * 3) + "s";


    estrellas.appendChild(estrella);
}


/* =====================================
   BRILLOS
===================================== */

const brillos =
    document.getElementById("brillos");


for (let i = 0; i < 35; i++) {

    const brillo =
        document.createElement("div");

    brillo.classList.add("brillo");


    brillo.style.left =
        Math.random() * 100 + "%";

    brillo.style.top =
        Math.random() * 80 + "%";


    brillo.style.animationDelay =
        Math.random() * 4 + "s";


    brillo.style.animationDuration =
        (2 + Math.random() * 3) + "s";


    brillos.appendChild(brillo);
}


/* =====================================
   MOVIMIENTO DEL MOUSE
===================================== */

const girasoles =
    document.querySelectorAll(".girasol");


document.addEventListener("mousemove", (e) => {

    const x =
        (e.clientX / window.innerWidth - 0.5) * 2;

    const y =
        (e.clientY / window.innerHeight - 0.5) * 2;


    girasoles.forEach((girasol, index) => {

        const movimiento =
            (index + 1) * 2;

        girasol.style.marginLeft =
            `${x * movimiento}px`;

        girasol.style.marginTop =
            `${y * movimiento}px`;

    });

});