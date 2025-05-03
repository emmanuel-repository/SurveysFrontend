import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../template/header/header.component";

@Component({
  selector: 'app-main-user',
  standalone: true,
  templateUrl: './main-user.component.html',
  styleUrl: './main-user.component.scss',
  imports: [RouterOutlet, HeaderComponent, HeaderComponent],
})
export class MainUserComponent {

}
