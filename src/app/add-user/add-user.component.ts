import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
 hide = true
 userform!: FormGroup
 ngOnInit(): void {
   this.addform1();
   this.userform.patchValue(this.data)
 }

 constructor(private formbuilder: FormBuilder, private service:UserService, private matdialogueref: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

 addform1(){
  this.userform = this.formbuilder.group({
    'FirstName': [null,[Validators.required]],
    'LastName': [null,[Validators.required]],
    'Email': [null,[Validators.required,Validators.email]],
    'Password': [null,[Validators.required]],
  })
 }


 submitform(){
  if (this.data){
    this.service.userupate( this.data.id , this.userform.value).subscribe({
      next:((res)=>{
        console.log(res)
        this.matdialogueref.close()
      }),
      error:((error)=>{
        console.log(error)
      })
  
    })
  }else{
    this.service.addUser(this.userform.value).subscribe({
      next:((res)=>{
        console.log(res)
        this.matdialogueref.close()
      }),
      error:((error)=>{
        console.log(error)
      })
  
    })
  }
  
 }
}


