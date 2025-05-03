import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../template/header/header.component";

@Component({
  selector: 'app-main-admin',
  standalone: true,
  templateUrl: './main-admin.component.html',
  styleUrl: './main-admin.component.scss',
  imports: [RouterOutlet, HeaderComponent, HeaderComponent],
})

export class MainAdminComponent {
}
