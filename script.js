// Variables globales del carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const track = document.getElementById('carouselTrack');
let autoplayInterval;

// Función para mover el carrusel
function moveSlide(direction) {
    currentSlide += direction;
    
    // Loopear al inicio/final
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    updateCarousel();
    resetAutoplay();
}

// Función para ir a una diapositiva específica
function setSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoplay();
}

// Actualizar el carrusel
function updateCarousel() {
    // Mover el track
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Autoplay
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    updateCarousel();
    startAutoplay();
    
    // Pausar autoplay al pasar el mouse
    const carouselHero = document.querySelector('.carousel-hero');
    if (carouselHero) {
        carouselHero.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        carouselHero.addEventListener('mouseleave', () => {
            startAutoplay();
        });
    }
});

// Funcionalidad de botones
document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.querySelectorAll('.btn-add');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener información del producto
            const card = this.closest('.product-card');
            const productName = card.querySelector('.product-info h3').textContent;
            const productPrice = card.querySelector('.price').textContent;
            
            // Mostrar notificación
            showNotification(`${productName} agregado al carrito`);
        });
    });
});

// Función para mostrar notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #C41E3A;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);