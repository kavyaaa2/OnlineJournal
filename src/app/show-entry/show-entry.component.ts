import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService } from '../journal.service';
import { Entry } from '../modal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-show-entry',
  templateUrl: './show-entry.component.html',
  styleUrls: ['./show-entry.component.css']
})
export class ShowEntryComponent implements OnInit {

  id: number = 0;
  entryList= Array<Entry>();

  entryForm:FormGroup
  constructor(private activeRoute: ActivatedRoute,private router:Router,private entryService:JournalService,public datepipe: DatePipe) { 
    

    this.entryForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'journal_content': new FormControl('',),
      'user_id': new FormControl(''),
      'entry_key': new FormControl(''),
      'date': new FormControl('',),
      'entry_no': new FormControl(this.id,)
    })
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramsData) => {
      this.id = paramsData.id;
      this.entryService.getEntryByID(paramsData.id).subscribe((data) => {
        console.log(data);
        this.entryList.push(data);
        const currentDate=new Date();
    let latest_date =this.datepipe.transform(currentDate, 'dd-MM-yyyy'); 
    let date =this.datepipe.transform(currentDate, 'dd-MM-yyyy'); 
        this.entryForm.setValue({
          'title': this.entryList[0].title,
          'journal_content': this.entryList[0].journal_content,
          'user_id': this.entryList[0].user_id,
          'entry_key': this.entryList[0].entry_key,
          'date': date,
          'entry_no':this.id
        });
      })
    })
    
  }

  submitentry(){
    Object.keys(this.entryForm.controls).forEach(field => {
      const control = this.entryForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.entryForm.valid){
      console.log("On submit"+this.entryForm.value)
      this.entryService.updateEntryById(this.id,this.entryForm.value).subscribe(()=>{
        this.router.navigate(['/entry-list'])
      })
    }
  }
  list(){
    this.router.navigate(['/entry-list'])
  }
  deleteEntry(){
    console.log("delete")
    
    this.entryService.deleteEntryById(this.id).subscribe(()=>{
      this.router.navigate(['/entry-list'])
    })
  }
}
