
export const Difficulties = {
  Easy: 1,
  Medium: 2,
  Hard: 4,
  Beethoven: 8,
  Mozart: 16
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
