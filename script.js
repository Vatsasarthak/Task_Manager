// Quiz Game JavaScript

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitQuizBtn = document.getElementById('submit-quiz-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');
const newCategoryBtn = document.getElementById('new-category-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const fillInContainer = document.getElementById('fill-in-container');
const fillInAnswer = document.getElementById('fill-in-answer');
const submitFillAnswer = document.getElementById('submit-fill-answer');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const timerDisplay = document.getElementById('timer-display');
const currentScore = document.getElementById('current-score');
const questionType = document.getElementById('question-type');
const questionDifficulty = document.getElementById('question-difficulty');
const feedbackMessage = document.getElementById('feedback-message');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const totalScore = document.getElementById('total-score');
const scorePercentage = document.getElementById('score-percentage');
const scoreCircle = document.getElementById('score-circle');
const highScoreValue = document.getElementById('high-score-value');
const highScoreUpdate = document.getElementById('high-score-update');
const newHighScore = document.getElementById('new-high-score');
const categoryCards = document.querySelectorAll('.category-card');
const timerSelect = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty');
const accuracyFill = document.getElementById('accuracy-fill');
const accuracyValue = document.getElementById('accuracy-value');
const speedFill = document.getElementById('speed-fill');
const speedValue = document.getElementById('speed-value');
const difficultyLevel = document.getElementById('difficulty-level');

// Audio elements
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const clickSound = document.getElementById('click-sound');

// Quiz State Variables
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timer;
let timeLeft;
let quizQuestions = [];
let selectedCategory = 'all';
let selectedDifficulty = 'medium';
let timerPerQuestion = 45;
let totalTimeUsed = 0;
let startTime = 0;

// Expanded Questions Database with 5 Easy, 10 Medium, and 10 Hard Questions
const questionsDatabase = [
    // ========== EASY QUESTIONS (5) ==========
    // Science - Easy
    {
        id: 1,
        category: 'science',
        type: 'single',
        difficulty: 'easy',
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'NaCl', 'O2'],
        correctAnswer: ['H2O'],
        points: 10
    },
    {
        id: 2,
        category: 'science',
        type: 'single',
        difficulty: 'easy',
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: ['Mars'],
        points: 10
    },
    // History - Easy
    {
        id: 3,
        category: 'history',
        type: 'single',
        difficulty: 'easy',
        question: 'Who was the first president of the United States?',
        options: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'John Adams'],
        correctAnswer: ['George Washington'],
        points: 10
    },
    {
        id: 4,
        category: 'history',
        type: 'single',
        difficulty: 'easy',
        question: 'In which year did World War II end?',
        options: ['1943', '1945', '1947', '1950'],
        correctAnswer: ['1945'],
        points: 10
    },
    // Technology - Easy
    {
        id: 5,
        category: 'tech',
        type: 'single',
        difficulty: 'easy',
        question: 'What does "HTML" stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
        correctAnswer: ['Hyper Text Markup Language'],
        points: 10
    },
    // Mathematics - Easy
    {
        id: 6,
        category: 'math',
        type: 'single',
        difficulty: 'easy',
        question: 'What is 5 + 7?',
        options: ['10', '11', '12', '13'],
        correctAnswer: ['12'],
        points: 10
    },
    // General Knowledge - Easy
    {
        id: 7,
        category: 'general',
        type: 'single',
        difficulty: 'easy',
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: ['Paris'],
        points: 10
    },
    
    // ========== MEDIUM QUESTIONS (10) ==========
    // Science - Medium
    {
        id: 8,
        category: 'science',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of the following are noble gases?',
        options: ['Helium', 'Oxygen', 'Neon', 'Carbon'],
        correctAnswer: ['Helium', 'Neon'],
        points: 15
    },
    {
        id: 9,
        category: 'science',
        type: 'fill',
        difficulty: 'medium',
        question: 'What is the powerhouse of the cell?',
        correctAnswer: ['mitochondria', 'mitochondrion'],
        points: 15
    },
    {
        id: 10,
        category: 'science',
        type: 'single',
        difficulty: 'medium',
        question: 'What is the atomic number of carbon?',
        options: ['6', '8', '12', '14'],
        correctAnswer: ['6'],
        points: 15
    },
    // History - Medium
    {
        id: 11,
        category: 'history',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these events occurred during World War II?',
        options: ['The Great Depression', 'The Holocaust', 'The Moon Landing', 'D-Day Invasion'],
        correctAnswer: ['The Holocaust', 'D-Day Invasion'],
        points: 15
    },
    {
        id: 12,
        category: 'history',
        type: 'fill',
        difficulty: 'medium',
        question: 'In what year did the Titanic sink?',
        correctAnswer: ['1912'],
        points: 15
    },
    {
        id: 13,
        category: 'history',
        type: 'single',
        difficulty: 'medium',
        question: 'Who invented the telephone?',
        options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Guglielmo Marconi'],
        correctAnswer: ['Alexander Graham Bell'],
        points: 15
    },
    // Technology - Medium
    {
        id: 14,
        category: 'tech',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these are programming languages?',
        options: ['Python', 'HTML', 'CSS', 'JavaScript'],
        correctAnswer: ['Python', 'JavaScript'],
        points: 15
    },
    {
        id: 15,
        category: 'tech',
        type: 'fill',
        difficulty: 'medium',
        question: 'What does "CPU" stand for in computing?',
        correctAnswer: ['central processing unit'],
        points: 15
    },
    {
        id: 16,
        category: 'tech',
        type: 'single',
        difficulty: 'medium',
        question: 'Which company developed the Windows operating system?',
        options: ['Apple', 'Microsoft', 'Google', 'IBM'],
        correctAnswer: ['Microsoft'],
        points: 15
    },
    // Mathematics - Medium
    {
        id: 17,
        category: 'math',
        type: 'single',
        difficulty: 'medium',
        question: 'What is the value of π (pi) rounded to two decimal places?',
        options: ['3.14', '3.16', '3.18', '3.12'],
        correctAnswer: ['3.14'],
        points: 15
    },
    {
        id: 18,
        category: 'math',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these are prime numbers?',
        options: ['1', '2', '9', '11'],
        correctAnswer: ['2', '11'],
        points: 15
    },
    // General Knowledge - Medium
    {
        id: 19,
        category: 'general',
        type: 'single',
        difficulty: 'medium',
        question: 'Which is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: ['Pacific Ocean'],
        points: 15
    },
    {
        id: 20,
        category: 'general',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these countries are in Europe?',
        options: ['Germany', 'Brazil', 'Italy', 'Canada'],
        correctAnswer: ['Germany', 'Italy'],
        points: 15
    },
    
    // ========== HARD QUESTIONS (10) ==========
    // Science - Hard
    {
        id: 21,
        category: 'science',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of the following are subatomic particles?',
        options: ['Proton', 'Neutron', 'Electron', 'Photon'],
        correctAnswer: ['Proton', 'Neutron', 'Electron'],
        points: 20
    },
    {
        id: 22,
        category: 'science',
        type: 'fill',
        difficulty: 'hard',
        question: 'What is the chemical formula for sulfuric acid?',
        correctAnswer: ['h2so4', 'H2SO4'],
        points: 20
    },
    {
        id: 23,
        category: 'science',
        type: 'single',
        difficulty: 'hard',
        question: 'What is the speed of light in vacuum (approximately)?',
        options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
        correctAnswer: ['300,000 km/s'],
        points: 20
    },
    {
        id: 24,
        category: 'science',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of these elements are transition metals?',
        options: ['Iron', 'Copper', 'Sodium', 'Gold'],
        correctAnswer: ['Iron', 'Copper', 'Gold'],
        points: 20
    },
    // History - Hard
    {
        id: 25,
        category: 'history',
        type: 'single',
        difficulty: 'hard',
        question: 'In which year did the Berlin Wall fall?',
        options: ['1987', '1989', '1991', '1993'],
        correctAnswer: ['1989'],
        points: 20
    },
    {
        id: 26,
        category: 'history',
        type: 'fill',
        difficulty: 'hard',
        question: 'Who was the Egyptian queen known for her relationships with Julius Caesar and Mark Antony?',
        correctAnswer: ['cleopatra'],
        points: 20
    },
    {
        id: 27,
        category: 'history',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of these were ancient civilizations?',
        options: ['Mayan', 'Roman', 'Viking', 'Aztec'],
        correctAnswer: ['Mayan', 'Roman', 'Aztec'],
        points: 20
    },
    // Technology - Hard
    {
        id: 28,
        category: 'tech',
        type: 'single',
        difficulty: 'hard',
        question: 'What was the first programming language?',
        options: ['FORTRAN', 'COBOL', 'Assembly', 'Plankalkül'],
        correctAnswer: ['Plankalkül'],
        points: 20
    },
    {
        id: 29,
        category: 'tech',
        type: 'fill',
        difficulty: 'hard',
        question: 'In computer science, what does "API" stand for?',
        correctAnswer: ['application programming interface'],
        points: 20
    },
    {
        id: 30,
        category: 'tech',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of these are database management systems?',
        options: ['MySQL', 'MongoDB', 'React', 'Oracle'],
        correctAnswer: ['MySQL', 'MongoDB', 'Oracle'],
        points: 20
    },
    // Mathematics - Hard
    {
        id: 31,
        category: 'math',
        type: 'single',
        difficulty: 'hard',
        question: 'What is the value of e (Euler\'s number) rounded to two decimal places?',
        options: ['2.71', '2.82', '3.14', '1.62'],
        correctAnswer: ['2.71'],
        points: 20
    },
    {
        id: 32,
        category: 'math',
        type: 'fill',
        difficulty: 'hard',
        question: 'What is the derivative of x²?',
        correctAnswer: ['2x'],
        points: 20
    },
    // General Knowledge - Hard
    {
        id: 33,
        category: 'general',
        type: 'single',
        difficulty: 'hard',
        question: 'Which planet has the most moons?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctAnswer: ['Saturn'],
        points: 20
    },
    {
        id: 34,
        category: 'general',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of these are Nobel Prize categories?',
        options: ['Physics', 'Mathematics', 'Peace', 'Economics'],
        correctAnswer: ['Physics', 'Peace', 'Economics'],
        points: 20
    },
    {
        id: 35,
        category: 'general',
        type: 'fill',
        difficulty: 'hard',
        question: 'What is the chemical symbol for gold?',
        correctAnswer: ['Au'],
        points: 20
    }
];

