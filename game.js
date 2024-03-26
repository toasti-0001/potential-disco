document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    let gameState = 'menu'; // Possible states: 'menu', 'playing', 'about'
    let requestId;

    // Player setup
    const player = {
        x: 50,
        y: 100,
        width: 50,
        height: 50,
        speed: 5,
        velocityX: 0,
        velocityY: 0,
        jumping: false
    };

    // Key controls state
    const keys = {
        left: false,
        right: false,
        up: false
    };

    function startGame() {
        gameState = 'playing';
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('aboutSection').style.display = 'none';
        canvas.style.display = 'block';
        gameLoop();
    }

    function gameLoop() {
        if (gameState !== 'playing') {
            window.cancelAnimationFrame(requestId);
            return;
        }
        updateGame();
        drawGame();
        requestId = window.requestAnimationFrame(gameLoop);
    }

    function updateGame() {
        // Player movement logic
        if (keys.right) {
            player.x += player.speed;
        }
        if (keys.left) {
            player.x -= player.speed;
        }
        // Add jumping and gravity logic here
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Player
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Back button
        drawBackButton();
    }

    function drawBackButton() {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(10, 10, 80, 30);
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText('Back', 25, 32);
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Detect click on "Back" button
        if (clickX >= 10 && clickX <= 90 && clickY >= 10 && clickY <= 40) {
            showMenu();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (gameState === 'playing') {
            if (e.key === 'ArrowRight') keys.right = true;
            if (e.key === 'ArrowLeft') keys.left = true;
            if (e.key === 'ArrowUp') keys.up = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight') keys.right = false;
        if (e.key === 'ArrowLeft') keys.left = false;
        if (e.key === 'ArrowUp') keys.up = false;
    });

    function showMenu() {
        gameState = 'menu';
        document.getElementById('mainMenu').style.display = 'block';
        document.getElementById('gameCanvas').style.display = 'none';
        document.getElementById('aboutSection').style.display = 'none';
    }

    // Setup menu button interactions
    document.getElementById('playButton').addEventListener('click', startGame);
    document.getElementById('aboutButton').addEventListener('click', () => {
        gameState = 'about';
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('aboutSection').style.display = 'block';
    });
    document.getElementById('exitButton').addEventListener('click', () => {
        window.close(); // For Electron, you might need to send an IPC message to the main process to close the window
    });
    document.getElementById('backButton').addEventListener('click', showMenu);

    showMenu(); // Initialize to show the main menu
});
