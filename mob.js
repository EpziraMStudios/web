document.addEventListener('DOMContentLoaded', function () {
    const playerContainer = document.querySelector('.player-container');
    const playerBall = document.querySelector('.player-ball');
    let top = 0;
    let left = 0;
    let speed = 2;
    const step = 5;
    const keysPressed = {};

    function handleKeyDown(event) {
        keysPressed[event.key] = true;
        movePlayerBall();
    }

    function handleKeyUp(event) {
        keysPressed[event.key] = false;
        movePlayerBall();
    }

    function movePlayerBall() {
        if (keysPressed['w']) {
            createParticle('down');
            top -= step * speed;
        }
        if (keysPressed['s']) {
            createParticle('up');
            top += step * speed;
        }
        if (keysPressed['a']) {
            createParticle('right');
            left -= step * speed;
        }
        if (keysPressed['d']) {
            createParticle('left');
            left += step * speed;
        }

        playerBall.style.top = `${top}px`;
        playerBall.style.left = `${left}px`;
    }

    function createParticle(direction) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        playerContainer.appendChild(particle);

        const particleSize = 3; // Tamaño más pequeño
        const particleSpeed = 2;

        // Posición inicial centrada en la pelota
        const playerRect = playerBall.getBoundingClientRect();
        const initialTop = playerRect.top + playerRect.height / 2 - particleSize / 2;
        const initialLeft = playerRect.left + playerRect.width / 2 - particleSize / 2;

        particle.style.width = `${particleSize}px`;
        particle.style.height = `${particleSize}px`;
        particle.style.top = `${initialTop}px`;
        particle.style.left = `${initialLeft}px`;

        animateParticle(particle, direction, particleSpeed);

        // Establece un temporizador para eliminar la partícula después de 3 segundos
        setTimeout(() => {
            playerContainer.removeChild(particle);
        }, 500);
    }

    function animateParticle(particle, oppositeDirection, particleSpeed) {
        const particleAnimation = setInterval(function () {
            switch (oppositeDirection) {
                case 'up':
                    particle.style.top = `${parseFloat(particle.style.top) - 1}px`;
                    break;
                case 'down':
                    particle.style.top = `${parseFloat(particle.style.top) + 1}px`;
                    break;
                case 'left':
                    particle.style.left = `${parseFloat(particle.style.left) - 1}px`;
                    break;
                case 'right':
                    particle.style.left = `${parseFloat(particle.style.left) + 1}px`;
                    break;
            }
        }, particleSpeed);
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
});