// Initialize the application
function init() {
    // Load high score from local storage
    loadHighScore();
    
    // Set up event listeners
    setupEventListeners();
    
    // Select the first category by default
    if (categoryCards.length > 0) {
        categoryCards[0].classList.add('active');
    }
    
    // Set default values
    timerSelect.value = timerPerQuestion;
    difficultySelect.value = selectedDifficulty;
}

// Set up all event listeners
function setupEventListeners() {
    // Start button
    startBtn.addEventListener('click', startQuiz);
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitQuizBtn.addEventListener('click', submitQuiz);
    
    // Results screen buttons
    restartBtn.addEventListener('click', restartQuiz);
    reviewBtn.addEventListener('click', reviewAnswers);
    newCategoryBtn.addEventListener('click', goToCategories);
    
    // Fill in the blank submit button
    submitFillAnswer.addEventListener('click', submitFillAnswerHandler);
    fillInAnswer.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitFillAnswerHandler();
        }
    });
    
    // Category selection
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            selectedCategory = this.getAttribute('data-category');
            playClickSound();
        });
    });
    
    // Settings changes
    timerSelect.addEventListener('change', function() {
        timerPerQuestion = parseInt(this.value);
        playClickSound();
    });
    
    difficultySelect.addEventListener('change', function() {
        selectedDifficulty = this.value;
        playClickSound();
    });
}

