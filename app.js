const grid = document.querySelector('.grid');
let shooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
const resultsDisplay = document.querySelector('#resultsDisplay');

// 224 squares are being created, board is filled with them
for(let i = 0; i < 225; i++){
    const square = document.createElement('div');
    square.setAttribute('id',[i]);
    grid.appendChild(square);
}

// all created squares are being put into an array
const squares = Array.from(document.querySelectorAll('.grid div'));

// array with 40 invaders is being created; numbers represent their original starting positions
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

// invaders are being put into the squares
function draw(){
    for(let i = 0; i < alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.add('invader');
    }
}

draw();

// invaders are being removed from current square when they move to the next one 
function remove(){
    for(let i = 0; i < alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.remove('invader');
    }
}

// shooter is being placed in the board
squares[shooterIndex].classList.add('shooter');

// shooter is being moved through the board
function moveShooter(e){
    squares[shooterIndex].classList.remove('shooter');
    switch(e.key){
        case 'ArrowLeft':
            if(shooterIndex % width !== 0) shooterIndex -= 1;
            break;
        case 'ArrowRight':
            if(shooterIndex % width < width -1) shooterIndex += 1;
            break;
    }
    squares[shooterIndex].classList.add('shooter');
}

// eventlistener listening for user directions
document.addEventListener('keydown', moveShooter);

// invaders are being moved in their predictable pattern across the board
function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();

    if(rightEdge && goingRight){
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width +1;
            direction = -1;
            goingRight = false;
        }
    }

    if(leftEdge && !goingRight){
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width - 1;
            direction = 1;
            goingRight = true;
        }
    }

    for(let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction;
    }

    draw();

    // if squares[> 210].classList.contains('invader')
    // squares[shooterIndex].classList.contains('invader', 'shooter')
    if(squares[shooterIndex].classList.contains('invader', 'shooter')){
        resultsDisplay.innerHTML = "Game Over";
        clearInterval(invadersId);
    }

}

// setting the speed at which the invaders are being moved across the board
invadersId = setInterval(moveInvaders, 100);







