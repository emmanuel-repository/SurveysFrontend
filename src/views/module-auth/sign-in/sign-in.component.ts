import { Component, ViewEncapsulation } from '@angular/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-sign-in',
  imports: [
    MatSlideToggleModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class SignInComponent {

}
