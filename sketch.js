//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//sons do jogo
let ponto;
let raquetada;
let trilha;
let backgroundImage;

  function preload(){
     backgroundImage = loadImage("pongue.png");
 
ponto = loadSound("ponto.mp3")
raquetada = loadSound("raquetada.mp3")
trilha = loadSound("trilha.mp3")
  }
function setup() {
    createCanvas(600, 400);
    image(backgroundImage, 0, 0, width, height);
    velocidadeYOponente = 6;
    trilha.loop(); // Inicie a trilha sonora
}

function draw() {
    background(backgroundImage);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete();
    movimentaMinhaRaquete();
    verificaColisaoRaquete();
    mostraRaqueteOponente();
    movimentaRaqueteOponenteWASD();
    verificaColisaoRaqueteOponente();
    incluiPlacar();
    marcaPonto();
}

function mostraBolinha(){
  ellipse(xBolinha, yBolinha, diametro, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete() {
    rect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
}

function mostraRaqueteOponente() {
    rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW) && yRaquete > 0) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW) && yRaquete + raqueteAltura < height) {
        yRaquete += 10;
    }
}

function movimentaRaqueteOponenteWASD() {
    if (keyIsDown(87) && yRaqueteOponente > 0) { // W key
        yRaqueteOponente -= velocidadeYOponente;
    }
    if (keyIsDown(83) && yRaqueteOponente + raqueteAltura < height) { // S key
        yRaqueteOponente += velocidadeYOponente;
    }
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento &&
        yBolinha - raio < yRaquete + raqueteAltura &&
        yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
    }
}

function verificaColisaoRaqueteOponente() {
    if (xBolinha + raio > xRaqueteOponente &&
        yBolinha - raio < yRaqueteOponente + raqueteAltura &&
        yBolinha + raio > yRaqueteOponente) {
        velocidadeXBolinha *= -1;
    }
}
function incluiPlacar() {
  stroke(139,69,19)
  textAlign(CENTER)
  textSize(21);
    fill(color(218,165,32))
    rect(150, 10, 40, 20)
    fill(255);
    text(meusPontos, 170, 26);
  fill(color(218,165,32))
    rect(450, 10, 40, 20)
    fill(255);
    text(pontosDoOponente, 470, 26);
}
function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play(); // Reproduza o som de ponto
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play(); // Reproduza o som de ponto
    }
}