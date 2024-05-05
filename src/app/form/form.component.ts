import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myUserData: any;
  myArray:any = []
  constructor(private formbuilder: FormBuilder){}
  testForm!:FormGroup
ngOnInit(): void {
  this.testFormOne()
  const data:any = localStorage.getItem('testForm')
  const finalData = JSON.parse(data)
  console.log("bora====>",finalData)
  this.myUserData = finalData
  this.myArray.push(finalData)
}

testFormOne(){
  this.testForm = this.formbuilder.group({
    "name":[null,[Validators.required]],
    "mail":[null,[Validators.required]],
    "mobile":[null,[Validators.required]],
    "password":[null,[Validators.required]]
  })
}

submitForm(){
  localStorage.setItem('testForm', JSON.stringify(this.testForm.value))
  window.location.reload()
}

removedata(){
  localStorage.removeItem('testForm')
  window.location.reload()
}

myname = "malik"
imageurl = 'https://www.shutterstock.com/image-photo/portrait-handsome-caucasian-man-formal-260nw-2142820441.jpg'

malik(val: any, img: any){
this.myname = val
this.imageurl = img
}

imgmust = ''

imgnot( test: any){
this.imgmust = test.value
}
}
