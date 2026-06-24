import React, { useEffect, useRef } from "react";

export const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    let shootingStars = [];
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          alphaSpeed: 0.005 + Math.random() * 0.015,
          color: Math.random() > 0.8 ? "#9ab8fc" : Math.random() > 0.9 ? "#fcdd9a" : "#ffffff",
        });
      }
    };

    initCanvas();

    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Shooting star generator
    const addShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.003) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.5),
          length: 80 + Math.random() * 100,
          speed: 10 + Math.random() * 15,
          angle: (15 + Math.random() * 20) * (Math.PI / 180), // Diagonal flight
          alpha: 1,
        });
      }
    };

    const draw = () => {
      // Background base
      ctx.fillStyle = "#090616";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Lerp mouse coordinates for smooth parallax inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw normal stars with twinkle (alpha oscillation)
      stars.forEach((star) => {
        star.alpha += star.alphaSpeed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.alphaSpeed = -star.alphaSpeed;
        }

        // Apply mouse parallax shift
        let renderX = star.x + mouse.x * (star.radius * 0.5);
        let renderY = star.y + mouse.y * (star.radius * 0.5);

        // Keep coordinates in bounds
        if (renderX < 0) renderX += canvas.width;
        if (renderX > canvas.width) renderX -= canvas.width;
        if (renderY < 0) renderY += canvas.height;
        if (renderY > canvas.height) renderY -= canvas.height;

        ctx.beginPath();
        ctx.arc(renderX, renderY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
        ctx.fill();
      });

      // Draw and update shooting stars
      ctx.globalAlpha = 1;
      addShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        grad.addColorStop(0, `rgba(0, 240, 255, ${s.alpha})`);
        grad.addColorStop(0.5, `rgba(189, 0, 255, ${s.alpha * 0.5})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
        ctx.stroke();

        // Move the shooting star
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015; // Slow fade out

        // Remove offscreen or faded out
        if (
          s.alpha <= 0 ||
          s.x > canvas.width ||
          s.y > canvas.height
        ) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -2,
        pointerEvents: "none",
      }}
    />
  );
};
