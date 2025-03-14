const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 778;
const CANVAS_HEIGHT = canvas.height = 625;
const knightWidth = 120;
const knightHeight = 80;

let gameFrame = 0;
let stagger = 0;
let playerState = "idle";
let isPlayingOnce = false;

// animations
const knightSheets = {
    idle: new Image(),
    crouch: new Image(),
    attack1: new Image(),
    attack2: new Image(),
    combo: new Image(),
    jump: new Image(),
    slide: new Image(),
    death: new Image(),
    run: new Image(),
    roll: new Image(),
};

// set image sources
knightSheets.idle.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_Idle.png";
knightSheets.crouch.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_CrouchFull.png";
knightSheets.attack1.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_AttackNoMovement.png";
knightSheets.attack2.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_Attack2NoMovement.png";
knightSheets.combo.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_AttackComboNoMovement.png";
knightSheets.jump.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_Jump.png";
knightSheets.slide.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_SlideFull.png";
knightSheets.death.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_DeathNoMovement.png";
knightSheets.run.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_Run.png";
knightSheets.roll.src = "https://raw.githubusercontent.com/sabbenthedev/projectsoulsborne/refs/heads/main/knight/_Roll.png";

const animationStates = [
    { name: "idle", frames: 10, stagger: 16 },
    { name: "crouch", frames: 3, stagger: 14 },
    { name: "attack1", frames: 4, stagger: 18 },
    { name: "attack2", frames: 6, stagger: 18 },
    { name: "combo", frames: 10, stagger: 18 },
    { name: "jump", frames: 2, stagger: 14 },
    { name: "slide", frames: 4, stagger: 14 },
    { name: "death", frames: 10, stagger: 15 },
    { name: "run", frames: 10, stagger: 14 },
    { name: "roll", frames: 12, stagger: 10 },
];

// button click
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", (e) => {
        const action = e.target.value;

        if (action == "death") {
            isPlayingOnce = false;
        } else if (action == "run") {
            isPlayingOnce = false;
        } else {
            isPlayingOnce = true;
        }
        playerState = action;
        gameFrame = 0;
    });
});

function animate() {
    const currentAnimation = animationStates.find(state => state.name == playerState);
    const frameCount = currentAnimation.frames;
    const staggerFrame = currentAnimation.stagger;

    if(stagger % staggerFrame == 0) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        const currentKnight = knightSheets[playerState];

        let frameX = knightWidth * (gameFrame % frameCount);
        let frameY = knightHeight * 0;

        ctx.drawImage(currentKnight, frameX, frameY, knightWidth, knightHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.imageSmoothingEnabled = false;

        // stop on the last frame of death animation
        if (playerState == "death" && gameFrame >= frameCount - 1) {
            gameFrame = frameCount - 1;
        } else {
            gameFrame++;
        }

        // return to idle after animations
        if (isPlayingOnce && gameFrame >= frameCount) {
            playerState = "idle";
            gameFrame= 0;
            isPlayingOnce = false;
        }
    }
    stagger++;

    requestAnimationFrame(animate);
}

// load images before starting animation
let imagesLoaded = 0;
const totalImages = Object.keys(knightSheets).length;

for (let key in knightSheets) {
    knightSheets[key].onload = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            animate();
        }
    };
}
