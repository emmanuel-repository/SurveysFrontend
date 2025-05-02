import { MatGridListModule } from '@angular/material/grid-list';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from 'core/models/user.model';
import { AdminService } from 'core/services/admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule
  ],
})

export class AdminComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'last_name', 'user_name', 'actions'];
  dataSource = new MatTableDataSource<User>();
  adminList: User[] = []

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {

    console.log('Esta es una prueba de carga')
    this.adminService.getAllAdmins().subscribe({

      next: (admins) => {
        this.dataSource.data = admins;
      },

      error: (err) => {
        console.error('Error loading admins:', err);
      }
    });
  }

  openDialog(admin?: User): void {
    // const dialogRef = this.dialog.open(AdminDialogComponent, {
    //   width: '450px',
    //   data: admin ? { ...admin } : null
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.loadAdmins();
    //   }
    // });
  }

  deleteAdmin(id: number): void {
    if (confirm('¿Estás seguro de eliminar este administrador?')) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          this.loadAdmins();
        },
        error: (err) => {
          console.error('Error deleting admin:', err);
        }
      });
    }
  }

}
