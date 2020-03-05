
    // calculem el valor aleatori entre 1 i 100
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    
    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');
    // el tag del boto d'execucio jugada
    const guessSubmit = document.querySelector('.guessSubmit');
    // el tag input on es troba la jugada
    const guessField = document.querySelector('.guessField');
    
    let guessCount = 1;
    let resetButton;

    function checkGuess() {
      // variable local amb la jugada en curs
      let userGuess = Number(guessField.value);
      if (guessCount === 1) {
        guesses.textContent = 'històric de jugades : ';
      }
      // Llista de jugades: concatenació de strings per afegir la nova jugada
      guesses.textContent += userGuess + ' ';
      
      // Model de la partida:  
      if (userGuess === randomNumber) {
        lastResult.textContent = 'Enhorabona! Ho has encertat!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
      } else if (guessCount === 10) {
          // final de partida
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';
        setGameOver();
      } else {
          // Error i per tant  hem de continuar provant
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if(userGuess < randomNumber) {
          lowOrHi.textContent = ' La darrera jugada va ser massa baixa!' ;
        } else if(userGuess > randomNumber) {
          lowOrHi.textContent = 'La darrera jugada va ser massa alta!';
        }
      }

      // actualitzem estat del lloc
      guessCount++;
      guessField.value = '';
      guessField.focus();
    }
    /* registrem un esdeveniment onclick en el botó guessSubmit i el objecte handler checkGuess   */
    guessSubmit.addEventListener('click', checkGuess);


    function setGameOver() {
      guessField.disabled = true;
      guessSubmit.disabled = true;
      // Creacio i inserció d'un tag butó de reset dinamicament
      resetButton = document.createElement('button');
      resetButton.textContent = 'Start new game';
      document.body.appendChild(resetButton); // agegirem al final del body
      resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
      guessCount = 1;
      const resetParas = document.querySelectorAll('.resultParas p');
      for(let i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
      }

      resetButton.parentNode.removeChild(resetButton);
      guessField.disabled = false;
      guessSubmit.disabled = false;
      guessField.value = '';
      guessField.focus();
      lastResult.style.backgroundColor = 'white';
      randomNumber = Math.floor(Math.random() * 100) + 1; // calculem un nou valor random 
    }
