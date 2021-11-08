import { Injectable } from '@angular/core';
import { Entry, User } from './modal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  userID? = -1;
  readonly rootURL = "https://online-journal.azurewebsites.net/api";
  // readonly rootURL="https://localhost:44396/api";
  constructor(private http: HttpClient) { }

  saveEntry(entry: Entry) {
    //console.log(entry)
    return this.http.post(this.rootURL + "/new_entry_details", entry);
    //return this.http.post("https://localhost:44330/api/new_entry_details",entry)
  }

  getAllEntry() {
    return this.http.get<Array<Entry>>(this.rootURL + "/new_entry_details");
  }

  getEntryByID(id: number) {
    return this.http.get<Entry>(this.rootURL + `/new_entry_details/${id}`);
  }

  updateEntryById(entryId: number, entrydata: Entry) {
    return this.http.put(this.rootURL + `/new_entry_details/${entryId}`, entrydata)
  }

  deleteEntryById(id: number) {
    return this.http.delete(this.rootURL + `/new_entry_details/${id}`);
  }

  getAllUser(){
    return this.http.get<Array<User>>(this.rootURL + "/User_details");
  }

  saveUser(user: User){
    return this.http.post<User>(this.rootURL + "/User_details", user);
  }

  getUserByID(id: number|undefined) {
    return this.http.get<User>(this.rootURL + `/User_details/${id}`);
  }

  updateUserById(userId: number, userdata: User) {
    return this.http.put(this.rootURL + `/User_details/${userId}`, userdata);
  }

  deleteUserById(id: number) {
    return this.http.delete(this.rootURL + `/User_details/${id}`);
  }

}
