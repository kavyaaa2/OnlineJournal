import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator, MustMatch } from '../helper';
import { JournalService } from '../journal.service';
import { User } from '../modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userList= Array<User>();
  userForm:FormGroup
  constructor(public userService:JournalService, private activeRoute: ActivatedRoute,private router:Router) { 
    this.userForm = new FormGroup({
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('',),
      'email': new FormControl('',[Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required,Validators.minLength(6)]),
      'confirm_password': new FormControl('',[Validators.required,Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
  }

valid(){
  if(this.userForm.value.password==this.userForm.value.confirm_password){
    return true;
  }
  else
     return false;
}
get f(){return this.userForm.controls}

submitentry(){
  this.userService.getAllUser().subscribe((data)=>{
    let i=0
    for(i=0;i<data.length;i++){
      if(data[i].email==this.userForm.value.email){
        alert("There is already an account with this email, try login!")
        break;
      }
      else{
        if(i==data.length-1){
          if(this.userForm.value.password==this.userForm.value.confirm_password){
            this.userForm.removeControl('confirm_password');
            this.userService.saveUser(this.userForm.value).subscribe((data)=>{
              this.userService.userID=data.user_id;
              this.router.navigate(['/landing-page'])
            })
          }
          else{
            alert("passwords do not match")
          }
        }
      }
    }
  })


}

}
