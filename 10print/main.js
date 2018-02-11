// 10 PRINT CHR$(205.5+RND(1)); : GOTO 10

const speed = 10
const size = 10
const weight = .2
let cx = 0
let cy = 0

function slash (f) {
  beginShape()
  vertex(f*size,0)
  vertex(size*(weight+f*(1-2*weight)),0)
  vertex((1-f)*size,size*(1-weight))
  vertex((1-f)*size,size)
  vertex(size*(1-weight+f*(2*weight-1)),size)
  vertex(f*size,size*weight)
  endShape(CLOSE)
}

function setup () {
  createCanvas(windowWidth,windowHeight)
  noStroke()
  fill(0)
}

function draw () {
  for (var i = 0 ; i < speed ; i++) {
    if (cx > width) {
      cx = 0
      cy += size
    }
    if (cy > height) noLoop()
    push()
    translate(cx,cy)
    slash(Math.floor(Math.random()*2))
    pop()
    cx += size
  }
}
