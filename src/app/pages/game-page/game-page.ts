import { Component } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { Turn } from '../../models/turn';

@Component({
  selector: 'app-game-page',
  imports: [ KeyValuePipe ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {

  turns = this.generateEmptyTurns();

  currentTurn = 1;
  selectedNumber = 0;

  colors: Record<number, string> = {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'yellow',
    5: 'orange',
    6: 'purple',
    7: 'cyan',
    8: 'pink'
  };

  generateEmptyTurns(): Turn[] {
    return Array.from({ length: 8 }, () => ({
      guess: [0, 0, 0, 0],
      hint: ['gray', 'gray', 'gray', 'gray']
    }));
  }

  getColorValue(numberColor: number): string {
    if (numberColor === 0) {
      return 'gray';
    }
    return this.colors[numberColor] || 'gray';
  }

  selectNumber(num: string): void {
    const numValue = Number(num);
    this.selectedNumber = numValue;
  }

  setBallValue(turnIndex: number, guessIndex: number): void {
    if (turnIndex + 1 !== this.currentTurn) {
      return;
    }
    this.turns[turnIndex].guess[guessIndex] = this.selectedNumber;
  }

  switchTurn(): void {
    if (this.currentTurn < 8) {
      this.currentTurn++;
    }
  }

  startNewGame(): void {
    this.currentTurn = 1;
    this.selectedNumber = 0;
    this.turns = this.generateEmptyTurns();
  }

  solution = [1, 2, 3, 4];

}
