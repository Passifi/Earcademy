
export const Difficulties = {
  Easy: 10,
  Medium: 20,
  Hard: 30,
  Beethoven: 40,
  Mozart: 50
};


export class Setting {

  showHints: boolean;
  difficulty: number;
  playerName: string;
  constructor(showHints: boolean, difficulty: number, playerName: string) {
    this.showHints = showHints;
    this.difficulty = difficulty;
    this.playerName = playerName;
  }
};