// Load high score from local storage
function loadHighScore() {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
        highScoreValue.textContent = savedHighScore;
    }
}

// Save high score to local storage
function saveHighScore(score) {
    localStorage.setItem('quizHighScore', score);
    highScoreValue.textContent = score;
}

// Start the quiz
function startQuiz() {
    playClickSound();
    
    // Get quiz settings
    timerPerQuestion = parseInt(timerSelect.value);
    selectedDifficulty = difficultySelect.value;
    
    // Record start time
    startTime = Date.now();
    totalTimeUsed = 0;
    
    // Filter questions based on selected category and difficulty
    quizQuestions = questionsDatabase.filter(q => {
        const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
        const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
        return categoryMatch && difficultyMatch;
    });
    
    // If no questions match the filter, use all questions
    if (quizQuestions.length === 0) {
        quizQuestions = [...questionsDatabase];
    }
    
    // Randomize questions and options
    quizQuestions = shuffleArray(quizQuestions);
    
    // Determine how many questions to show based on difficulty
    let questionCount;
    switch(selectedDifficulty) {
        case 'easy':
            questionCount = 5;
            break;
        case 'medium':
        case 'hard':
            questionCount = 10;
            break;
        default:
            questionCount = 8; // For 'all' difficulty
    }
    
    // Limit to the appropriate number of questions
    quizQuestions = quizQuestions.slice(0, questionCount);
    
    // Initialize user answers array
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    currentScore.textContent = '0';
    
    // Show quiz screen
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    resultsScreen.classList.remove('active');
    
    // Display first question
    displayQuestion();
    
    // Start timer if enabled
    if (timerPerQuestion > 0) {
        startTimer();
    }
}

