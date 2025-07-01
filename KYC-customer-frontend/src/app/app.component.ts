import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {
  title = 'kyc';
 
}
