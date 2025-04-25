import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameStore } from '../core/game.store';

const AngularImports = [RouterOutlet];

@Component({
  selector: 'app-shell',
  imports: [...AngularImports],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent {
  readonly #game = inject(GameStore);

  onResetClick() {
    this.#game.reset();
  }
}
