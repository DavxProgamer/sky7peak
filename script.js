/* MENU */
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const btn = document.getElementById("menuBtn");

    sidebar.classList.toggle("active");
    btn.classList.toggle("active");
}

/* DROPDOWN */
function toggleDropdown(el) {
    const item = el.parentElement;

    document.querySelectorAll(".menu-item").forEach(i => {
        if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
}

/* TEIA ORGÂNICA */
const canvas = document.getElementById("webCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

function createWeb() {
    lines = [];

    for (let i = 0; i < 45; i++) {
        let path = [];

        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;

        for (let j = 0; j < 18; j++) {
            x += (Math.random() - 0.5) * 90;
            y += (Math.random() - 0.5) * 90;

            path.push({ x, y });
        }

        lines.push({ path });
    }
}

createWeb();

function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(255,0,0,0.2)";

    lines.forEach(line => {
        ctx.beginPath();

        line.path.forEach((p, i) => {
            let waveX = Math.sin(time * 0.001 + i) * 8;
            let waveY = Math.cos(time * 0.001 + i) * 8;

            if (i === 0) ctx.moveTo(p.x + waveX, p.y + waveY);
            else ctx.lineTo(p.x + waveX, p.y + waveY);
        });

        ctx.stroke();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createWeb();
});

function toggleWpp() {
    const box = document.getElementById("wppOptions");
    box.classList.toggle("active");
}

/* LINK BOTAO */

function comprarWhats(nome) {

    const links = {
        "VIP 7 DIAS": "https://app.evopay.cash/checkout/cmnwd9fy50070mwe940tmingg",
        "VIP 15 DIAS": "https://app.evopay.cash/checkout/cmnwgaff00073mwe9i6sq1xz0"
    };

    if (links[nome]) {
        window.open(links[nome], "_blank");
    } else {
        console.log("Plano não encontrado:", nome);
    }
}