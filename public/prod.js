/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createAsteroids__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controls__ = __webpack_require__(2);
// THIS IS YOUR JAVASCRIPT DOCUMENT!




// declare audio variable
let audio = new Audio('http://dusani.fvi-grad.com/explosion.wav');

// GENERATE ASTEROIDS IN HTML DOCUMENT

Object(__WEBPACK_IMPORTED_MODULE_0__createAsteroids__["a" /* default */])();

// MOVEMENT CONTROLS FOR SHIP

// declare & initialize movement variables
var xPosition = 100;
var yPosition = 100;
var xSpeed = 1;
var ySpeed = 0;
var maxSpeed = 5;

// declare & initialize controller variables
let controlMovement = {
    upPressed: 0,
    downPressed: 0,
    leftPressed: 0,
    rightPressed: 0
}

Object(__WEBPACK_IMPORTED_MODULE_1__controls__["a" /* default */])(controlMovement);


function slowDownX() {
    if (xSpeed > 0)
        xSpeed = xSpeed - 1;
    if (xSpeed < 0)
        xSpeed = xSpeed + 1;
}

function slowDownY() {
    if (ySpeed > 0)
        ySpeed = ySpeed - 1;
    if (ySpeed < 0)
        ySpeed = ySpeed + 1;
}


var shipHealth = 1000;
var loopCounter = 0;
var asteroidCounter = 0;

function gameLoop() {

    // SPACESHIP MOVEMENT

    // new position
    xPosition = xPosition + xSpeed;
    yPosition = yPosition + ySpeed;

    // actually change on-screen position by adjusting CSS
    document.getElementById('ship').style.left = xPosition;
    document.getElementById('ship').style.top = yPosition;

    // change speed when user presses keys
    if (controlMovement.upPressed == 1)
        ySpeed = Math.max(ySpeed - 1, -1 * maxSpeed);
    if (controlMovement.downPressed == 1)
        ySpeed = Math.min(ySpeed + 1, 1 * maxSpeed)
    if (controlMovement.rightPressed == 1)
        xSpeed = Math.min(xSpeed + 1, 1 * maxSpeed);
    if (controlMovement.leftPressed == 1)
        xSpeed = Math.max(xSpeed - 1, -1 * maxSpeed);

    // deceleration
    if (controlMovement.upPressed == 0 && controlMovement.downPressed == 0)
        slowDownY();
    if (controlMovement.leftPressed == 0 && controlMovement.rightPressed == 0)
        slowDownX();

    // check position of ship on screen
    var shipBox = document.getElementById("ship").getBoundingClientRect();

    // ASTEROID MOVEMENT

    // count how many times we've been through the gameLoop
    loopCounter++;

    // every 33 cycles (three times a second), launch a new asteroid BY GIVING IT A CLASS OF "MOVING"
    // but only do this 100 times
    if (loopCounter >= 32 && asteroidCounter <= 99) {
        document.getElementById("asteroid" + asteroidCounter.toString()).className = "moving";
        asteroidCounter++;
        loopCounter = 0;
    }

    // every cycle, check & update status of each moving asteroid
    var arrayOfMovingAsteroids = document.getElementsByClassName("moving");
    for (var i = 0; i < arrayOfMovingAsteroids.length; i++) {

        // move current asteroid 2px to the left (but remove it from the "moving" array if it's already offscreen)
        if (parseInt(arrayOfMovingAsteroids[i].style.right) < 3000) {
            arrayOfMovingAsteroids[i].style.right = parseInt(arrayOfMovingAsteroids[i].style.right) + 5 + 'px';
        } else {
            arrayOfMovingAsteroids[i].className = "";
        }

        // get "bounding box" of current asteroid
        var asteroidBox = arrayOfMovingAsteroids[i].getBoundingClientRect();

        // detect if asteroid's bounding box overlaps with space ship's bounding box
        var collision = !(asteroidBox.right < shipBox.left ||
            asteroidBox.left > shipBox.right ||
            asteroidBox.bottom < (shipBox.top + 30) ||
            asteroidBox.top > (shipBox.bottom - 30));

        if (collision) {
            shipHealth = (shipHealth - parseInt(arrayOfMovingAsteroids[i].style.height)); // ship loses number of health points relative to size of asteroid
            if (shipHealth >= 0) {
                document.getElementById("healthCounter").innerHTML = "SHIELDS: " + shipHealth;
            } else {
                document.getElementById("healthCounter").innerHTML = "GAME OVER";
                document.getElementById("ship").remove(); // ship disappears
            }
            audio.currentTime = 0; // load explosion sound (creative commons license: https://www.freesound.org/people/Veiler/sounds/264031/)
            audio.play(); // play explosion sound
            arrayOfMovingAsteroids[i].remove(); // asteroid disappears
        }

    }

    // loop
    setTimeout(gameLoop, 10);
}

gameLoop();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const createAsteriods = () => {

    for (var i = 0; i < 100; i++) {

        var asteroid = new Image();
        asteroid.id = "asteroid" + i.toString();
        asteroid.src = "http://dusani.fvi-grad.com/asteroid.png";
        asteroid.style.height = (((Math.random() * 6) + 0) * 30);
        asteroid.style.position = "absolute";
        asteroid.style.top = (((Math.random() * 6) + 0) * 100);
        asteroid.style.right = -200;
        var asteroidPosition = asteroid.style.right;
        var asteroidID = asteroid.id;

        document.body.appendChild(asteroid);

    }
}

/* harmony default export */ __webpack_exports__["a"] = (createAsteriods);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const controls = (controlMovement) => {
    
    function keyDown(playerKeyPress) {
        var keyPressed = playerKeyPress.which;
        if (keyPressed == 38)
            controlMovement.upPressed = 1;
        if (keyPressed == 40)
            controlMovement.downPressed = 1;
        if (keyPressed == 37)
            controlMovement.leftPressed = 1;
        if (keyPressed == 39)
            controlMovement.rightPressed = 1;
    }

    function keyUp(playerKeyPress) {
        var keyPressed = playerKeyPress.which;
        if (keyPressed == 38)
            controlMovement.upPressed = 0;
        if (keyPressed == 40)
            controlMovement.downPressed = 0;
        if (keyPressed == 37)
            controlMovement.leftPressed = 0;
        if (keyPressed == 39)
            controlMovement.rightPressed = 0;
    }

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
}

/* harmony default export */ __webpack_exports__["a"] = (controls);

/***/ })
/******/ ]);