// Display the current question
function displayQuestion() {
    // Clear previous question data
    optionsContainer.innerHTML = '';
    fillInContainer.style.display = 'none';
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback';
    
    // Get current question
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Update question text
    questionText.textContent = currentQuestion.question;
    
    // Update question type and difficulty
    questionType.textContent = getQuestionTypeText(currentQuestion.type);
    questionDifficulty.textContent = currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1);
    questionDifficulty.className = `question-difficulty ${currentQuestion.difficulty}`;
    
    // Update progress
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
    
    // Display options based on question type
    if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
        displayOptions(currentQuestion);
    } else if (currentQuestion.type === 'fill') {
        displayFillInBlank(currentQuestion);
    }
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === quizQuestions.length - 1;
    submitQuizBtn.style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'flex' : 'none';
    
    // Restore user's previous answer if exists
    if (userAnswers[currentQuestionIndex] !== null) {
        restoreUserAnswer(currentQuestion);
    }
}

// Display options for multiple choice questions
function displayOptions(question) {
    // Shuffle the options for this question
    const shuffledOptions = shuffleArray([...question.options]);
    
    shuffledOptions.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.dataset.value = option;
        
        let inputElement;
        if (question.type === 'single') {
            inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.name = 'quiz-option';
            inputElement.id = `option-${index}`;
        } else {
            inputElement = document.createElement('input');
            inputElement.type = 'checkbox';
            inputElement.id = `option-${index}`;
        }
        
        const labelElement = document.createElement('label');
        labelElement.className = 'option-label';
        labelElement.htmlFor = `option-${index}`;
        labelElement.textContent = option;
        
        const iconElement = document.createElement('div');
        iconElement.className = 'option-icon';
        
        optionElement.appendChild(inputElement);
        optionElement.appendChild(labelElement);
        optionElement.appendChild(iconElement);
        
        optionElement.addEventListener('click', () => selectOption(optionElement, question.type));
        optionsContainer.appendChild(optionElement);
    });
}

// Display fill in the blank input
function displayFillInBlank(question) {
    fillInContainer.style.display = 'flex';
    fillInAnswer.value = '';
    fillInAnswer.focus();
}

// Restore user's previous answer
function restoreUserAnswer(question) {
    const userAnswer = userAnswers[currentQuestionIndex];
    
    if (question.type === 'single') {
        // Find the option that matches the saved value
        document.querySelectorAll('.option').forEach(optionElement => {
            if (optionElement.dataset.value === userAnswer[0]) {
                optionElement.querySelector('input').checked = true;
                optionElement.classList.add('selected');
            }
        });
    } else if (question.type === 'multiple') {
        userAnswer.forEach(answerValue => {
            document.querySelectorAll('.option').forEach(optionElement => {
                if (optionElement.dataset.value === answerValue) {
                    optionElement.querySelector('input').checked = true;
                    optionElement.classList.add('selected');
                }
            });
        });
    } else if (question.type === 'fill') {
        fillInAnswer.value = userAnswer[0] || '';
    }
}

