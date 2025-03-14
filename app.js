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
    idle: document.getElementById("knight_idle"),
    crouch: document.getElementById("knight_crouch"),
    attack1: document.getElementById("knight_attack1_nomovement"),
    attack2: document.getElementById("knight_attack2_nomovement"),
    combo: document.getElementById("knight_combo_nomovement"),
    jump: document.getElementById("knight_jumpfall"),
    slide: document.getElementById("knight_slide"),
    death: document.getElementById("knight_death"),
    run: document.getElementById("knight_run"),
    roll: document.getElementById("knight_roll"),
};

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
animate();