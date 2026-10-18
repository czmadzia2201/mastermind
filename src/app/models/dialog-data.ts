export interface DialogData {
    title: string;
    paragraphs: string[];
}

export const GAME_WON_DIALOG: DialogData = {
    title: 'Congratulations!',
    paragraphs: [
        'You have successfully completed the game.'
    ]
};

export const GAME_LOST_DIALOG: DialogData = {
    title: 'Game Over!',
    paragraphs: [
        'You ran out of attempts. Better luck next time!'
    ]
};

export const ABOUT_DIALOG: DialogData = {
    title: 'About the Game',
    paragraphs: [
          'Mastermind is a classic code-breaking game. Your goal is to guess a secret sequence of four colored balls within eight attempts. After each guess, black hints indicate correct colors in the correct positions, while white hints indicate correct colors in the wrong positions.',
          'You can check your guess without filling all four positions. The secret sequence may contain two or more balls of the same color.'
    ]
};