// Handle option selection
function selectOption(optionElement, questionType) {
    const selectedValue = optionElement.dataset.value;
    const input = optionElement.querySelector('input');
    
    if (questionType === 'single') {
        // For single choice, deselect all options first
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
            opt.querySelector('input').checked = false;
        });
        
        // Select the clicked option
        optionElement.classList.add('selected');
        input.checked = true;
        
        // Save answer
        userAnswers[currentQuestionIndex] = [selectedValue];
        
        // Auto-advance after a short delay for better UX
        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                showNextQuestion();
            }
        }, 800);
        
    } else if (questionType === 'multiple') {
        // For multiple choice, toggle selection
        optionElement.classList.toggle('selected');
        input.checked = !input.checked;
        
        // Save selected answers
        const selectedOptions = [];
        document.querySelectorAll('.option.selected').forEach(opt => {
            selectedOptions.push(opt.dataset.value);
        });
        
        userAnswers[currentQuestionIndex] = selectedOptions;
    }
    
    playClickSound();
}

// Handle fill in the blank answer submission
function submitFillAnswerHandler() {
    const answer = fillInAnswer.value.trim();
    
    if (answer) {
        // Save answer
        userAnswers[currentQuestionIndex] = [answer];
        
        // Auto-advance after a short delay for better UX
        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                showNextQuestion();
            }
        }, 800);
        
        playClickSound();
    } else {
        // Show validation message
        feedbackMessage.textContent = 'Please enter an answer before proceeding.';
        feedbackMessage.className = 'feedback incorrect';
    }
}

// Show next question
function showNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        
        // Reset and restart timer
        if (timerPerQuestion > 0) {
            resetTimer();
            startTimer();
        }
    }
    
    playClickSound();
}

// Show previous question
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        
        // Reset and restart timer
        if (timerPerQuestion > 0) {
            resetTimer();
            startTimer();
        }
    }
    
    playClickSound();
}

// Start the timer for the current question
function startTimer() {
    timeLeft = timerPerQuestion;
    timerDisplay.textContent = timeLeft;
    timerDisplay.parentElement.classList.remove('warning', 'danger');
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Update timer color when time is running low
        if (timeLeft <= 10 && timeLeft > 5) {
            timerDisplay.parentElement.classList.add('warning');
        } else if (timeLeft <= 5) {
            timerDisplay.parentElement.classList.add('warning', 'danger');
        }
        
        // When time runs out
        if (timeLeft <= 0) {
            clearInterval(timer);
            
            // Auto-advance to next question or submit if last question
            if (currentQuestionIndex < quizQuestions.length - 1) {
                showNextQuestion();
            } else {
                submitQuiz();
            }
        }
    }, 1000);
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    timerDisplay.parentElement.classList.remove('warning', 'danger');
}

// Submit the quiz and show results
function submitQuiz() {
    playClickSound();
    resetTimer();
    
    // Calculate total time used
    totalTimeUsed = Date.now() - startTime;
    
    // Calculate score
    calculateScore();
    
    // Show results screen
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // Update results display
    updateResultsDisplay();
    
    // Check for high score
    checkHighScore();
}

// Calculate the final score
function calculateScore() {
    score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        
        if (userAnswer !== null) {
            let isCorrect = false;
            
            if (question.type === 'single' || question.type === 'multiple') {
                // For single and multiple choice, compare selected values
                const sortedUserAnswer = [...userAnswer].sort();
                const sortedCorrectAnswer = [...question.correctAnswer].sort();
                
                // Check if arrays are equal
                isCorrect = sortedUserAnswer.length === sortedCorrectAnswer.length &&
                    sortedUserAnswer.every((value, idx) => value === sortedCorrectAnswer[idx]);
                    
            } else if (question.type === 'fill') {
                // For fill in the blank, compare lowercase answers
                const userAnswerLower = userAnswer[0].toLowerCase().trim();
                isCorrect = question.correctAnswer.some(correct => 
                    correct.toLowerCase() === userAnswerLower
                );
            }
            
            if (isCorrect) {
                score += question.points;
                correctAnswers++;
                playCorrectSound();
            } else {
                incorrectAnswers++;
                playIncorrectSound();
            }
        } else {
            // No answer provided
            incorrectAnswers++;
        }
    });
    
    // Update global variables for display
    window.correctAnswersCount = correctAnswers;
    window.incorrectAnswersCount = incorrectAnswers;
    window.totalQuestionsCount = quizQuestions.length;
}

