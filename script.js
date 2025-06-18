document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('crossword-grid');
const correctAnswers = {
  across1: [[0,7,'P'], [0,8,'I'], [0,9,'N'], [0,10,'K']],
  across2: [[3,1,'L'], [3,2,'O'], [3,3,'V'], [3,4,'E']],
  across3: [[13,6,'L'], [13,7,'O'], [13,8,'V'], [13,9,'E'], [13,10,'I'], [13,11,'S'], [13,12,'L'], [13,13,'A'], [13,14,'N'], [13,15,'D']],
  across4: [[7,2,'D'], [7,3,'E'], [7,4,'N'], [7,5,'T'], [7,6,'I'], [7,7,'S'], [7,8,'T']],
  across5: [[7,12,'S'], [7,13,'O'], [7,14,'N'], [7,15,'G']],
  across6: [[9,0,'C'], [9,1,'A'], [9,2,'K'], [9,3,'E']],
  across7: [[9,7,'S'], [9,8,'L'], [9,9,'A'], [9,10,'Y']],
  across8: [[11,3,'T'], [11,4,'E'], [11,5,'E'], [11,6,'T'], [11,7,'H']],
  across9: [[3,12,'C'], [3,13,'A'], [3,14,'N'], [3,15,'D'], [3,16,'L'], [3,17,'E']],
  across10: [[5,1,'H'], [5,2,'A'], [5,3,'P'], [5,4,'P'], [5,5,'Y'], [5,6,'B'], [5,7,'I'], [5,8,'R'], [5,9,'T'], [5,10,'H'], [5,11,'D'], [5,12,'A'], [5,13,'Y']],

  down1: [[0,7,'P'], [1,7,'E'], [2,7,'N'], [3,7,'G'], [4,7,'U'], [5,7,'I'], [6,7,'N'], [7,7,'S']],
  down2: [[7,3,'E'], [8,3,'V'], [9,3,'E'], [10,3,'N'], [11,3,'T']],
  down3: [[1,4,'S'], [2,4,'L'], [3,4,'E'], [4,4,'E'], [5,4,'P']],
  down4: [[5,5,'Y'], [6,5,'E'], [7,5,'T'], [8,5,'I']],
  down5: [[0,2,'L'], [1,2,'E'], [2,2,'G'], [3,2,'O'], [4,2,'L'], [5,2,'A'], [6,2,'N'], [7,2,'D']],
  down6: [[3,9,'E'], [4,9,'A'], [5,9,'T']],
  down7: [[9,9,'A'], [10,9,'D'], [11,9,'O'], [12,9,'R'], [13,9,'E']],
  down8: [[5,10,'H'], [6,10,'A'], [7,10,'P'], [8,10,'P'], [9,10,'Y']],
  down9: [[3,12,'C'], [4,12,'L'], [5,12,'A'], [6,12,'S'], [7,12,'S']]
};

