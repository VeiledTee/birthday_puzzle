document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('crossword-grid');
  const inputs = grid.querySelectorAll('input');
  const checkBtn = document.getElementById('check-btn');
  const messageDiv = document.getElementById('message');
  
  // Define correct answers (replace with actual answers)
const correctAnswers = {
  // Across clues
  across1: ['P', 'I', 'N', 'K'],        // Row 0, Col 7-10
  across2: ['L', 'O', 'V', 'E'],        // Row 3, Col 1-4
  across3: ['C', 'A', 'N', 'D', 'L', 'E'], // Row 3, Col 12-17
  across4: ['D','E','N','T','I','S','T'], // Row 7, Col 2-8
  across5: ['S','O','N','G'], // Row 7, Col 2-8
  across6: ['C','A','K','E'],           // Row 9, Col 0-3
  across7: ['S','L','A','Y'],           // Row 9, Col 7-10
  across8: ['T','E','E','T','H'],       // Row 11, Col 3-7
  across9: ['L','O','V','E','I','S','L','A','N','D'], // Row 13, Col 6-15
  
  // Down clues
  down1: ['L','E','G','O','L','A','N','D'], // Col 2, Rows 0-7
  down2: ['E','V','E','N','T'],         // Col 4, Rows 1-5
  down3: ['S', 'L', 'E', 'E', 'P'], // Col 7, Rows 0-7
  down4: ['Y','E','T', 'I'],                 // Col 9, Rows 3-5
  down5: ['P','E','N','G','U','I','N','S'], // Col 7, Rows 0-7
  down6: ['E','A','T'],         // Col 12, Rows 3-7
  down7: ['A','D','O','R','E'],         // Col 12, Rows 3-7
  down8: ['H','A','P','P','Y'],         // Col 12, Rows 3-7
  down9: ['C','L','A','S','S'],         // Col 12, Rows 3-7
};
  // Auto-advance to next cell on input
  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      // Convert to uppercase
      e.target.value = e.target.value.toUpperCase();
      
      // Auto-advance to next cell
      const row = parseInt(input.dataset.row);
      const col = parseInt(input.dataset.col);
      const word = input.dataset.word;
      const index = parseInt(input.dataset.index);
      
      // Find next cell in word
      const nextInput = Array.from(inputs).find(i => 
        i.dataset.word === word && 
        parseInt(i.dataset.index) === index + 1
      );
      
      if (nextInput) {
        nextInput.focus();
      }
    });
    
    // Arrow key navigation
    input.addEventListener('keydown', (e) => {
      const row = parseInt(input.dataset.row);
      const col = parseInt(input.dataset.col);
      
      if (e.key.startsWith('Arrow')) {
        e.preventDefault();
        let newRow = row;
        let newCol = col;
        
        switch(e.key) {
          case 'ArrowUp': newRow--; break;
          case 'ArrowDown': newRow++; break;
          case 'ArrowLeft': newCol--; break;
          case 'ArrowRight': newCol++; break;
        }
        
        const nextInput = Array.from(inputs).find(i => 
          parseInt(i.dataset.row) === newRow && 
          parseInt(i.dataset.col) === newCol
        );
        
        if (nextInput) nextInput.focus();
      }
    });
  });
  
  // Check answers button
  checkBtn.addEventListener('click', () => {
    let allCorrect = true;
    const userAnswers = {};
    
    // Collect user answers
    inputs.forEach(input => {
      const word = input.dataset.word;
      const index = input.dataset.index;
      const value = input.value.toUpperCase();
      
      if (!userAnswers[word]) userAnswers[word] = [];
      userAnswers[word][index] = value;
    });
    
    // Check against correct answers
    for (const [word, correctArray] of Object.entries(correctAnswers)) {
      const userArray = userAnswers[word] || [];
      
      for (let i = 0; i < correctArray.length; i++) {
        if (userArray[i] !== correctArray[i]) {
          allCorrect = false;
          break;
        }
      }
      
      if (!allCorrect) break;
    }
    
    // Show result message
    if (allCorrect) {
      messageDiv.textContent = '🎉 All answers are correct! Happy Birthday! 🎂';
      messageDiv.className = 'correct';
    } else {
      messageDiv.textContent = 'Some answers are incorrect. Keep trying!';
      messageDiv.className = 'incorrect';
    }
  });
  
  // Focus first input on load
  const firstInput = inputs[0];
  if (firstInput) firstInput.focus();
});
