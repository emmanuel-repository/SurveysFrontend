import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtService } from 'core/services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterModule],
})


export class HeaderComponent {

  userRol!: string | null;

  private jwtService = inject(JwtService);


  ngOnInit(): void {
    this.userRol = this.jwtService.getUserRole();
  }

}