const clueStarts = {
  across1: { row: 0, col: 7, number: 1 },
  across2: { row: 3, col: 1, number: 2 },
  across3: { row: 13, col: 6, number: 3 },
  across4: { row: 7, col: 2, number: 4 },
  across5: { row: 7, col: 12, number: 5 },
  across6: { row: 9, col: 0, number: 6 },
  across7: { row: 9, col: 7, number: 7 },
  across8: { row: 11, col: 3, number: 8 },
  across9: { row: 3, col: 12, number: 9 },
  across10: { row: 5, col: 1, number: 10 },

  down1:  { row: 0, col: 7, number: 1 },
  down2:  { row: 7, col: 3, number: 2 },
  down3:  { row: 1, col: 4, number: 3 },
  down4:  { row: 5, col: 5, number: 4 },
  down5:  { row: 0, col: 2, number: 5 },
  down6:  { row: 3, col: 9, number: 6 },
  down7:  { row: 9, col: 9, number: 7 },
  down8:  { row: 5, col: 10, number: 8 },
  down9:  { row: 3, col: 12, number: 9 }
};

  // Build grid
  for (let r = 0; r <= 13; r++) {
    const tr = document.createElement('tr');
    for (let c = 0; c <= 17; c++) {
      const td = document.createElement('td');
      td.className = 'blank';
      tr.appendChild(td);
    }
    grid.appendChild(tr);
  }

  const existingNumbers = new Set();

  // Create all non-blank cells first without content
  for (const cells of Object.values(correctAnswers)) {
    cells.forEach(([row, col]) => {
      const td = grid.rows[row].cells[col];
      td.classList.remove('blank');
    });
  }

  // Add clue numbers separately
  for (const [key, clue] of Object.entries(clueStarts)) {
    const { row, col, number } = clue;
    const coordKey = `${row},${col}`;
    
    if (number !== null && !existingNumbers.has(coordKey)) {
      existingNumbers.add(coordKey);
      const td = grid.rows[row].cells[col];
      
      // Create number element
      const numberDiv = document.createElement('div');
      numberDiv.className = 'cell-number';
      numberDiv.textContent = number;
      
      // Add to cell
      td.appendChild(numberDiv);
    }
  }

  // Now add inputs to all non-blank cells
  for (const [key, cells] of Object.entries(correctAnswers)) {
    cells.forEach(([row, col, letter], i) => {
      const td = grid.rows[row].cells[col];
      
      // Only add input if not already present
      if (!td.querySelector('input')) {
        const input = document.createElement('input');
        input.maxLength = 1;
        input.dataset.row = row;
        input.dataset.col = col;
        input.dataset.word = key;
        input.dataset.index = i;
        td.appendChild(input);
      }
    });
  }

  const inputs = grid.querySelectorAll('input');
  const checkBtn = document.getElementById('check-btn');
  const messageDiv = document.getElementById('message');

  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase();
      const { row, col, word, index } = input.dataset;
      const nextInput = Array.from(inputs).find(i =>
        i.dataset.word === word && parseInt(i.dataset.index) === parseInt(index) + 1
      );
      if (nextInput) nextInput.focus();
    });

    input.addEventListener('keydown', (e) => {
      const row = parseInt(input.dataset.row);
      const col = parseInt(input.dataset.col);
      if (e.key.startsWith('Arrow')) {
        e.preventDefault();
        let newRow = row, newCol = col;
        if (e.key === 'ArrowUp') newRow--;
        else if (e.key === 'ArrowDown') newRow++;
        else if (e.key === 'ArrowLeft') newCol--;
        else if (e.key === 'ArrowRight') newCol++;
        const nextInput = Array.from(inputs).find(i =>
          parseInt(i.dataset.row) === newRow && parseInt(i.dataset.col) === newCol
        );
        if (nextInput) nextInput.focus();
      }
    });
  });

