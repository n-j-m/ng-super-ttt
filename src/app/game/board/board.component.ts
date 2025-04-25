import { Component, computed, inject } from '@angular/core';
import { GameStore } from '../../core/game.store';
import { SquareComponent } from '../square/square.component';

const AppImports = [SquareComponent];

@Component({
  selector: 'app-board',
  imports: [...AppImports],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  readonly #game = inject(GameStore);

  readonly squares = this.#game.squares;
}
