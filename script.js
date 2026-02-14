// Game State
let gameState = {
    wordleCompleted: false,
    matcherCompleted: false,
    currentScreen: 'welcome'
};

// Wordle Game Variables
const WORDLE_WORD = 'CHERI'; // The secret word
let currentRow = 0;
let currentGuess = '';
let wordleGuesses = [];

// Matcher Game Variables - 12 photo pairs in heart shape
// Matcher Game Variables - 12 photo pairs in heart shape
const MATCHER_PHOTOS = [
    'src/img/photo1.jpeg',
    'src/img/photo2.jpeg',
    'src/img/photo3.jpeg',
    'src/img/photo4.jpeg',
    'src/img/photo5.jpeg',
    'src/img/photo6.jpeg',
    'src/img/photo7.jpeg',
    'src/img/photo8.jpeg',
    'src/img/photo9.jpeg',
    'src/img/photo10.jpeg',
    'src/img/photo11.jpeg',
    'src/img/photo12.jpeg',
    'src/img/photo13.jpeg',
    'src/img/photo14.jpeg',
    'src/img/photo15.jpeg',
    'src/img/photo16.jpeg'
];

// Heart shape pattern for 6x5 grid (1 = card, 0 = empty)
// Heart shape pattern for 6x6 grid (1 = card, 0 = empty)
// Heart shape pattern for 9x6 grid (1 = card, 2 = decoration, 0 = empty)
// Heart shape pattern for 9x7 grid (1 = card, 2 = decoration, 0 = empty)
const HEART_PATTERN = [
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 2, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0]
];

let matcherCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

// Initialize background images
// Initialize background images
function initBackgroundImages() {
    const container = document.getElementById('backgroundImages');

    // Comic style background - scattered collage
    const cellSize = 80;
    const cols = Math.ceil(window.innerWidth / cellSize) + 4;
    const rows = Math.ceil(window.innerHeight / cellSize) + 4;
    const totalImages = cols * rows;

    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.width = '120%'; /* Ensure coverage with rotations */
    container.style.height = '120%';
    container.style.marginLeft = '-10%'; /* Center the excess */
    container.style.marginTop = '-10%';
    container.style.overflow = 'hidden';

    // Using uploaded photos
    const placeholderImages = [];
    for (let i = 1; i <= 19; i++) {
        placeholderImages.push(`src/img/photo${i}.jpeg`);
    }

    for (let i = 0; i < totalImages; i++) {
        const img = document.createElement('div');
        img.className = 'bg-image';
        img.style.backgroundImage = `url('${placeholderImages[i % placeholderImages.length]}')`;

        // Random chaotic transform
        const rotate = Math.random() * 60 - 30; // -30 to 30 deg
        const scale = 0.8 + Math.random() * 0.5; // 0.8 to 1.3
        const tx = Math.random() * 50 - 25;
        const ty = Math.random() * 50 - 25;

        img.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(${scale})`;
        img.style.zIndex = Math.floor(Math.random() * 20);

        container.appendChild(img);
    }
}

// Fireworks Animation
function triggerFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks-container';
    document.body.appendChild(fireworksContainer);

    // Create multiple fireworks
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFirework(fireworksContainer);
        }, i * 200);
    }

    // Remove container after animation
    setTimeout(() => {
        fireworksContainer.remove();
    }, 5000);
}

function createFirework(container) {
    const firework = document.createElement('div');
    firework.className = 'firework';

    // Random position
    firework.style.left = (20 + Math.random() * 60) + '%';
    firework.style.top = (20 + Math.random() * 60) + '%';

    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 50 + Math.random() * 50;

        particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');

        // Random colors
        const colors = ['#ff6b9d', '#ffc3a0', '#667eea', '#f5576c', '#4facfe', '#ffcc00'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        firework.appendChild(particle);
    }

    container.appendChild(firework);

    // Remove after animation
    setTimeout(() => {
        firework.remove();
    }, 2000);
}

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId;
}

function startJourney() {
    showScreen('gameSelectionScreen');
}

function backToSelection() {
    showScreen('gameSelectionScreen');
    updateGameStatus();
}

function updateGameStatus() {
    const wordleStatus = document.getElementById('wordleStatus');
    const matcherStatus = document.getElementById('matcherStatus');

    if (gameState.wordleCompleted) {
        wordleStatus.textContent = 'Completed ✓';
        wordleStatus.classList.add('completed');
    }

    if (gameState.matcherCompleted) {
        matcherStatus.textContent = 'Completed ✓';
        matcherStatus.classList.add('completed');
    }

    // Check if both games are completed
    if (gameState.wordleCompleted && gameState.matcherCompleted) {
        setTimeout(() => {
            showFinalMessage();
        }, 1000);
    }
}

function startGame(gameType) {
    if (gameType === 'wordle') {
        showScreen('wordleScreen');
        initWordle();
    } else if (gameType === 'matcher') {
        showScreen('matcherScreen');
        initMatcher();
    }
}

// ===== WORDLE GAME =====
function initWordle() {
    const board = document.getElementById('wordleBoard');
    board.innerHTML = '';

    // Create 6 rows of 5 cells
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        row.id = `row-${i}`;

        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'wordle-cell';
            cell.id = `cell-${i}-${j}`;
            row.appendChild(cell);
        }

        board.appendChild(row);
    }

    createKeyboard();
    currentRow = 0;
    currentGuess = '';
    wordleGuesses = [];
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';

    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
    ];

    rows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';

        row.forEach(key => {
            const keyButton = document.createElement('button');
            keyButton.className = 'key';
            keyButton.textContent = key;

            if (key === 'ENTER' || key === 'BACK') {
                keyButton.classList.add('wide');
            }

            keyButton.addEventListener('click', () => handleKeyPress(key));
            rowDiv.appendChild(keyButton);
        });

        keyboard.appendChild(rowDiv);
    });
}

function handleKeyPress(key) {
    if (currentRow >= 6) return;

    const messageDiv = document.getElementById('wordleMessage');
    messageDiv.textContent = '';

    if (key === 'BACK') {
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            updateCurrentRow();
        }
    } else if (key === 'ENTER') {
        if (currentGuess.length === 5) {
            submitGuess();
        } else {
            messageDiv.textContent = 'Not enough letters!';
            messageDiv.className = 'message error';
        }
    } else if (currentGuess.length < 5) {
        currentGuess += key;
        updateCurrentRow();
    }
}

function updateCurrentRow() {
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${currentRow}-${i}`);
        cell.textContent = currentGuess[i] || '';

        if (currentGuess[i]) {
            cell.classList.add('filled');
        } else {
            cell.classList.remove('filled');
        }
    }
}

