let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let bg = new Bg(0, 0, canvas.width, canvas.height, "img/bg.png")
let bg2 = new Bg(0, -canvas.height, canvas.width, canvas.height, "img/bg.png")
let abelha = new Abelha(200, 400, 60, 60, "img/bee.png")
let aranha = new Aranha(200, 0, 60, 60, "img/spider.png")
let flor = new Flor(Math.random() * (canvas.width - 50), -50, 50, 50, "img/flower.png")
let texto = new Texto()
let perdeu = new Texto()
let ganhoo = new Texto()
let jogando = true
let ganhou = true;
let tempo = 60
let floresMeta = 10
let coletaSom = new Audio("sounds/collect.mp3")
let colisaoSom = new Audio("sounds/hit.mp3")
let gameoverSom = new Audio("sounds/gameover.mp3")

function main() {
  update()
  draw()
  requestAnimationFrame(main)
}

function update() {
  if (jogando) {
    bg.move(2, canvas.height, -canvas.height)
    bg2.move(2, canvas.height, -canvas.height)
    abelha.move()
    aranha.move()
    flor.move()
    abelha.animation("bee")
    aranha.animation("spider")
    flor.animation("flower")
    if (abelha.collide(aranha)) {
      abelha.vidas--
      colisaoSom.play()
      aranha.mudaPosicao()
      if (abelha.vidas <= 0) {
        ganhou = false
        jogando = false
        gameoverSom.play()
      }
    }
    if (abelha.collide(flor)) {
      abelha.flores++
      coletaSom.play()
      flor.mudaPosicao()
    }
    tempo -= 1 /60
    if (tempo <= 0) {
      if (abelha.flores < floresMeta) {
        ganhou = false
        jogando = false
        gameoverSom.play()
        
      }
      else 
      {
        jogando = false;

      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bg.desenha()
  bg2.desenha()
  flor.desenha()
  aranha.desenha()
  abelha.desenha()
  texto.desenha(
    "Vidas: " +
      abelha.vidas +
      "   Flores: " +
      abelha.flores +
      "/" +
      floresMeta +
      "   Tempo: " +
      Math.ceil(tempo),
    10,
    20
  )
  if (!jogando) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if(!ganhou){
    perdeu.desenha("GAME OVER", canvas.width / 2 - 100, canvas.height / 2)
    }
    else 
    {
      ganhoo.desenha("YOU WIN", canvas.width / 2 - 100, canvas.height / 2)
    }
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "a" || e.key === "ArrowLeft") abelha.direcao = -5
  if (e.key === "d" || e.key === "ArrowRight") abelha.direcao = 5
})

document.addEventListener("keyup", function (e) {
  if (
    e.key === "a" ||
    e.key === "d" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight"
  )
    abelha.direcao = 0
})

main()
