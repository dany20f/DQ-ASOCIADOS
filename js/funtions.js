// HEADER
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.header-links a');
    const menu = document.getElementById('menu2');
    const menuLinks = document.getElementById('_links');

    // Agregar evento clic al menú para alternar la clase 'open'
    menu.addEventListener('click', () => {
        menu.classList.toggle('open');
        menuLinks.classList.toggle('open');
    });

    // Marcar el enlace activo
    links.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});


// PORTADA
document.addEventListener("DOMContentLoaded", function () {
    const portadas = document.querySelectorAll('.background');
    const puntos = document.querySelectorAll('.puntos .dot');
    let index = 0;
    let intervalId;
    let timerId;
    const inactividadDelay = 10000;
    let portadaVisible = true;

    mostrarPortada(0);
    autoCambioPortada();
    iniciarTemporizadorInactividad();

    function mostrarPortada(index) {
        portadas.forEach((portada, i) => {
            if (i === index) {
                portada.style.transform = 'translateX(0)';
            } else if (i < index) {
                portada.style.transform = 'translateX(-100%)';
            } else {
                portada.style.transform = 'translateX(100%)';
            }
        });
        puntos.forEach((punto, puntoIndex) => {
            punto.classList.toggle('active-dot', puntoIndex === index);
        });
    }

    function siguientePortada() {
        index = (index + 1) % portadas.length;
        if (index === 0) {
            portadas.forEach((portada) => {
                portada.style.transform = 'translateX(0)';
            });
        }
        mostrarPortada(index);
    }

    function anteriorPortada() {
        index = (index - 1 + portadas.length) % portadas.length;
        mostrarPortada(index);
    }

    function autoCambioPortada() {
        intervalId = setInterval(siguientePortada, 50000);
    }

    function iniciarTemporizadorInactividad() {
        clearTimeout(timerId);
        timerId = setTimeout(function () {
            clearInterval(intervalId);
            siguientePortada();
            autoCambioPortada();
        }, inactividadDelay);
    }

    function verificarPortadaVisible() {
        portadaVisible = isInViewport(portadas[index]);
        if (!portadaVisible) {
            clearInterval(intervalId);
        } else {
            autoCambioPortada();
        }
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    document.querySelector('.prev').addEventListener('click', function () {
        clearInterval(intervalId);
        anteriorPortada();
        iniciarTemporizadorInactividad();
    });

    document.querySelector('.next').addEventListener('click', function () {
        clearInterval(intervalId);
        siguientePortada();
        iniciarTemporizadorInactividad();
    });

    puntos.forEach((punto, puntoIndex) => {
        punto.addEventListener('click', function () {
            clearInterval(intervalId);
            index = puntoIndex;
            mostrarPortada(index);
            iniciarTemporizadorInactividad();
        });
    });

    document.addEventListener('mousemove', function () {
        clearTimeout(timerId);
        iniciarTemporizadorInactividad();
    });

    window.addEventListener('scroll', function () {
        verificarPortadaVisible();
    });
});
// SERVICIOS_INDEX

document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.querySelector(".prev_serv");
    const nextBtn = document.querySelector(".next_serv");
    const container = document.querySelector(".container_cards");
    prevBtn.addEventListener("click", () => {
        container.scrollBy({
            left: -300, // Ajusta el valor según el ancho de las cartas
            behavior: "smooth"
        });
        handleCardVisibility(); // Llama a la función para ajustar la visibilidad de las cartas
    });

    nextBtn.addEventListener("click", () => {
        container.scrollBy({
            left: 270, // Ajusta el valor según el ancho de las cartas
            behavior: "smooth"
        });
        handleCardVisibility(); // Llama a la función para ajustar la visibilidad de las cartas
    });

    // Función para ajustar la visibilidad de las cartas
    function handleCardVisibility() {
        // Obtener todas las cartas
        var cards = document.querySelectorAll('.servicios_card');

        // Iterar sobre las cartas y determinar cuáles están fuera de la vista
        cards.forEach(function (card) {
            if (isOutOfView(container, card)) {
                card.classList.add('hidden'); // Ocultar cartas fuera de la vista
            } else {
                card.classList.remove('hidden'); // Mostrar cartas dentro de la vista
            }
        });
    }

});



//SCRIPTS DE LA PESTAÑA NOSOTROS

document.addEventListener("DOMContentLoaded", function () {
    const titles = document.querySelectorAll('.valores_tittle');
    let rotated = false; // Movemos la declaración de rotated aquí para que sea accesible en todo el alcance de la función

    // Agregar evento click a cada título
    titles.forEach(title => {
        title.addEventListener('click', function () {
            const concept = this.nextElementSibling;
            const isConceptOpen = concept.classList.contains('show');

            // Ocultar todos los conceptos y restablecer la rotación de las imágenes
            hideAllConceptsAndResetImages();

            // Mostrar el concepto asociado al título clickeado
            if (!isConceptOpen) {
                concept.classList.add('show');
            }
        });

        // Agregar evento de clic al contenedor .valores_tittle
        title.addEventListener('click', function() {
            const image = this.querySelector('.valores_X'); // Asegurémonos de seleccionar la imagen dentro del título actual
            // Rotar la imagen 45 grados o volver a su estado original según el estado actual
            if (!rotated) {
                image.style.transform = 'rotate(45deg)';
            } else {
                image.style.transform = 'rotate(0deg)';
            }
            
            // Cambiar el estado de rotación
            rotated = !rotated;
        });
    });

    // Función para ocultar todos los conceptos y restablecer la rotación de las imágenes
    function hideAllConceptsAndResetImages() {
        const concepts = document.querySelectorAll('.valores_concept');
        concepts.forEach(concept => {
            concept.classList.remove('show');
        });

        // Restablecer la rotación de todas las imágenes dentro de .valores_tittle
        const images = document.querySelectorAll('.valores_tittle');
        images.forEach(image => {
            image.style.transform = 'rotate(0deg)';
        });
    }
});
