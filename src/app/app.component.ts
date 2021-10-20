import { Component, OnChanges,Input, OnInit, SimpleChange,DoCheck, SimpleChanges } from '@angular/core';
import { ApiService } from './api.service';
import { IUser } from './user';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnChanges {
  users$: Observable<IUser[]>;
  filteredUsers$: Observable<IUser[]>;
  globalinput = null;
  @Input() iterniumber :number;

  constructor(private api: ApiService) {}
  
  ngOnChanges(changes: SimpleChanges) {

    console.log(changes.user$.currentValue);
    console.log(changes.filteredUsers$.currentValue);
    console.log('onChanges');
    console.log(changes);
  }
  ngOnInit() {
   this.iterniumber=1;
    this.users$ = this.api.getUsers();
    this.filteredUsers$ = this.users$;
  }
  showHide(user: IUser) {
    // for each user we can add a property of show and use this as
    // a boolean flag to turn each one on/off for a list of any size
    user.show = !user.show;
  }
  /////////////////////////////////////////////////////////////////////////////
  addUsers() {
    var value = this.globalinput;
    if (value) {
      this.users$ = this.api.addUsers(value);
    }
    this.filteredUsers$ = this.users$;
  }
  ////////////////////////////////////////////////////////////////////////////
  deleteUsers() {
    var value = this.globalinput;
    this.users$ = this.api.deleteUsers(value);
  }
  ////////////////////////////////////////////////////////////////////////////
  search(value: string) {
    if (value) {
      this.filteredUsers$ = this.users$.pipe(
        // the stream is of a single item that is of type array
        // map(user => user.name) would not work because it is not // a stream of items inside the array
        map((users: IUser[]) => {
          // inside the map we use the native Array.prototype.filter() method to filter down the results by name
          return users.filter(
            (user: IUser) =>
              user.name.toLowerCase().indexOf(value.toLowerCase()) > -1
          );
        })
      );
    } else {
      // reload the full data set
      this.filteredUsers$ = this.users$;
    }
    this.globalinput = value;
  }

  search2() {
   // console.clear();
    this.iterniumber += 1;
    console.log('search' + this.iterniumber);
    var value = this.globalinput;

    this.api.logUsers().subscribe();
    if (value) {
      let userlocal = this.api.addUsers(value);
      this.filteredUsers$ = this.users$;
      ///////////
      this.filteredUsers$ = userlocal.pipe(
        map((users: IUser[]) => {
          return users.filter(
            (user: IUser) =>
              user.name.toLowerCase().indexOf(value.toLowerCase()) > -1
          );
        })
      );
      ///////////////
    } else {
      this.filteredUsers$ = this.users$;
    }

    this.globalinput = value;
  }
}
