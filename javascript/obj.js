class Obj {

  frame = 1
  timer = 0
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.img = null
  }
  desenha() {
    if (!this.img) {
      this.img = new Image()
      this.img.src = this.color
    } else {
      if (this.img.src !== this.color) {
        this.img.src = this.color
      }
    }
    if (this.img.complete) ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  animation(nome) {
    this.timer++
    if (this.timer > 10) {
      this.timer = 0
      this.frame++
      if (this.frame > 4) this.frame = 1
      if (this.frame === 1) this.color = "img/" + nome + ".png"
      else this.color = "img/" + nome + this.frame + ".png"
      if (this.img && this.img.src !== this.color) this.img.src = this.color
    }
  }
}

class Abelha extends Obj {
  direcao = 0
  vidas = 3
  flores = 0
  move() {
    this.x += this.direcao
  }
  collide(obj) {
    if (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y
    ) {
      return true
    } else {
      return false
    }
  }
}

class Aranha extends Obj {
  move() {
    this.y += 2
    if (this.y > 900) {
      this.y = -50
      this.x = Math.random() * 400
    }
  }
  mudaPosicao() {
    this.y = -50
    this.x = Math.random() * 600
  }
}

class Bg extends Obj {
  move(speed, limit, pos) {
    this.y += speed
    if (this.y > limit) {
      this.y = pos
    }
  }
}

class Flor extends Aranha {
  mudaPosicao() {
    this.y = -50
    this.x = Math.random() * 600
  }
}

class Texto {
  desenha(texto, x, y) {
    ctx.font = "20px Arial"
    ctx.fillStyle = "white"
    ctx.fillText(texto, x, y)
  }
}
