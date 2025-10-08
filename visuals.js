let size = 100

function setup(){

  createCanvas(500,500)
  background(220)
  
  console.log('player 1')

  positions = [createVector( random(size,width-size) , random(size,height-size) )]

  for(let i = 0; i < 5; i++){

    let p
    let away = false

    while( !away ){

      p = createVector( random(size,width-size) , random(size,height-size) )

      away = true

      for(let j = 0; j < positions.length; j++){

        if( p.dist(positions[j]) < size){
          away = false
        }
        
      }

    }

    append(positions,p)

  }


  for(let i = 0; i < 5; i++){

    let p = positions[i]

    let pr = random(PI)

    applyMatrix(1, 0, 0, 1, p.x, p.y);

    rotate(pr)

    rect(-size/2,-size/2,size)

    rotate(-pr)
    applyMatrix(1, 0, 0, 1, -p.x, -p.y);

  }

}

function draw() {

}