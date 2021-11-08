import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: JournalService,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.userID=-1;
    alert("Successfully logged out");
    this.router.navigate(['/'])
  }

}
