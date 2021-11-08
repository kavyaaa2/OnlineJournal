import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService } from '../journal.service';
import { Entry } from '../modal';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent implements OnInit {

  entryList = Array<Entry>();
  constructor(public entryService: JournalService, private activeRoute: ActivatedRoute, private router: Router) {
    //console.log(entryService.userID);

  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.entryService.getAllEntry().subscribe((data) => {
      data.forEach(element => {
        if (element.user_id == this.entryService.userID) {
          this.entryList.push(element);
        }
      });
      console.log(this.entryList);
    })
  }

  callFunction(id: number | undefined) {
    console.log(id);
    this.router.navigate([
      `show-entry/${id}`,
    ]);
  }

}

