import React, { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const colors = ['#fca311', '#14213d', '#e5e5e5', '#003049'];

    const mouse = {
      x: null,
      y: null
    };

    // Track mouse position
    function handleMouseMove(event) {
      mouse.x = event.x;
      mouse.y = event.y;

      for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle());
      }
    }

    window.addEventListener('mousemove', handleMouseMove);

    // Create particles
    class Particle {
      constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95; // particles shrink over time
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Handle particles animation
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Remove small particles
        if (particlesArray[i].size <= 0.3) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    }
    animate();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ position: 'relative' ,marginTop:'10vh'}}>
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100vh' }}>
        Home
      </div>
    </div>
  );
}
