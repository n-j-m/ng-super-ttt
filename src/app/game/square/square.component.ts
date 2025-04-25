import { Component, computed, inject, input } from '@angular/core';
import { Square } from '../../core/types/square';
import { GameStore } from '../../core/game.store';

@Component({
  selector: 'app-square',
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css',
})
export class SquareComponent {
  readonly #game = inject(GameStore);

  readonly value = input.required<Square>();
  readonly index = input.required<number>();

  protected readonly fadingCss = computed(() => {
    const value = this.value();
    const index = this.index();

    if (value === 'X') {
      const xEntries = this.#game.xEntries();
      if (xEntries.length === 3 && xEntries[0] === index) {
        return 'fading';
      }
    }

    if (value === 'O') {
      const oEntries = this.#game.oEntries();
      if (oEntries.length === 3 && oEntries[0] === index) {
        return 'fading';
      }
    }

    return '';
  });

  onSquareClick() {
    const winner = this.#game.winner();
    const space = this.value();
    if (space || winner) return;
    this.#game.place(this.index());
  }
}
