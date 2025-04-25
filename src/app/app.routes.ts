import { Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: GameComponent,
      },
    ],
  },
];
