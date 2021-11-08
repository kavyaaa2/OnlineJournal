import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService } from '../journal.service';
import { User } from '../modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userList= Array<User>();
  userForm:FormGroup
  constructor(private userService:JournalService, private activeRoute: ActivatedRoute,private router:Router) { 
    this.userForm = new FormGroup({
      'email': new FormControl('',[Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
  }
  submitentry(){
    this.userService.getAllUser().subscribe((data)=>{
      let i=0
      for(i=0;i<data.length;i++){
        if(data[i].email==this.userForm.value.email && data[i].password==this.userForm.value.password){
          this.userService.userID=data[i].user_id;
          alert("Login successful!")
          this.router.navigate(['/landing-page'])
          break;
        }
        else{
          if(i==data.length-1){
            alert("Either wrong email or password, please try again!")
          }
        }
      }
    })
  }
}
