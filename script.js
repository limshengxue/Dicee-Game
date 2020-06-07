//DOMStrings
const state = {
}

const DOMStrings = {
    dice1 : ".img1",
    dice2 : ".img2",
    title: ".title",
    play : ".play",
    new: ".new",
    state1 : ".state1",
    state2 : ".state2",
    input: "#bet",
    bet : ".betForm",
    betBtn : ".confirmBet"
}

class Player{
    constructor(){
        this.total = 100;
    }
    loseBet(amount){
        this.total = this.total - parseInt(amount,10);
    }
    winBet(amount){
        this.total = this.total + parseInt(amount,10);
    }
}

//ROll dice function
function roll(){
    //Get a random number for player 1 and 2
    const point1 = randomNum()
    const point2 = randomNum()
    //Display dice picture
    document.querySelector(DOMStrings.dice1).setAttribute("src",`images/dice${point1}.png`)
    document.querySelector(DOMStrings.dice2).setAttribute("src",`images/dice${point2}.png`)
    //Find winner
    let string = "";
    if(point1 > point2){
        string = "Player 1 Won !"
        state.player1.winBet(state.bet)
        state.player2.loseBet(state.bet)
    }else if (point1 < point2){
        string = "Player 2 Won !"
        state.player1.loseBet(state.bet)
        state.player2.winBet(state.bet)
    }else{
        string = "DRAW !"
    }
    //Render game result
    document.querySelector(DOMStrings.title).textContent = string
    //Render players' totals
    document.querySelector(DOMStrings.state1).textContent = `Current total = ${state.player1.total}`
    document.querySelector(DOMStrings.state2).textContent = `Current total = ${state.player2.total}`
    //Check status
    const loser = findLoser()
    //If loser exist disable all button
    if(loser){
        document.querySelector(DOMStrings.title).textContent = `${loser} ran out of cash !`
        document.querySelector(DOMStrings.betBtn).disabled = true
    }else{
        //Else only disabled play button and wait for input
        document.querySelector(DOMStrings.betBtn).disabled = false
    }
    document.querySelector(DOMStrings.play).disabled = true;
    
}

//Handle roll dice function 
document.querySelector(DOMStrings.play).addEventListener("click",roll)

//Get a random number between 1 to 6
function randomNum(){
    const random = Math.floor(Math.random() * 6) + 1
    return random
}

//New Game create new player with default state
function newGame(){
    state.player1 = new Player()
    state.player2 = new Player()
    //Render default player status
    document.querySelector(DOMStrings.state1).textContent = `Current total = ${state.player1.total}`
    document.querySelector(DOMStrings.state2).textContent = `Current total = ${state.player2.total}`
    document.querySelector(DOMStrings.bet).reset()
    document.querySelector(DOMStrings.title).textContent = "Dicee"
    document.querySelector(DOMStrings.dice1).setAttribute("src",`images/dice6.png`)
    document.querySelector(DOMStrings.dice2).setAttribute("src",`images/dice6.png`)
    //Disable the roll dice button
    document.querySelector(DOMStrings.play).disabled = true
    //Enable input btn
    document.querySelector(DOMStrings.betBtn).disabled = false
}

//Handle new game button
document.querySelector(DOMStrings.new).addEventListener("click",newGame)

//Initialise 
window.addEventListener("load",newGame)

//Handle submit bet button
document.querySelector(DOMStrings.bet).addEventListener("submit",e=>{
    e.preventDefault()
    //Get input value
    state.bet = document.querySelector(DOMStrings.input).value
    //Validate input value
    if(state.bet > 9){
       document.querySelector(DOMStrings.betBtn).disabled = true
        document.querySelector(DOMStrings.play).disabled = false 
    }else{
        alert('Please bet at least 10')
    }
})

function findLoser(){
    if(state.player1.total < 1){
        return "Player 1"
    }else if(state.player2.total < 1){
        return "Player 2"
    }
}