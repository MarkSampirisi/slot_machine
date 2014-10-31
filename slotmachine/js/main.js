// Source Filename: SlotMachine
// Author: Mark Sampirisi
// Last Modified By: Mark Sampirisi
// Date last Modified: Oct 16, 2014
// Description: This is a Star Wars themed slot machine game. User can enter a bet amount to gain or lose money depending 
// on their spin result. The spin result is calculated using javascript, drawing 3 random numbers between 1 and 65. Each
// number has an associated image that is displayed on the webpage. Losses are added to a jackpot, which can be won by
// drawing a specific combination of images. Statistics such as # of wins, win/loss ratio, etc, are collected and 
// displayed to the user.
// Current Version: v. 1.0
// Version History: https://github.com/MarkSampirisi/slot_machine/commits/master

/// <reference path="jquery.js" />

//sounds (buffer automatically)
var intro = new Audio("sounds/darthvader_expectingyou.wav"); // intro sound
var problemSound = new Audio("sounds/c3po_yourfault.wav"); // sound file that plays when an error has occured
var jackpotSound = new Audio("sounds/darthvader_taughtyouwell.wav"); // sound file that plays when user wins the jackpot
var loseSound = new Audio("sounds/jabba_laugh.wav"); // sound that plays when user has run out of money
var spinSound = new Audio("sounds/spinButtonSound.wav"); // sound that plays when the spin button is clicked

intro.play();

// Tally
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var winRatio = 0;
var r2d2 = 0;
var solo = 0;
var droideka = 0;
var falcon = 0;
var jabba = 0;
var deathstar = 0;
var sevens = 0;
var blanks = 0;



/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;
    $("#jackpot").text(jackpot);
    $("#playerMoney").text(playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + " percent"); /* the percent sign is missing from this custom font... */
}

/* Utility function to reset all fruit tallies */
function resetTally() {
    r2d2 = 0;
    solo = 0;
    droideka = 0;
    falcon = 0;
    jabba = 0;
    deathstar = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        jackpotSound.play();
        alert("The force is strong with this one. You Won the " + jackpot + " Credit Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text(winnings + " Credits!");
    resetTally();
    checkJackPot();
}


/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    jackpot += +playerBet;  //player loss is added to jackpot
    $("div#winOrLose>p").text("You Lost!");
    resetTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results and displays the associated images. */
function Reels() {
    var betLine = [];
    var myImg;
    var outCome = [0, 0, 0];


    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                myImg = "img/Lightsaber_blank.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                myImg = "img/R2-D2.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                r2d2++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                myImg = "img/hanSolo.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                solo++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                myImg = "img/Droideka.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                droideka++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                myImg = "img/millenium-falcon.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                falcon++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                myImg = "img/jabba.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                jabba++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                myImg = "img/Deathstar.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                deathstar++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                myImg = "img/galacticCredit.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (r2d2 == 3) {
            winnings = playerBet * 10;
        }
        else if (solo == 3) {
            winnings = playerBet * 20;
        }
        else if (droideka == 3) {
            winnings = playerBet * 30;
        }
        else if (falcon == 3) {
            winnings = playerBet * 40;
        }
        else if (jabba == 3) {
            winnings = playerBet * 50;
        }
        else if (deathstar == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (r2d2 == 2) {
            winnings = playerBet * 2;
        }
        else if (solo == 2) {
            winnings = playerBet * 2;
        }
        else if (droideka == 2) {
            winnings = playerBet * 3;
        }
        else if (falcon == 2) {
            winnings = playerBet * 4;
        }
        else if (jabba == 2) {
            winnings = playerBet * 5;
        }
        else if (deathstar == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}

/* When the player clicks the spin button the game kicks off */
$("#spinButton").click(function () {
    playerBet = $("div#betEntry>input").val();

    if (playerMoney == 0) {
        loseSound.play();
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        problemSound.play();
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet <= 0) {
        problemSound.play();
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinSound.play();
        spinResult = Reels();
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        problemSound.play();
        alert("Please enter a valid bet amount");
    }

});

/* When the reset button is clicked, game statitstics return to default values. User must confirm */
$("#resetButton").click(function () {
    if (confirm("Are you sure you want to reset? \nAll stats will be lost!")) {
        resetAll();
        showPlayerStats();
    }
});

/* When the exit button is clicked, the slot machine tab is closed. User must confirm */
$("#exitButton").click(function () {
    if (confirm("Are you sure you want to exit?")) {
        close();
    }
});