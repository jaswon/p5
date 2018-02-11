var hoop

function preload () {
  hoop = loadModel('hoop.obj',true)
}

function setup () {
  createCanvas(640,640,WEBGL)
  noStroke()
  ambientMaterial(255)
  directionalLight(255,255,255,1,-1,1)
  ortho(-width/2,width/2,-height/2,height/2,0,2*height)
}

function draw () {
  let pos = frameCount * .05
  background(200)
  rotateX(-QUARTER_PI)
  rotateY(-QUARTER_PI)
  push()
  rotateY(pos)
  model(hoop)
  pop()
  translate(50*Math.cos(pos),-200*Math.sin(pos),0)
  sphere(25)
}
