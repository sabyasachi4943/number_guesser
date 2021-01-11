// Game values
let low = 1,
    high = 10,
    correct_ans = getRandomNum(low, high),
    guessesLeft = 3;


// UI elements
const game = document.querySelector('#game'),
      lowNum = document.querySelector('.low-num'),
      maxNum = document.querySelector('.high-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI low and high
lowNum.textContent = low;
maxNum.textContent = high;

// Play again event listner
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload(); 
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    
    // validate
    if(isNaN(guess) || guess < low || guess > high){
        setMessage(`Please enter a number between ${low} and ${high}`, 'red'); 
    }

    
    // Check if won 
    if(guess === correct_ans){
        // //Disable input
        // guessInput.disabled = true;
        // // Change border color
        // guessInput.style.borderColor = 'green';
        // // Set message
        // setMessage(`${correct_ans} is correct, YOU WIN!`, 'green');
        gameOver(true, `${correct_ans} is correct, YOU WIN!`);

    } else {
        // Wrong number
        guessesLeft -= 1;
        

        if(guessesLeft === 0){
            // Game over - lost
            // guessInput.disabled = true;
            // // Change border color
            // guessInput.style.borderColor = 'red';
            // // Set message
            // setMessage(`Game Over, you lost. The correct number was ${correct_ans}`, 'red');
            gameOver(false, `Game Over, you lost. The correct number was ${correct_ans}`)
        } else {
            // Game continues - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear Input 
            guessInput.value = '';   
            
            if(guess>correct_ans){
                setMessage(`${guess} is greater than the correct answer, ${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            } 
            if(guess<correct_ans){
                setMessage(`${guess} is smaller than the correct answer, ${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            }
        

            // Tell user its the wrong number
            // setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }

    }
});

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(low, high){
   return Math.floor(Math.random()*(high-low+1)+low);
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}