// Update the results display
function updateResultsDisplay() {
    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((window.correctAnswersCount / totalQuestions) * 100);
    
    // Update score cards
    correctCount.textContent = window.correctAnswersCount;
    incorrectCount.textContent = window.incorrectAnswersCount;
    totalScore.textContent = score;
    
    // Update percentage and circle animation
    scorePercentage.textContent = `${percentage}%`;
    
    // Animate the circle
    const circleCircumference = 565.48; // 2 * π * r (r = 90)
    const offset = circleCircumference - (percentage / 100) * circleCircumference;
    
    // Reset circle first
    scoreCircle.style.strokeDashoffset = circleCircumference;
    
    // Animate to new position
    setTimeout(() => {
        scoreCircle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
        scoreCircle.style.strokeDashoffset = offset;
    }, 300);
    
    // Update circle color based on percentage
    if (percentage >= 80) {
        scoreCircle.style.stroke = '#00b894'; // Green
    } else if (percentage >= 60) {
        scoreCircle.style.stroke = '#fdcb6e'; // Yellow
    } else if (percentage >= 40) {
        scoreCircle.style.stroke = '#e17055'; // Orange
    } else {
        scoreCircle.style.stroke = '#d63031'; // Red
    }
    
    // Update performance metrics
    updatePerformanceMetrics(percentage);
}

// Update performance metrics on results screen
function updatePerformanceMetrics(accuracy) {
    // Accuracy
    accuracyValue.textContent = `${accuracy}%`;
    setTimeout(() => {
        accuracyFill.style.width = `${accuracy}%`;
    }, 500);
    
    // Speed calculation (based on time used vs total available time)
    const totalAvailableTime = timerPerQuestion > 0 ? timerPerQuestion * quizQuestions.length * 1000 : 600000; // 10 minutes default if no timer
    const speedScore = Math.max(0, Math.min(100, Math.round((1 - (totalTimeUsed / totalAvailableTime)) * 100)));
    speedValue.textContent = `${speedScore}%`;
    setTimeout(() => {
        speedFill.style.width = `${speedScore}%`;
    }, 800);
    
    // Difficulty level
    difficultyLevel.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    difficultyLevel.style.color = 
        selectedDifficulty === 'easy' ? 'var(--success-color)' :
        selectedDifficulty === 'medium' ? 'var(--warning-color)' : 
        'var(--error-color)';
}

// Check if the current score is a high score
function checkHighScore() {
    const currentHighScore = parseInt(localStorage.getItem('quizHighScore') || 0);
    
    if (score > currentHighScore) {
        // New high score!
        saveHighScore(score);
        newHighScore.textContent = score;
        highScoreUpdate.style.display = 'flex';
    } else {
        highScoreUpdate.style.display = 'none';
    }
}

// Restart the quiz
function restartQuiz() {
    playClickSound();
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    score = 0;
    
    // Record new start time
    startTime = Date.now();
    totalTimeUsed = 0;
    
    // Show quiz screen
    resultsScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Display first question
    displayQuestion();
    
    // Start timer if enabled
    if (timerPerQuestion > 0) {
        startTimer();
    }
}

// Review answers (go back to quiz screen)
function reviewAnswers() {
    playClickSound();
    
    // Go to first question
    currentQuestionIndex = 0;
    
    // Show quiz screen
    resultsScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Display first question with answers highlighted
    displayQuestion();
    highlightCorrectAnswers();
    
    // Disable timer and navigation for review mode
    resetTimer();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    submitQuizBtn.style.display = 'none';
}

