/* ================================
   THE HAND ENGINE — INTERACTION CORE
   ================================ */

const hand = document.getElementById("hand");

/* -------------------------------
   1. TAP POP
--------------------------------*/
hand.addEventListener("click", () => {
    hand.style.animation = "tapPop 0.25s ease";
    setTimeout(() => {
        hand.style.animation = "float 4s ease-in-out infinite";
    }, 250);
});

/* -------------------------------
   2. DOUBLE-TAP WINK
--------------------------------*/
let lastTap = 0;
hand.addEventListener("click", () => {
    const now = Date.now();
    if (now - lastTap < 300) {
        hand.style.animation = "wink 0.35s ease";
        setTimeout(() => {
            hand.style.animation = "float 4s ease-in-out infinite";
        }, 350);
    }
    lastTap = now;
});

/* -------------------------------
   3. PRESS-AND-HOLD (Talk Mode)
--------------------------------*/
let pressTimer;
hand.addEventListener("mousedown", () => {
    pressTimer = setTimeout(() => {
        console.log("Talk Mode Activated (silent)");
    }, 550);
});
hand.addEventListener("mouseup", () => clearTimeout(pressTimer));
hand.addEventListener("mouseleave", () => clearTimeout(pressTimer));

/* -------------------------------
   4. HOVER / MOUSE TILT
--------------------------------*/
document.addEventListener("mousemove", (e) => {
    const rect = hand.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const tiltX = (y / 40) * -1;
    const tiltY = x / 40;

    hand.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

/* Reset tilt when mouse leaves window */
document.addEventListener("mouseleave", () => {
    hand.style.transform = "rotateX(0deg) rotateY(0deg)";
});

/* -------------------------------
   5. MOBILE TILT SUPPORT
--------------------------------*/
window.addEventListener("deviceorientation", (event) => {
    const tiltX = event.beta / 10;  // front/back
    const tiltY = event.gamma / 10; // left/right

    hand.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

/* -------------------------------
   6. BREATHING GLOW
--------------------------------*/
let glowPulse = 0;
setInterval(() => {
    glowPulse += 0.05;
    const glow = 0.35 + Math.sin(glowPulse) * 0.15;

    hand.style.filter = `drop-shadow(0 0 18px rgba(0, 150, 255, ${glow}))`;
}, 50);
