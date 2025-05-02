import { MatGridListModule } from '@angular/material/grid-list';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from 'core/models/user.model';
import { AdminService } from 'core/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
})

export class AdminComponent {



  displayedColumns: string[] = ['id', 'name', 'last_name', 'user_name', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): void {
    this.adminService.getAllAdmins().subscribe({

      next: (admins) => {
        this.dataSource.data = admins;
        this.dataSource.paginator = this.paginator;
      },

      error: (err) => {
        console.error('Error loading admins:', err);
      }
    });
  }

  openDialog(admin?: User): void {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      width: '500px',
      data: admin ? { ...admin } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAdmins();
      }
    });
  }

  deleteAdmin(id: number): void {
    if (confirm('¿Estás seguro de eliminar este administrador?')) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          this.getAdmins();
        },
        error: (err) => {
          console.error('Error deleting admin:', err);
        }
      });
    }
  }

}
