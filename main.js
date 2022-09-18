// Variables
let cardsClicked = 0;
let card1 = null;
let card2 = null;
let primerResultado = null;
let segundoResultado = null;
let movements = 0;
let correct = 0;
let time = false;
let timer = 40;
let initialTimer = 40;
let regretTime = null;

// This is for the HTML
let showMovements = document.getElementById("movimientos")
let showCorrect = document.getElementById("aciertos")
let showTime = document.getElementById("t-restante")
// Number generator
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(() => {return Math.random() - 0.5});
console.log(numbers)

// Functions
function countTime() {
    regretTime = setInterval(() => {
        timer--;
        showTime.innerHTML = `Tiempo: ${timer} Segundos`;
        if(timer == 0) {
            clearInterval(regretTime);
            blockCards();
        }
    },1000)
}

// Function To Block Cards
function blockCards() {
    for (let i = 0; i<=15; i++) {
        let cardBlocked = document.getElementById(i);
        cardBlocked.innerHTML = numbers[i];
        cardBlocked.disabled = true;
    }
}

// Principal Function
function destapar(id) {
    if(time == false) {
        countTime();
        time = true;
    }
    cardsClicked++;
    console.log(cardsClicked);

    if(cardsClicked == 1){
        // Show number 
        card1 = document.getElementById(id);
        primerResultado = numbers[id]
        card1.innerHTML = primerResultado;
        // disable button
        card1.disabled = true;
    } else if (cardsClicked == 2) {
        // Show second number
        card2 = document.getElementById(id);
        segundoResultado = numbers[id];
        card2.innerHTML = segundoResultado
        // disable button
        card2.disabled = true;
        // Increment movements
        movements++
        showMovements.innerHTML = `Movimientos: ${movements}`

        if(primerResultado == segundoResultado) {
            // Reload cards clicked
            cardsClicked = 0;
            // Increment "Aciertos"
            correct++
            showCorrect.innerHTML = `Aciertos: ${correct}`
            // If you won
            if(correct == 8){
                clearInterval(regretTime);
                showCorrect.innerHTML = `Aciertos: ${correct} 😍`
                showMovements.innerHTML = `Movimientos: ${movements} 😉`
            }
        } else {
            setTimeout(() => {
                card1.innerHTML = " ";
                card2.innerHTML = " ";
                card1.disabled = false;
                card2.disabled = false;
                cardsClicked = 0;
            },600);
        }
    }
}