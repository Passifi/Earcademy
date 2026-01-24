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
    constructor() {
        this.guesses = []
        this.currentInterval = 0
    }

    setInterval(interval: number) {
        this.currentInterval = interval
    }

    checkAnswer(answer: number) {
        this.guesses.push(new Guess(this.currentInterval, this.currentInterval === answer))
        return this.guesses[-1].correct
    }

    generateInterval(max: number) {
        max = max > 12 ? 12 : max;
        max = max < 0 ? 0 : max;
        return Math.round(Math.random()*max)
    }

    getScore() {
        const pointsPerGuess = 100;
        const streakMultiplier = 1.2;
        let score = 0; 
        let streak = false; 
        let streakCounter = 0; 
        for(const el of this.guesses) {
            if(el.correct) {
               if(streak) {
                    streakCounter++;
                    score += streakCounter*streakMultiplier + pointsPerGuess;
               } 
               else {
                    streak = true;
                    streakCounter = 1;
                    score +=  pointsPerGuess;
               }
            }
            else {
                streak = false;
            }
        }
        return score;
    }

};