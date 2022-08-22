const jogo = document.querySelector(".jogo");
let quantDeCartas;
let intervalor;
let contDeJogadas = 0;

// selecionar a quantidade de cartas para começar o jogo
function comecarJogo() {
    quantDeCartas = Number(prompt("Escolha um número par de quartas para jogar:\n(Entre 4 a 14)"));

    while ((quantDeCartas < 4) || (quantDeCartas > 14) || (quantDeCartas % 2 !== 0)) {
        quantDeCartas = Number(prompt("O número de cartas deve ser par e entre 4 e 14!\nEscolha novamente:"));
    }

    selecionarQuantDeCartas(quantDeCartas);
    colocarCartas(quantDeCartas);
}



let opcoesDeCartas = ["./imagens/bobrossparrot.gif", "./imagens/explodyparrot.gif",
    "./imagens/fiestaparrot.gif", "./imagens/metalparrot.gif",
    "./imagens/revertitparrot.gif", "./imagens/tripletsparrot.gif",
    "./imagens/unicornparrot.gif"];


let cartasEscolhidas = [];

function selecionarQuantDeCartas(quantDeCartas) {
    for (let i = 0; i < quantDeCartas / 2; i++) {
        let numeroDaCarta = Math.floor(opcoesDeCartas.length * Math.random());
        cartasEscolhidas.push(opcoesDeCartas[numeroDaCarta]);
        cartasEscolhidas.push(opcoesDeCartas[numeroDaCarta]);
        opcoesDeCartas.splice(numeroDaCarta, 1);
    }
}

let contador = 0;

function colocarCartas(quantDeCartas) {
    while (contador <= quantDeCartas) {
        for (let i = 0; i < quantDeCartas / 2; i++) {
            let numeroDaCarta = Math.floor(cartasEscolhidas.length * Math.random());
            jogo.innerHTML = jogo.innerHTML +
                `<div class="carta" onclick="inverterCarta(this)">
        <div class="frente face">
        <img src="./imagens/front.png">
        </div>
        <div class="verso face">
        <img src=${cartasEscolhidas[numeroDaCarta]}>
        </div>
        </div>`;

            contador++;
            cartasEscolhidas.splice(numeroDaCarta, 1);
        }
    }
}


let cartasInvertidas = [];
let c1;
let c2;

function inverterCarta(clicada) {
    if (cartasInvertidas == 0) {
        if (clicada.classList.contains("clicado") == false) {
            clicada.classList.add("clicado")
            c1 = clicada;
            cartasInvertidas.push(clicada.innerHTML);
            contDeJogadas++;
        }
    } else if (cartasInvertidas.length == 1) {
        if (clicada.classList.contains("clicado") == false) {
            clicada.classList.add("clicado")
            c2 = clicada;
            cartasInvertidas.push(clicada.innerHTML);
            setTimeout(verificarCartas, 1000);
            contDeJogadas++;
        }
    }
}


function verificarCartas() {
    if (cartasInvertidas.length == 2) {
        if (cartasInvertidas[0] == cartasInvertidas[1]) {
            c1 = "";
            c2 = "";
            cartasInvertidas = [];
        } else {
            c1.classList.remove("clicado")
            c2.classList.remove("clicado")
            c1 = "";
            c2 = "";
            cartasInvertidas = [];
        }
    }
    finalizarJogo()
}


function finalizarJogo() {
    let acertos = document.querySelectorAll(".clicado")
    if (acertos.length == qtdCartas) {
        clearInterval(idInterval);
        alert(`Você venceu com ${contDeJogadas} rodadas.`) 
    }
}
