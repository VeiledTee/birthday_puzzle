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

  messageDiv.textContent = allCorrect
    ? '🎉 All answers are correct! Happy Birthday! 🎂'
    : 'Some answers are incorrect. Keep trying!';
  messageDiv.className = allCorrect ? 'correct' : 'incorrect';
});


  if (inputs[0]) inputs[0].focus();
});
