import { Note } from "./notes";

export class Guess {
  interval: number;
  correct: boolean;

  constructor(interval: number, correct: boolean) {
    this.interval = interval;
    this.correct = correct

  }
}


export class Scorer {
  guesses: Guess[]
  currentInterval: number;
  currentNote!: Note;
  constructor() {
    this.guesses = []
    this.currentInterval = Math.round(Math.random() * 12)
    this.generateNote(3, 6)
  }

  setInterval(interval: number) {
    this.currentInterval = interval
  }

  checkAnswer(answer: number) {
    const currentGuess = new Guess(this.currentInterval, this.currentInterval === answer)
    this.guesses.push(currentGuess)
    if (currentGuess.correct) {
      this.generateChallenge()
    }

    return this.guesses.at(-1)!.correct
  }

  generateChallenge() {
    this.generateNote(3, 5);
    this.generateInterval(12)
  }

  generateNote(minOctave: number, maxOctave: number) {
    this.currentNote = new Note(Math.round(Math.random() * 12),
      Math.round(Math.random() * (maxOctave - minOctave + 1) + minOctave));
  }

  generateInterval(max: number) {
    max = max > 12 ? 12 : max;
    max = max < 0 ? 0 : max;
    this.currentInterval = Math.round(Math.random() * max)
  }

  getScore() {
    const pointsPerGuess = 100;
    const streakMultiplier = 1.2;
    let score = 0;
    let streak = false;
    let streakCounter = 0;
    for (const el of this.guesses) {
      if (el.correct) {
        if (streak) {
          streakCounter++;
          score += streakCounter * streakMultiplier + pointsPerGuess;
        }
        else {
          streak = true;
          streakCounter = 1;
          score += pointsPerGuess;
        }
      }
      else {
        streak = false;
      }
    }
    return score;
  }

};
