import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './services/user.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'Email', 'Password', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'angular-crud-app';
  data: any;

  ngOnInit(): void {
    this.getUser();
  }

  constructor(private formbuilder: FormBuilder, private dialog: MatDialog, private service: UserService) { }

  opendialogueadd() {
    const DialogRef = this.dialog.open(AddUserComponent, ({
      width: '50%',
      height: '50%'
    }))

    DialogRef.afterClosed().subscribe({
      next: () => {
        this.getUser();
      }
    })
  }


  getUser() {
    this.service.getUser().subscribe({
      next: ((res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),

      error: ((error) => {
        console.log(error)
      })

    })
  }

  
  malik(id: any,) {
    this.service.userdalete(id).subscribe({
      next: (res) =>{
        this.getUser();
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  updateuser(data: any){
   const DialogRef= this.dialog.open(AddUserComponent,({
      width: '50%',
      height: '50%',
      data,
    }));

    DialogRef.afterClosed().subscribe({
      next: () => {
        this.getUser();
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
