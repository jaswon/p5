// https://twitter.com/beesandbombs/status/940639806522085376

const dim1 = 6
const dim2 = 15

function setup () {
  createCanvas(640,380,WEBGL)
  ortho()
  noStroke()
  directionalLight(255,255,255,1,-1,1)
  ambientMaterial(255)
}

function draw () {
  background(128)
  rotateX(-PI/4)
  rotateY(PI/4)
  for (var i = -dim1 ; i < dim1+1 ; i++) {
    for (var j = -dim1 ; j < dim1+1 ; j++) {
      push()
      translate(i*dim2,0,j*dim2)
      box(dim2,Math.floor(Math.sin((millis()*.05-i*i-j*j)*.06)*60+120),dim2)
      pop()
    }
  }
}
