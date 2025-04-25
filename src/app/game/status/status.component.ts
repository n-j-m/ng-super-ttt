import { Component, inject } from '@angular/core';
import { GameStore } from '../../core/game.store';

@Component({
  selector: 'app-status',
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
})
export class StatusComponent {
  readonly #game = inject(GameStore);

  protected readonly status = this.#game.status;
}
