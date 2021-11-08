import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent implements OnInit {

  entryForm:FormGroup
  constructor(public entryService: JournalService,public datepipe: DatePipe, private router: Router) {
    const currentDate=new Date();
    let latest_date =this.datepipe.transform(currentDate, 'dd-MM-yyyy'); 
    let date =this.datepipe.transform(currentDate, 'dd-MM-yyyy'); 
    this.entryForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'journal_content': new FormControl('',),
      'user_id': new FormControl(this.entryService.userID,),
      'entry_key': new FormControl(this.entryService.userID+'_'+latest_date,),
      'date': new FormControl(date,)
    })
  }

  ngOnInit(): void {
  }
  submitentry(){
    Object.keys(this.entryForm.controls).forEach(field => {
      const control = this.entryForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.entryForm.valid){
      
      console.log(this.entryForm.value)
      // this.entryForm.patchValue({user_id: this.entryService.userID});
      // this.studentService.savestudent(this.studentForm.value).subscribe(() => {
      //   this.router.navigate(['/student-list'])
      // },() => {
      //   alert("Something Went Wrong")
      // })
      this.entryService.saveEntry(this.entryForm.value).subscribe(()=>{
        this.router.navigate(['/entry-list'])
      })
    }
  }

}
