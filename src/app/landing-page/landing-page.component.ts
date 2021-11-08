import { Component, OnInit } from '@angular/core';
import { JournalService } from '../journal.service';
import { User } from '../modal';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  userDetail: User={
    first_name:"",
    last_name:"",
    email:"",
    password:""
  };
  constructor(private userService: JournalService) { }

  ngOnInit(): void {
    console.log("User id="+this.userService.userID)
    if(this.userService.userID!=-1){
      this.userService.getUserByID(this.userService.userID).subscribe((data)=>{
        this.userDetail=data;
        console.log(data.first_name)
      })
    }
  }

}
