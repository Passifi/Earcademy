import { RandomGenerator } from "../classes/RandomGenerator";
import { Note } from "./notes";
import { Difficulties, Setting } from "../classes/Setting";
export class Guess {
  interval: number;
  correct: boolean;
  mode: number;
  constructor(interval: number, correct: boolean) {
    this.interval = interval;
    this.correct = correct
    this.mode = Modes.IntervalUp;
  }

}

const basePoints = 100;
const pointDeduction = 10;

export const Modes = {
  IntervalUp: 1,
  IntervalDown: 2,
  IntervalUpDown: 4,
  Simultanous: 8
}

const intervalsPerDifficulty: Record<number, any[]> = {
  [Difficulties.Easy]: [0, 3, 7, 12],
  [Difficulties.Medium]: [0, 2, 3, 7, 9, 12],
  [Difficulties.Hard]: [0, 1, 2, 3, 4, 5, 7, 9, 12],
  [Difficulties.Beethoven]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12],
  [Difficulties.Mozart]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

}

const checkInterval = 10
export class Scorer {
  intervalAccu: number = 0
  guesses: Guess[]
  currentInterval: number;
  currentNote!: Note;
  range: number = 12;
  currentMode: number = Modes.IntervalUp
  publicGuesses: Guess[];
  difficulty: number;
  dynamicDifficulty: boolean = true;
  onDifficultyChange: (el: number) => void
  constructor(difficultyChangeHandler: (el: number) => void) {
    this.onDifficultyChange = difficultyChangeHandler
    this.guesses = []
    this.publicGuesses = []
    this.generateNote(3, 5)
    this.difficulty = Difficulties.Easy;
    this.currentInterval = RandomGenerator.randomValueFromSet(intervalsPerDifficulty[this.difficulty])
  }

  setInterval(interval: number) {
    this.currentInterval = interval
  }

  getPossibleIntervals() {
    var intervalsTest = intervalsPerDifficulty[this.difficulty];
    if (typeof (intervalsTest) != typeof ([])) {
      console.log("Interals couldn't be retrieved using fallback")
      return [0, 3, 5, 12]
    }
    else
      return intervalsPerDifficulty[this.difficulty]
  }

  checkAnswer(answer: number) {
    const currentGuess = new Guess(Math.abs(this.currentInterval), Math.abs(this.currentInterval) === answer)
    this.guesses.push(currentGuess)

    if (currentGuess.correct) {
      this.publicGuesses = [...this.guesses]
      this.generateChallenge()
    }

    this.intervalAccu++;
    if (this.intervalAccu == checkInterval)
      this.calibrateDifficulty();
    var diff = Math.abs(this.currentInterval) - answer
    return { correct: this.guesses.at(-1)!.correct, errorSize: diff }
  }

  generateChallenge() {
    this.generateNote(2, 5);
    this.generateInterval()
    if (this.currentMode === Modes.IntervalDown) {
      console.log("bamn")
      this.currentInterval *= -1;
    }
    else if (this.currentMode === Modes.IntervalUpDown) {
      let sgn = Math.sign(RandomGenerator.randomValue(-1.0, 1.0));
      sgn = sgn != 0 ? sgn : 1.0
      this.currentInterval *= Math.sign(RandomGenerator.randomValue(-1.0, 1.0));
    }
    else {
      this.currentInterval = Math.abs(this.currentInterval)
    }
  }

  generateNote(minOctave: number, maxOctave: number) {
    this.currentNote = new Note(Math.floor(Math.random() * 12),
      Math.round(Math.random() * (maxOctave - minOctave + 1) + minOctave));
  }

  generateInterval() {
    var intervals = intervalsPerDifficulty[this.difficulty]
    this.currentInterval = RandomGenerator.randomValueFromSet(intervals)
  }

  get guessData() {
    return this.publicGuesses
  }

  setGameMode(newMode: number) {
    this.currentMode = newMode;
    this.generateChallenge();
  }

  set Difficulty(newDifficulty: number) {
    this.difficulty = newDifficulty
    this.generateChallenge();
  }

  calibrateDifficulty() {
    if (this.guesses.length < checkInterval) return;
    const lastTenGuesses = this.guesses.slice(this.guesses.length - checkInterval, this.guesses.length);
    const correctGuesses = lastTenGuesses.filter(el => el.correct).length;
    if (correctGuesses / checkInterval > 0.7) {
      if (this.difficulty < Difficulties.Beethoven) {
        this.difficulty += 10;
      }
    }
    else if (correctGuesses / checkInterval < 0.2) {
      if (this.difficulty > Difficulties.Easy)
        this.difficulty -= 10;
    }
    if (this.difficulty % 10 != 0 && this.difficulty != 0) {
      // difficutly was screwed up somehow need better fix
      this.difficulty = 0;
    }
    this.intervalAccu = 0
    this.onDifficultyChange(this.difficulty)
  }

  getScore() {
    const pointsPerGuess = 100;
    const streakMultiplier = 1.2;
    let score = 0;
    let streak = false;
    let streakCounter = 0;
    let currentPoints = basePoints;
    for (const el of this.guesses) {
      if (el.correct) {
        if (streak) {
          streakCounter++;
          score += streakCounter * streakMultiplier + pointsPerGuess;
        }
        else {
          streak = true;
          streakCounter = 1;
          score += currentPoints;
          currentPoints = basePoints;
        }
      }
      else {
        streak = false;
        currentPoints = currentPoints >= pointDeduction ? currentPoints - pointDeduction : 0;
      }
    }
    return score;
  }
};