checkBtn.addEventListener('click', () => {
  let allCorrect = true;
  inputs.forEach(input => {
    const word = input.dataset.word;
    const index = Number(input.dataset.index);
    const value = input.value.toUpperCase();
    const correctCells = correctAnswers[word];
    if (!correctCells) return;

    const expectedLetter = correctCells[index] ? correctCells[index][2] : null;
    const td = input.parentElement;

    if (value === expectedLetter) {
      td.style.border = '2px solid green';
    } else {
      td.style.border = '2px solid red';
      allCorrect = false;
    }
  });

  const connectionsSection = document.getElementById('connections-section');
const connectionsGrid = document.getElementById('connections-grid');
const submitGroupBtn = document.getElementById('submit-group');
const shuffleBtn = document.getElementById('shuffle-words');
const strikeCount = document.getElementById('strike-count');
const solvedGroupsDiv = document.getElementById('solved-groups');

// Game categories and words
const categories = {
  doubleLetters: {
    name: "Double Letters",
    words: ["HAPPY", "SLEEP", "TEETH", "CLASS"],
    solved: false
  },
  brands: {
    name: "Brands",
    words: ["LOVEISLAND", "YETI", "PINK", "LEGOLAND"],
    solved: false
  },
  birthday: {
    name: "Birthday Related",
    words: ["SONG", "CAKE", "EVENT", "CANDLE"],
    solved: false
  },
  slang: {
    name: "Slang",
    words: ["SLAY", "EAT", "ADORE", "LOVE"],
    solved: false
  }
};

let selectedWords = [];
let strikes = 0;
const MAX_STRIKES = 4;
let connectionsInitialized = false;

// Initialize Connections game
function initConnectionsGame() {
  if (connectionsInitialized) return;
  
  // Get all words from categories
  const allWords = [
    ...categories.doubleLetters.words,
    ...categories.brands.words,
    ...categories.birthday.words,
    ...categories.slang.words
  ];
  
  // Shuffle and display words
  shuffleWords(allWords);
  
  // Set up event listeners
  submitGroupBtn.addEventListener('click', submitGroup);
  shuffleBtn.addEventListener('click', () => shuffleWords(allWords));
  
  connectionsInitialized = true;
}

// Shuffle and display words
function shuffleWords(words) {
  connectionsGrid.innerHTML = '';
  selectedWords = [];
  
  // Fisher-Yates shuffle algorithm
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  
  // Create word elements
  words.forEach(word => {
    const wordEl = document.createElement('div');
    wordEl.className = 'connection-word';
    wordEl.textContent = word;
    wordEl.dataset.word = word;
    wordEl.addEventListener('click', () => toggleSelectWord(wordEl));
    connectionsGrid.appendChild(wordEl);
  });
}

// Toggle word selection
function toggleSelectWord(element) {
  const word = element.dataset.word;
  
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    selectedWords = selectedWords.filter(w => w !== word);
  } else {
    if (selectedWords.length < 4) {
      element.classList.add('selected');
      selectedWords.push(word);
    }
  }
}

// Submit a group for validation
function submitGroup() {
  if (selectedWords.length !== 4) {
    alert('Please select exactly 4 words!');
    return;
  }
  
  // Check if the selection matches any category
  let matchedCategory = null;
  
  for (const [key, category] of Object.entries(categories)) {
    if (category.solved) continue;
    
    const isMatch = selectedWords.every(word => 
      category.words.includes(word)
    );
    
    if (isMatch) {
      matchedCategory = category;
      category.solved = true;
      break;
    }
  }
  
  if (matchedCategory) {
    // Correct group - mark as solved
    selectedWords.forEach(word => {
      const element = document.querySelector(`.connection-word[data-word="${word}"]`);
      if (element) {
        element.classList.remove('selected');
        element.classList.add('correct');
        element.style.pointerEvents = 'none';
      }
    });
    
    // Display solved group
    const groupDiv = document.createElement('div');
    groupDiv.className = 'solved-group';
    groupDiv.innerHTML = `<strong>${matchedCategory.name}:</strong> ${matchedCategory.words.join(', ')}`;
    solvedGroupsDiv.appendChild(groupDiv);
    
    // Clear selection
    selectedWords = [];
    
    // Check if all groups are solved
    const allSolved = Object.values(categories).every(cat => cat.solved);
    if (allSolved) {
      setTimeout(() => {
        alert('🎉 Congratulations! You solved all groups! 🎂');
      }, 500);
    }
  } else {
    // Incorrect group - strike
    strikes++;
    strikeCount.textContent = strikes;
    
    // Visual feedback for incorrect selection
    selectedWords.forEach(word => {
      const element = document.querySelector(`.connection-word[data-word="${word}"]`);
      if (element) {
        element.classList.add('incorrect');
        setTimeout(() => {
          element.classList.remove('incorrect', 'selected');
        }, 1000);
      }
    });
    
    // Clear selection
    selectedWords = [];
    
    // Check if game over
    if (strikes >= MAX_STRIKES) {
      setTimeout(() => {
        alert('Game over! You reached the maximum strikes.');
        revealAllGroups();
      }, 500);
    }
  }
}

// Reveal all unsolved groups
function revealAllGroups() {
  for (const [key, category] of Object.entries(categories)) {
    if (!category.solved) {
      category.solved = true;
      
      const groupDiv = document.createElement('div');
      groupDiv.className = 'solved-group';
      groupDiv.innerHTML = `<strong>${category.name}:</strong> ${category.words.join(', ')}`;
      solvedGroupsDiv.appendChild(groupDiv);
      
      // Mark words as solved in grid
      category.words.forEach(word => {
        const element = document.querySelector(`.connection-word[data-word="${word}"]`);
        if (element) {
          element.classList.add('correct');
          element.style.pointerEvents = 'none';
        }
      });
    }
  }
}

  messageDiv.textContent = allCorrect
    ? '🎉 All answers are correct! Happy Birthday! 🎂'
    : 'Some answers are incorrect. Keep trying!';
  messageDiv.className = allCorrect ? 'correct' : 'incorrect';

  // Show Connections game when crossword is solved
  if (allCorrect) {
    connectionsSection.style.display = 'block';
    initConnectionsGame();
  }
});


  if (inputs[0]) inputs[0].focus();
});