// Highlight correct and incorrect answers in review mode
function highlightCorrectAnswers() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    
    // Clear any previous feedback
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback';
    
    if (userAnswer !== null) {
        if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
            // Highlight all options
            document.querySelectorAll('.option').forEach(optionElement => {
                const optionValue = optionElement.dataset.value;
                const isUserSelected = userAnswer.includes(optionValue);
                const isCorrect = currentQuestion.correctAnswer.includes(optionValue);
                
                if (isCorrect && isUserSelected) {
                    // Correct answer selected by user
                    optionElement.classList.add('correct');
                    optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
                } else if (isCorrect && !isUserSelected) {
                    // Correct answer not selected by user
                    optionElement.classList.add('correct');
                    optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
                } else if (!isCorrect && isUserSelected) {
                    // Incorrect answer selected by user
                    optionElement.classList.add('incorrect');
                    optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-times"></i>';
                }
                
                // Disable interaction in review mode
                optionElement.style.pointerEvents = 'none';
                optionElement.querySelector('input').disabled = true;
            });
            
            // Show feedback
            const sortedUserAnswer = [...userAnswer].sort();
            const sortedCorrectAnswer = [...currentQuestion.correctAnswer].sort();
            const isCorrect = sortedUserAnswer.length === sortedCorrectAnswer.length &&
                sortedUserAnswer.every((value, idx) => value === sortedCorrectAnswer[idx]);
                
            if (isCorrect) {
                feedbackMessage.textContent = 'Correct!';
                feedbackMessage.className = 'feedback correct';
            } else {
                feedbackMessage.textContent = 'Incorrect. The correct answer is highlighted.';
                feedbackMessage.className = 'feedback incorrect';
            }
            
        } else if (currentQuestion.type === 'fill') {
            // For fill in the blank
            const userAnswerText = userAnswer[0].toLowerCase().trim();
            const isCorrect = currentQuestion.correctAnswer.some(correct => 
                correct.toLowerCase() === userAnswerText
            );
            
            if (isCorrect) {
                feedbackMessage.textContent = 'Correct!';
                feedbackMessage.className = 'feedback correct';
            } else {
                feedbackMessage.textContent = `Incorrect. The correct answer is: ${currentQuestion.correctAnswer[0]}`;
                feedbackMessage.className = 'feedback incorrect';
            }
            
            // Disable interaction
            fillInAnswer.disabled = true;
            submitFillAnswer.disabled = true;
        }
    } else {
        // No answer provided
        feedbackMessage.textContent = `You didn't answer this question. The correct answer is: ${currentQuestion.correctAnswer.join(', ')}`;
        feedbackMessage.className = 'feedback incorrect';
        
        if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
            // Highlight correct answers
            currentQuestion.correctAnswer.forEach(correctValue => {
                document.querySelectorAll('.option').forEach(optionElement => {
                    if (optionElement.dataset.value === correctValue) {
                        optionElement.classList.add('correct');
                        optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
                    }
                });
            });
            
            // Disable interaction
            document.querySelectorAll('.option').forEach(optionElement => {
                optionElement.style.pointerEvents = 'none';
                optionElement.querySelector('input').disabled = true;
            });
        } else if (currentQuestion.type === 'fill') {
            // Disable interaction
            fillInAnswer.disabled = true;
            submitFillAnswer.disabled = true;
        }
    }
}

// Go back to category selection
function goToCategories() {
    playClickSound();
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    // Show welcome screen
    resultsScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
}

// Helper function to get question type text
function getQuestionTypeText(type) {
    switch (type) {
        case 'single': return 'Single Choice';
        case 'multiple': return 'Multiple Choice';
        case 'fill': return 'Fill in the Blank';
        default: return 'Question';
    }
}

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Play sound effects
function playClickSound() {
    try {
        clickSound.currentTime = 0;
        clickSound.play();
    } catch (e) {
        // Sound play failed, ignore
    }
}

function playCorrectSound() {
    try {
        correctSound.currentTime = 0;
        correctSound.play();
    } catch (e) {
        // Sound play failed, ignore
    }
}

function playIncorrectSound() {
    try {
        incorrectSound.currentTime = 0;
        incorrectSound.play();
    } catch (e) {
        // Sound play failed, ignore
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', init);