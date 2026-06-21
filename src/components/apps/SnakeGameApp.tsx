'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 20;
const CELL_SIZE = 24;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 10 };
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_SPEED = 150;

// Sound effects using Web Audio API
const playSound = (type: 'eat' | 'gameOver' | 'move') => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  if (type === 'eat') {
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } else if (type === 'gameOver') {
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.2);
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  } else if (type === 'move') {
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  }
};

const SnakeGameApp = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateFood = useCallback((currentSnake: typeof snake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const checkCollision = useCallback((head: { x: number; y: number }, currentSnake: typeof snake) => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    for (let i = 1; i < currentSnake.length; i++) {
      if (currentSnake[i].x === head.x && currentSnake[i].y === head.y) {
        return true;
      }
    }
    return false;
  }, []);

  const gameLoop = useCallback(() => {
    setSnake((prevSnake) => {
      setDirection(nextDirection);
      const newHead = {
        x: prevSnake[0].x + nextDirection.x,
        y: prevSnake[0].y + nextDirection.y,
      };

      if (checkCollision(newHead, prevSnake)) {
        playSound('gameOver');
        setGameOver(true);
        setGameStarted(false);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snakeHighScore', score.toString());
        }
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        playSound('eat');
        setScore((prev) => prev + 10);
        setFood(generateFood(newSnake));
        setSpeed((prev) => Math.max(50, prev - 2));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [nextDirection, food, checkCollision, generateFood, score, highScore]);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setSpeed(INITIAL_SPEED);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    gameLoopRef.current = setInterval(gameLoop, INITIAL_SPEED);
  }, [generateFood, gameLoop]);

  useEffect(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(gameLoop, speed);
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameLoop, speed, gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && e.code !== 'Space') return;

      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          if (direction.y !== 1) {
            playSound('move');
            setNextDirection({ x: 0, y: -1 });
          }
          break;
        case 'ArrowDown':
        case 'KeyS':
          if (direction.y !== -1) {
            playSound('move');
            setNextDirection({ x: 0, y: 1 });
          }
          break;
        case 'ArrowLeft':
        case 'KeyA':
          if (direction.x !== 1) {
            playSound('move');
            setNextDirection({ x: -1, y: 0 });
          }
          break;
        case 'ArrowRight':
        case 'KeyD':
          if (direction.x !== -1) {
            playSound('move');
            setNextDirection({ x: 1, y: 0 });
          }
          break;
        case 'Space':
          if (!gameStarted) {
            startGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameStarted, startGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#ff4d6d';
    ctx.shadowColor = '#ff4d6d';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#00ff88' : '#00c8ff';
      ctx.shadowColor = isHead ? '#00ff88' : '#00c8ff';
      ctx.shadowBlur = isHead ? 15 : 8;
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
      ctx.shadowBlur = 0;
    });
  }, [snake, food]);

  return (
    <div className="h-full bg-[#050505] flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full flex justify-between items-center mb-4 px-2">
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Score</div>
          <div className="text-2xl font-bold text-primary">{score}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Best</div>
          <div className="text-2xl font-bold text-secondary">{highScore}</div>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="border-2 border-primary/30 rounded-lg"
        />

        {!gameStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg"
          >
            {gameOver && (
              <div className="text-3xl font-bold text-danger mb-4">Game Over!</div>
            )}
            <div className="text-xl font-bold text-secondary mb-2">
              {gameOver ? 'Press Space to Play Again' : 'Press Space to Start'}
            </div>
            <div className="text-sm text-gray-400 mt-4">
              Use Arrow Keys or WASD to move
            </div>
            <button
              onClick={startGame}
              className="mt-6 px-8 py-3 bg-primary hover:bg-primary/80 text-[#050505] font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              {gameOver ? 'Play Again' : 'Start Game'}
            </button>
          </motion.div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
        <div className="col-start-2">
          <button
            onClick={() => {
              if (direction.y !== 1) {
                playSound('move');
                setNextDirection({ x: 0, y: -1 });
              }
            }}
            className="w-14 h-14 glass flex items-center justify-center rounded-lg border border-primary/30 hover:border-primary/60 transition-all"
          >
            <div className="text-primary text-2xl">↑</div>
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button
            onClick={() => {
              if (direction.x !== 1) {
                playSound('move');
                setNextDirection({ x: -1, y: 0 });
              }
            }}
            className="w-14 h-14 glass flex items-center justify-center rounded-lg border border-primary/30 hover:border-primary/60 transition-all"
          >
            <div className="text-primary text-2xl">←</div>
          </button>
        </div>
        <div className="col-start-2 row-start-2">
          <button
            onClick={() => {
              if (direction.y !== -1) {
                playSound('move');
                setNextDirection({ x: 0, y: 1 });
              }
            }}
            className="w-14 h-14 glass flex items-center justify-center rounded-lg border border-primary/30 hover:border-primary/60 transition-all"
          >
            <div className="text-primary text-2xl">↓</div>
          </button>
        </div>
        <div className="col-start-3 row-start-2">
          <button
            onClick={() => {
              if (direction.x !== -1) {
                playSound('move');
                setNextDirection({ x: 1, y: 0 });
              }
            }}
            className="w-14 h-14 glass flex items-center justify-center rounded-lg border border-primary/30 hover:border-primary/60 transition-all"
          >
            <div className="text-primary text-2xl">→</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGameApp;
