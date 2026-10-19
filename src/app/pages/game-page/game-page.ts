import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { DialogData, GAME_WON_DIALOG, GAME_LOST_DIALOG, ABOUT_DIALOG } from '../../models/dialog-data';
import { Turn } from '../../models/turn';

@Component({
  selector: 'app-game-page',
  imports: [ KeyValuePipe ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage implements OnInit {

  @ViewChild('dialog')
  private dialog!: ElementRef<HTMLDialogElement>;

  turns = this.generateEmptyTurns();
  solution = [0, 0, 0, 0];
  private sequence = [0, 0, 0, 0];
  dialogData: DialogData | null = null;

  currentTurn = 1;
  selectedNumber = 0;
  private gameStatus: ('won' | 'lost' | 'in-progress') = 'in-progress';

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

  ngOnInit(): void {
    this.startNewGame();
  }

  checkGuessSequence(): void {
    const sequenceToCheck = this.turns[this.currentTurn - 1].guess;
    this.turns[this.currentTurn - 1].hint = this.compareSequences(sequenceToCheck, this.sequence);
    this.checkGameStatus();
    if (this.gameStatus !== 'in-progress') {
      if (this.gameStatus === 'won') {
        this.openGameWonDialog();
      } else if (this.gameStatus === 'lost') {
        this.openGameLostDialog();
      }
      this.showSolution();
    } else {
      this.switchTurn();
    }
  }

  startNewGame(): void {
    this.currentTurn = 1;
    this.selectedNumber = 0;
    this.turns = this.generateEmptyTurns();
    this.dialogData = null;

    this.hideSolution();
    this.generateSequence();
    this.gameStatus = 'in-progress';
  }

  getColorValue(numberColor: number): string {
    if (numberColor === 0) {
      return 'gray';
    }
    return this.colors[numberColor] || 'gray';
  }

  selectNumber(num: string): void {
    this.selectedNumber = Number(num);
  }

  setBallValue(turnIndex: number, guessIndex: number): void {
    if (this.gameStatus !== 'in-progress') {
      return;
    }
    if (turnIndex + 1 !== this.currentTurn) {
      return;
    }
    this.turns[turnIndex].guess[guessIndex] = this.selectedNumber;
  }

  private compareSequences(guess: number[], sequence: number[]): ('gray' | 'white' | 'black')[] {
    const hints: ('gray' | 'white' | 'black')[] = Array(4).fill('gray');
    const remainingGuess: number[] = [];
    const remainingSequence: number[] = [];

    // Exact matches
    for (let i = 0; i < sequence.length; i++) {
      if (guess[i] === sequence[i]) {
        hints[i] = 'black';
      } else {
        remainingGuess.push(guess[i]);
        remainingSequence.push(sequence[i]);
      }
    }

    for (const color of remainingGuess) {
      const index = remainingSequence.indexOf(color);

      if (index !== -1) {
        hints[hints.indexOf('gray')] = 'white';
        remainingSequence.splice(index, 1);
      }
    }

    // Group black hints before white hints
    return [
      ...hints.filter(hint => hint === 'black'),
      ...hints.filter(hint => hint === 'white'),
      ...hints.filter(hint => hint === 'gray')
    ];
  }

  private generateEmptyTurns(): Turn[] {
    return Array.from({ length: 8 }, () => ({
      guess: [0, 0, 0, 0],
      hint: ['gray', 'gray', 'gray', 'gray']
    }));
  }

  private switchTurn(): void {
    if (this.currentTurn < 8) {
      this.currentTurn++;
    }
  }

  private hideSolution(): void {
    this.solution = [0, 0, 0, 0];
  }

  private showSolution(): void {
    this.solution = this.sequence;
  }

  private checkGameStatus(): void {
    const lastHint = this.turns[this.currentTurn - 1].hint;
    if (lastHint.every(hint => hint === 'black')) {
      this.gameStatus = 'won';
    } else if (this.currentTurn === 8) {
      this.gameStatus = 'lost';
    }
  }

  private generateSequence(): void {
    for(let i = 0; i < this.sequence.length; i++) {
        this.sequence[i] = Math.floor(Math.random() * 8) + 1;
    }
  }

  // Dialogs

  openAboutDialog(): void {
    this.openDialog(ABOUT_DIALOG);
  }

  private openGameWonDialog(): void {
    this.openDialog(GAME_WON_DIALOG);
  }

  private openGameLostDialog(): void {
    this.openDialog(GAME_LOST_DIALOG);
  }

  closeDialog(): void {
    this.dialog.nativeElement.close();
  }

  private openDialog(type: DialogData): void {
    this.dialogData = type;
    this.dialog.nativeElement.showModal();
  }

}
