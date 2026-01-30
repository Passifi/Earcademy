import { warn } from "tone/build/esm/core/util/Debug";
import { RandomGenerator } from "../classes/RandomGenerator";
import { Note } from "./notes";

export class Guess {
  interval: number;
  correct: boolean;

  constructor(interval: number, correct: boolean) {
    this.interval = interval;
    this.correct = correct
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

export class Scorer {
  guesses: Guess[]
  currentInterval: number;
  currentNote!: Note;
  range: number = 12;
  curentMode = Modes.IntervalDown
  publicGuesses: Guess[];
  constructor() {
    this.guesses = []
    this.publicGuesses = []
    this.currentInterval = Math.round(Math.random() * 12)
    this.generateNote(3, 5)
  }

  setInterval(interval: number) {
    this.currentInterval = interval
  }

  checkAnswer(answer: number) {
    const currentGuess = new Guess(Math.abs(this.currentInterval), Math.abs(this.currentInterval) === answer)
    this.guesses.push(currentGuess)
    if (currentGuess.correct) {
      this.publicGuesses = [...this.guesses]
      this.generateChallenge()
    }

    return this.guesses.at(-1)!.correct
  }

  generateChallenge() {
    var min = this.curentMode == Modes.IntervalUpDown || this.curentMode == Modes.IntervalDown ? this.range * -1 : 0;
    var max = this.curentMode == Modes.IntervalUpDown || this.curentMode == Modes.IntervalUp ? this.range : 0;
    this.generateNote(3, 5);
    this.generateInterval(min, max)
  }

  generateNote(minOctave: number, maxOctave: number) {
    this.currentNote = new Note(Math.floor(Math.random() * 12),
      Math.round(Math.random() * (maxOctave - minOctave + 1) + minOctave));
  }

  generateInterval(min: number, max: number) {
    this.currentInterval = RandomGenerator.randomValue(min, max)

  }

  get guessData() {
    return this.publicGuesses
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
