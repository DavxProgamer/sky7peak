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

const canvas = document.getElementById("webCanvas");
const ctx = canvas.getContext("2d");

let w, h;
let points = [];
const POINTS = 80;
const MAX_DIST = 120;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

class Point {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
    }
}

for (let i = 0; i < POINTS; i++) {
    points.push(new Point());
}

function drawWeb() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < points.length; i++) {
        points[i].move();

        for (let j = i + 1; j < points.length; j++) {
            let dx = points[i].x - points[j].x;
            let dy = points[i].y - points[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MAX_DIST) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 40, 40, ${1 - dist / MAX_DIST})`;
                ctx.lineWidth = 1;
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }

        // pontos brilhando
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.arc(points[i].x, points[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(drawWeb);
}

drawWeb();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createWeb();
});

function toggleWpp() {
    const box = document.getElementById("wppOptions");
    box.classList.toggle("active");
}

let produtoSelecionado = "";

// abre modal ao clicar em comprar
function comprarWhats(nome, preco) {
    produtoSelecionado = nome;
    document.getElementById("modalDias").classList.add("active");
}

// fecha modal
function fecharModal() {
    document.getElementById("modalDias").classList.remove("active");
}

// checkout final
function irCheckout(plano) {

    const links = {
    "VIP DIMA": {
        vip7: "https://app.evopay.cash/checkout/cmnxskoq4007qmwe9hoszale2",
        vip15: "https://app.evopay.cash/checkout/cmnxsr5it008amwe9unh5gjr5",
    },

    "VIP MESTRE": {
        vip7: "https://app.evopay.cash/checkout/cmnxsl0ht007umwe9kgrvsrox",
        vip15: "https://app.evopay.cash/checkout/cmnxspkfk0085mwe9pynnmwo3",
    },

    "VIP BRONZE": {
        vip7: "https://app.evopay.cash/checkout/cmnxsscz0008fmwe9x3s2pk4g",
        vip15: "https://app.evopay.cash/checkout/cmnxsu7eq008omwe9u9lojkhm",
    },

    "VIP FRoEE": {
        vip7: "https://app.evopay.cash/checkout/cmnxsscz0008fmwe9x3s2pk4g",
        vip15: "https://app.evopay.cash/checkout/cmnxsu7eq008omwe9u9lojkhm",
    }
};

    if (links[produtoSelecionado] && links[produtoSelecionado][plano]) {
        window.open(links[produtoSelecionado][plano], "_blank");
    } else {
        console.log("Erro no plano:", produtoSelecionado, plano);
    }
}

window.fecharPopup = function() {
  document.getElementById("popup").style.display = "none";
}