const wdim = window.innerHeight
const bdim = 60
const cdim = Math.floor(wdim/bdim)

function seedDungeon (fillCond) {
  let b = []
  for (var i = 0 ; i < bdim ; i++) {
    b.push([])
    for (var j = 0 ; j < bdim ; j++) {
      b[i].push(fillCond(Math.random())?1:0)
    }
  }
  return b
}

function blankHoriz (b) {
  let mid = Math.floor(bdim/2)
  for (var i = mid - 1 ; i < mid + 2 ; i++) {
    for (var j = 0 ; j < bdim ; j++) b[i][j] = 0
  }
  return b
}

function blankVert (b) {
  let mid = Math.floor(bdim/2)
  for (var i = 0 ; i < bdim ; i++) {
    for (var j = mid - 1 ; j < mid + 2 ; j++) b[i][j] = 0
  }
  return b
}

function blankCross (b) {
  return blankHoriz(blankVert(b))
}

function wallAt(b,y,x) {
  if (y < 0 || y >= bdim || x < 0 || x >= bdim) return true
  return b[y][x]
}

function neighbors(b,y,x) {
  return function(r) {
    let n = 0
    r = Math.floor(Math.abs(r))
    for (var i = -r ; i < r+1 ; i++) {
      for (var j = -r ; j < r+1 ; j++) {
        if (i==0 && j==0) continue
        if (wallAt(b,y+i,x+j)) n++
      }
    }
    return n
  }
}

function iterateDungeon (wallCond) {
  return function(b) {
    let b1 = []
    for (var i = 0 ; i < bdim ; i++) {
      b1.push([])
      for (var j = 0 ; j < bdim ; j++) {
        b1[i][j] = wallCond(neighbors(b,i,j))
      }
    }
    return b1
  }
}

function iterate (f,n,x) {
  let res = x
  for (var i = 0 ; i < n ; i++) res = f(res)
  return res
}

function showDungeon(b) {
  console.log(b.map(r => r.map(x => x?"#":" ").join("")).join("\n"))
}

function smoothDungeon(b) {
  return iterate(iterateDungeon(n => n(1) > 4),4,iterate(iterateDungeon(n => n(1) > 3 || n(2) < 4),4,blankCross(b)))

}

function genDungeon() {
  return smoothDungeon(seedDungeon(x=>x<.4))
}

function setup () {
  createCanvas(cdim*bdim,cdim*bdim)
  noStroke()
  let dungeon = genDungeon()
  showDungeon(dungeon)
  for (var i = 0 ; i < bdim ; i++) {
    for (var j = 0 ; j < bdim ; j++ ) {
      fill((1-dungeon[i][j])*255)
      rect(cdim*i,cdim*j,cdim,cdim)
    }
  }
}
