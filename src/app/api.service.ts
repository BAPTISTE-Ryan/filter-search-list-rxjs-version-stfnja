import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, filter } from 'rxjs/operators';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { IUser } from './user';

@Injectable()
export class ApiService {
  url: string;
  private data: any = [];
  globallistvalue: any;
  myObservable1: any;
  users$: Observable<IUser[]>;

  constructor(private http: HttpClient) {
    this.url = `https://jsonplaceholder.typicode.com/users`;
  }

  storageObservable(name: string): Observable<any> {
    const myObservable = new Observable((observer) => {
      observer.next(name);
    });
    myObservable.subscribe({
      next: (name) => console.log(name),
    });
    return myObservable;
  }

  getUsers(): Observable<any> {
    this.http.get(this.url).subscribe((r) => {
      var stringify = '[';
      for (var i in r) {
        stringify += JSON.stringify(r[i]);
        stringify += ',';
      }
      var p = r[1];
      p.name = 'Nouveau Nomen';
      p.username = 'newName';
      console.log(p);
      var o = JSON.stringify(p);
      stringify += o + ',';
      stringify = stringify.slice(0, stringify.length - 1);
      stringify += ']';
      localStorage.setItem('testJSON', stringify);
      this.storageObservable(stringify);
      this.deleteUsers("Leanne Graham");
    });

    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);
    const myObservable = new Observable((observer) => {
      observer.next(obj);
    });
    myObservable.subscribe({
      next: (value) => console.log(value),
    });
    this.deleteUsers('graham');

    return myObservable;
  }
  //////////////////
  logUsers(): Observable<any> {
    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);
    const myObservable = new Observable((observer) => {
      observer.next(obj);
    });
    myObservable.subscribe({
      next: (value) => value,
    });

    return myObservable;
  }
  ////////////////

  //refactor using user interface
  addUsers(name: string): Observable<any> {
    this.http.get(this.url).subscribe((r) => {
      let text = localStorage.getItem('testJSON');
      text = text.slice(0, text.length - 1);
      var p = r[1];
      p.name = name;
      console.log(p);
      var o = JSON.stringify(p);
      text = text + ',' + o;
      text += ']';
      //console.log(text);
      localStorage.setItem('testJSON', text);
      this.globallistvalue = this.storageObservable(text);
    });
    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);
    this.myObservable1 = new Observable((observer) => {
      observer.next(obj);
    });
    this.myObservable1.subscribe({
      next: (value) => value,
    });

    console.log('===================');
    //this.globallistvalue.subscribe();
    console.log('===================');
    return this.myObservable1;
  }

  deleteUsers(value: string): Observable<any> {
    this.http.get(this.url).subscribe((r) => {
      let text = localStorage.getItem('testJSON');
      let obj = JSON.parse(text);
      console.log(obj[5-1].id);
      obj.
      let stringify;

      //this.users$=obj.subscribe();
      /*
      let oo=this.users$.pipe(
        map((users: IUser[]) => {
          return users.filter(
            (user: IUser) =>
              user.name.toLowerCase().indexOf(value.toLowerCase()) > -1
          );
        })
      );

console.log(oo);
      for (var i in oo) {
        stringify += JSON.stringify(oo[i]);
        stringify += ',';
      }
*/

      ////
      text = text.slice(0, text.length - 1);
      var p = r[1];
      p.name = name;
      console.log(p);
      var o = JSON.stringify(p);
      text = text + ',' + o;
      text += ']';

      //console.log(text);
      localStorage.setItem('testJSON', text);
      this.globallistvalue = this.storageObservable(text);
    });
    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);
    this.myObservable1 = new Observable((observer) => {
      observer.next(obj);
    });
    this.myObservable1.subscribe({
      next: (value) => value,
    });
    console.log('===================');
    //this.globallistvalue.subscribe();
    console.log('===================');
    return this.myObservable1;
  }
}
