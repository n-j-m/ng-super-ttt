import { Component } from '@angular/core';
import { StatusComponent } from './status/status.component';
import { BoardComponent } from './board/board.component';

const AppImports = [StatusComponent, BoardComponent];

@Component({
  selector: 'app-game',
  imports: [...AppImports],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {}
