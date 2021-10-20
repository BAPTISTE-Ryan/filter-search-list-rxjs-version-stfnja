import {
  Component,
  OnChanges,
  Input,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from './api.service';
import { IUser } from './user';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  users$: Observable<IUser[]>;
  filteredUsers$: Observable<IUser[]>;
  globalinput = null;
  iterniumber: number;
  stringValue: string;
  dataarr: any;
  @Input() nameo: string;

  constructor(private api: ApiService, private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('onChanges');
    console.log(changes['nameo']);
  }
  ngOnInit() {
    this.iterniumber = 0;
    this.users$ = this.api.getUsers();
    this.filteredUsers$ = this.users$;
    this.iterniumber = 1;
  }
  showHide(user: IUser) {
    // for each user we can add a property of show and use this as
    // a boolean flag to turn each one on/off for a list of any size
    user.show = !user.show;
  }
  /////////////////////////////////////////////////////////////////////////////
  addUsers() {
    var value = this.globalinput;
    if (value) {this.users$ = this.api.addUsers(value);}
    this.filteredUsers$ = this.users$;
    this.cd.detectChanges();
  }
  ////////////////////////////////////////////////////////////////////////////

  debug() {
    console.log(this.dataarr);
    console.log(this.filteredUsers$.subscribe);
  }
  deleteUsers() {
    this.api.logUsers();
    var value = this.globalinput;
    this.users$ = this.api.deleteUsers(value);
    this.users$ = null;
    console.log('this.users$');
    console.log(this.users$);
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
