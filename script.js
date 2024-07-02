let size = 3;
let turnX = true;
let selection = [];
let selectionWinning = [];

const winnerMessageContainer = document.getElementById("winnerMessageContainer");

// add event listener on start button
const startGame = document.getElementById("startGame");
startGame.addEventListener("click", () => {
    size = document.getElementById("gameSize").value;
    generateGameselection(size);
});

// generate game selection
const generateGameselection = (size) => {
    turnX = true;
    selection = [];
    selectionWinning = [];
    const gameContainer = document.getElementById("gamePlayContainer");
    gameContainer.innerHTML = "";
    winnerMessageContainer.innerHTML = "";
    gameContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size; i++) {
        selection[`${i}`] = [];
        for (let j = 0; j < size; j++) {
            let boxColumn = document.createElement("div");
            boxColumn.setAttribute("class", "game-play-box");
            boxColumn.setAttribute("id", `gamePlayBox_${i}_${j}`);
            boxColumn.setAttribute("i", `${i}`);
            boxColumn.setAttribute("j", `${j}`);
            gameContainer.append(boxColumn);
            boxColumn.addEventListener('click', boxClickAction, false);

        }
    }
}

const boxClickAction = (e) => {
    if (e.target.classList.contains("marked")) { return false; }
    if (turnX) {
        e.target.classList.add("mark-player2", "marked");
        turnX = false;
        selection[e.target.getAttribute("i")][e.target.getAttribute("j")] = "Y";
    } else {
        e.target.classList.add("mark-player1", "marked");
        turnX = true;
        selection[e.target.getAttribute("i")][e.target.getAttribute("j")] = "R";
    }

    //Now check winner
    checkWinner();
}


const checkWinner = () => {
    //Check horizontal rows
    if (checkWinnerHorizontal()) {
        return true;
    } else if (checkWinnerVertical()) {
        //Check vertical rows
        return true;
    } else if (checkWinnerDiagonalLR()) {
        // check diagonal left to right 
        return true;
    } else if (checkWinnerDiagonalRL()) {
        // check diagonal left to right 
        return true;
    } else {
        return false;
    }



}

const checkWinnerHorizontal = () => {
    for (let i = 0; i < size; i++) {
        let comparable = selection[i][0];
        let matched = 0;
        selectionWinning = [];
        for (let j = 0; j < size; j++) {
            if (comparable === selection[i][j]) {
                matched++;
                selectionWinning.push(`gamePlayBox_${i}_${j}`);
            }
        }
        if (matched == size && typeof comparable !== 'undefined') {
            freezGame(`${comparable} is the Winner of this game. Click on start to play again`);
            return true;
        }
    }
}

const checkWinnerVertical = () => {
    for (let i = 0; i < size; i++) {
        let comparable = selection[0][i];
        let matched = 0;
        selectionWinning = [];
        for (let j = 0; j < size; j++) {
            if (comparable === selection[j][i]) {
                matched++;
                selectionWinning.push(`gamePlayBox_${j}_${i}`);
            }
        }
        if (matched == size && typeof comparable !== 'undefined') {
            freezGame(`${comparable} is the Winner of this game. Click on start to play again`);
            return true;
        }
    }
}

const checkWinnerDiagonalLR = () => {
    let comparable = selection[0][0];
    let matched = 0;
    selectionWinning = [];
    for (let i = 0; i < size; i++) {
        for (let j = i; j <= i; j++) {
            if (comparable === selection[i][j]) {
                matched++;
                selectionWinning.push(`gamePlayBox_${i}_${j}`);
            }
        }
    }
    if (matched == size && typeof comparable !== 'undefined') {
        freezGame(`${comparable} is the Winner of this game. Click on start to play again`);
        return true;
    }
}

const checkWinnerDiagonalRL = () => {
    let comparable = selection[0][0];
    let matched = 0;
    comparable = selection[0][size - 1];
    matched = 0;
    selectionWinning = [];
    for (let i = 0; i < size; i++) {
        for (let j = size - i - 1; j >= size - i - 1; j--) {
            if (comparable === selection[i][j]) {
                matched++;
                selectionWinning.push(`gamePlayBox_${i}_${j}`);
            }
        }
    }
    if (matched == size && typeof comparable !== 'undefined') {
        freezGame(`${comparable} is the Winner of this game. Click on start to play again`);
        return true;
    }
}

const freezGame = (message) => {
    winnerMessageContainer.innerText = message;
    const gamePlayBox = document.getElementsByClassName("game-play-box");
    for (let i = 0; i < gamePlayBox.length; i++) {
        gamePlayBox[i].classList.add('marked');
    }

    for (let winElem of selectionWinning) {
        document.getElementById(winElem).classList.add("winner-box-highlight");
    }
    console.log(selectionWinning);
}