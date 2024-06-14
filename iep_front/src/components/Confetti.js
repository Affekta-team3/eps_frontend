import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './Confetti.css';

const Confetti = () => {
    useEffect(() => {
        const confettiCount = 100;
        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0,
            opacity: 0.6,
            colors: ['#ffcc00', '#ff4081', '#3f51b5', '#4caf50', '#ffeb3b', '#ff5722'],
        };

        const confetti = () => {
            for (let i = 0; i < confettiCount; i++) {
                const div = document.createElement('div');
                div.className = 'confetti';
                div.style.backgroundColor = defaults.colors[Math.floor(Math.random() * defaults.colors.length)];
                document.body.appendChild(div);

                gsap.fromTo(div, {
                    x: Math.random() * window.innerWidth,
                    y: -100, // Start above the top of the screen
                    rotation: Math.random() * 360,
                }, {
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 100,
                    rotation: Math.random() * 360,
                    duration: 3 + Math.random() * 2,
                    ease: 'power4.out',
                    onComplete: () => div.remove(),
                });
            }
        };

        confetti();
    }, []);

    return null;
};

export default Confetti;
