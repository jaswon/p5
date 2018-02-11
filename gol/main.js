// game of life

const cdim = 10
const bdim = 64
const boards = [[],[]]
var cur = 0

function neighbors(b,y,x) {
  let n = 0
  for (var i = -1 ; i < 2 ; i++) {
    for (var j = -1 ; j < 2 ; j++) {
      if (i || j) {
        try {
          n += b[y+i][x+j]
        } catch (e) {}
      }
    }
  }
  return n
}

function setup () {
  createCanvas(cdim*bdim,cdim*bdim)
  frameRate(15)
  noStroke()
  for (var i = 0 ; i < bdim ; i++) {
    boards[0].push([])
    for (var j = 0 ; j < bdim ; j++) {
      boards[0][i].push(Math.floor(Math.random()*2))
    }
  }
}

function draw () {
  boards[1-cur] = []
  for (var i = 0 ; i < bdim ; i++) {
    for (var j = 0 ; j < bdim ; j++) {
      fill((1-boards[cur][i][j])*255)
      rect(cdim*i,cdim*j,cdim,cdim)
    }
  }
  for (var i = 0 ; i < bdim ; i++) {
    boards[1-cur].push([])
    for (var j = 0 ; j < bdim ; j++) {
      n = neighbors(boards[cur],i,j)
      boards[1-cur][i].push((boards[cur][i][j] && n == 2 || n == 3)?1:0)
    }
  }
  cur = 1-cur
}