function submitGuess() {
    const messageDiv = document.getElementById('wordleMessage');
    wordleGuesses.push(currentGuess);

    // Check each letter
    const letterStatus = {};

    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${currentRow}-${i}`);
        const letter = currentGuess[i];

        if (letter === WORDLE_WORD[i]) {
            cell.classList.add('correct');
            letterStatus[letter] = 'correct';
        } else if (WORDLE_WORD.includes(letter)) {
            cell.classList.add('present');
            if (letterStatus[letter] !== 'correct') {
                letterStatus[letter] = 'present';
            }
        } else {
            cell.classList.add('absent');
            if (!letterStatus[letter]) {
                letterStatus[letter] = 'absent';
            }
        }
    }

    // Update keyboard
    updateKeyboard(letterStatus);

    // Check win condition
    if (currentGuess === WORDLE_WORD) {
        messageDiv.textContent = '🎉 Yesss! You got it!';
        messageDiv.className = 'message success';
        gameState.wordleCompleted = true;

        // Trigger fireworks
        triggerFireworks();

        setTimeout(() => {
            updateGameStatus();
            backToSelection();
        }, 3000);
    } else if (currentRow >= 5) {
        messageDiv.textContent = `Oops! It was ${WORDLE_WORD}. Wanna try again?`;
        messageDiv.className = 'message error';

        setTimeout(() => {
            initWordle();
        }, 3000);
    } else {
        currentRow++;
        currentGuess = '';
    }
}

function updateKeyboard(letterStatus) {
    Object.keys(letterStatus).forEach(letter => {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            if (key.textContent === letter) {
                key.classList.remove('correct', 'present', 'absent');
                key.classList.add(letterStatus[letter]);
            }
        });
    });
}

// ===== IMAGE MATCHER GAME =====
function initMatcher() {
    const board = document.getElementById('matcherBoard');
    board.innerHTML = '';

    // Create pairs of photos (16 pairs = 32 cards)
    const photoIndices = [...Array(16).keys()];
    const cardPhotos = [...photoIndices, ...photoIndices]; // Duplicate for pairs

    // Shuffle the photos
    cardPhotos.sort(() => Math.random() - 0.5);

    matcherCards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;

    updateMatcherStats();

    let cardIndex = 0;

    // Create 9x7 grid with heart pattern
    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 9; col++) {
            const card = document.createElement('div');

            if (HEART_PATTERN[row][col] === 0) {
                // Empty space
                card.className = 'matcher-card empty';
            } else if (HEART_PATTERN[row][col] === 2) {
                // Decoration Center
                card.className = 'matcher-card decoration';
                card.innerHTML = '<div class="card-front" style="background: var(--primary-color); box-shadow: 0 0 15px var(--primary-color);">❤️</div>';
                board.appendChild(card);
                continue;
            } else {
                // Active card
                card.className = 'matcher-card';
                const photoIndex = cardPhotos[cardIndex];
                const photoUrl = MATCHER_PHOTOS[photoIndex];

                card.dataset.index = cardIndex;
                card.dataset.photo = photoIndex;

                const front = document.createElement('div');
                front.className = 'card-front';
                front.textContent = '❤️';

                const back = document.createElement('div');
                back.className = 'card-back';
                back.style.backgroundImage = `url('${photoUrl}')`;
                back.style.backgroundSize = 'cover';
                back.style.backgroundPosition = 'center';

                card.appendChild(front);
                card.appendChild(back);

                card.addEventListener('click', () => flipCard(card));

                matcherCards.push(card);
                cardIndex++;
            }

            board.appendChild(card);
        }
    }
}

function flipCard(card) {
    if (card.classList.contains('empty')) return;
    if (flippedCards.length >= 2) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        updateMatcherStats();
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const photo1 = card1.dataset.photo;
    const photo2 = card2.dataset.photo;

    const messageDiv = document.getElementById('matcherMessage');

    if (photo1 === photo2) {
        // Match found
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            updateMatcherStats();
            flippedCards = [];

            messageDiv.textContent = '✨ Nailed it!';
            messageDiv.className = 'message success';

            setTimeout(() => {
                messageDiv.textContent = '';
            }, 1000);

            // Check if game is won
            if (matchedPairs === 16) {
                setTimeout(() => {
                    messageDiv.textContent = '🎉 Yesss! All matched!';
                    messageDiv.className = 'message success';
                    gameState.matcherCompleted = true;

                    // Trigger fireworks
                    triggerFireworks();

                    setTimeout(() => {
                        updateGameStatus();
                        backToSelection();
                    }, 3000);
                }, 500);
            }
        }, 500);
    } else {
        // No match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];

            messageDiv.textContent = 'Nope, try again!';
            messageDiv.className = 'message error';

            setTimeout(() => {
                messageDiv.textContent = '';
            }, 1000);
        }, 1500);
    }
}

function updateMatcherStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('pairsFound').textContent = matchedPairs;
}

// ===== FINAL MESSAGE =====
let finalMessageStarted = false;
function showFinalMessage() {
    if (finalMessageStarted) return;
    finalMessageStarted = true;

    showScreen('finalScreen');

    const messages = [
        "Yay! You crushed it! ✨",
        "I mean I know you are the best so...all I wanted to say is, every moment with you",
        "feels like the best thing ever 💕",
        "You literally make everything better 🌟",
        "and honestly, my heart's so full ❤️",
        "So here's what I wanna ask you..."
    ];

    const messagesContainer = document.getElementById('fadingMessages');
    const proposalImage = document.getElementById('proposalImage');

    let currentMessage = 0;

    function showNextMessage() {
        if (currentMessage < messages.length) {
            messagesContainer.innerHTML = '';
            const messageDiv = document.createElement('div');
            messageDiv.className = 'fading-message';
            messageDiv.textContent = messages[currentMessage];
            messagesContainer.appendChild(messageDiv);

            currentMessage++;
            setTimeout(showNextMessage, 5000);
        } else {
            // Show proposal image
            messagesContainer.innerHTML = '';
            proposalImage.classList.remove('hidden');
        }
    }

    showNextMessage();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundImages();
});

// Handle resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initBackgroundImages, 200);
});

// Keyboard support for Wordle
document.addEventListener('keydown', (e) => {
    if (gameState.currentScreen !== 'wordleScreen') return;

    const key = e.key.toUpperCase();

    if (key === 'BACKSPACE') {
        handleKeyPress('BACK');
    } else if (key === 'ENTER') {
        handleKeyPress('ENTER');
    } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
    }
});

// ===== PROPOSAL INTERACTION =====
let fireworksInterval;

function handleYesClick() {
    // Show I Love You Too message
    document.getElementById('celebration').classList.remove('hidden');

    // Clear previous interval if any
    if (fireworksInterval) clearInterval(fireworksInterval);

    // Always create new container for finale
    const fwContainer = document.createElement('div');
    fwContainer.className = 'fireworks-container';
    fwContainer.style.zIndex = '200';
    document.body.appendChild(fwContainer);

    // Start continuous fireworks
    fireworksInterval = setInterval(() => {
        createFirework(fwContainer);
    }, 200);
}

function moveButton() {
    const btnNo = document.getElementById('btnNo');

    // Calculate random position
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);

    // Apply new position
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}