import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, filter } from 'rxjs/operators';

import { AsyncSubject, Observable, Subject } from 'rxjs';
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

  //var subject =new AsyncSubject();

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
    let texte = localStorage.getItem('testJSON');
    let obje = JSON.parse(texte);
    console.log('f');
    console.log(this.storageObservable(obje).subscribe);
    console.log('f');
    this.http.get(this.url).subscribe((r) => {
      var stringify = '[';
      for (var i in r) {
        /*      subject.next(r[i]);
         */ stringify += JSON.stringify(r[i]);
        stringify += ',';
      }
      var p = r[0];
      p.name = 'Nouveau Nomen';
      p.username = 'newName';
      console.log(p);
      var o = JSON.stringify(p);
      stringify += o + ',';
      stringify = stringify.slice(0, stringify.length - 1);
      stringify += ']';
      localStorage.setItem('testJSON', stringify);
      /*subject.subscribe({
        next:(response){
          console.log(response);
        }
      });*/
    });

    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);
    const myObservable = new Observable((observer) => {
      observer.next(obj);
    });
    myObservable.subscribe({
      next: (value) => console.log(value),
    });

    return myObservable;
  }
  //////////////////
  logUsers(): Observable<any> {
    // old way using localstorage
    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);
    //saving the array into an observable
    const myObservable = new Observable((observer) => {
      observer.next(obj);
    });
    //retrieving the data 
    myObservable.subscribe({
      next: (value) => value
    });

    return myObservable;
  }
  ////////////////

  //refactor using user interface
  addUsers(name: string): Observable<any> {
    this.http.get(this.url).subscribe((r) => {
      let text = localStorage.getItem('testJSON');
      text = text.slice(0, text.length - 1);
      var p = r[0];
      p.name = name;
      console.log(p);
      var o = JSON.stringify(p);
      text = text + ',' + o;
      text += ']';
      //console.log(text);
      localStorage.setItem('testJSON', text);
    });
    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);

    this.myObservable1 = new Observable((observer) => {
      observer.next(obj);
    });

    this.myObservable1.subscribe({
      next: (value) => console.log(value[0]),
    });

    return this.myObservable1;
  }

  deleteUsers(value: string): Observable<any> {
    let stringify = '';
    this.http.get(this.url).subscribe((r) => {
      let text = localStorage.getItem('testJSON');
      let obj = JSON.parse(text);
      console.log(obj[0].name);
      console.log(value == obj[0].name);

      stringify += '[';
      for (var i in obj) {
        if (obj[i].name != value) {
          stringify += JSON.stringify(obj[i]);
          stringify += ',';
        }
      }
      stringify = stringify.slice(0, stringify.length - 1);
      stringify += ']';
      console.log('stringify');
      console.log(stringify);
      localStorage.setItem('testJSON', stringify);
    });
    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);
    this.myObservable1 = new Observable((observer) => {
      observer.next(obj);
    });
    this.myObservable1.subscribe({
      next: (value) => console.log(value[0])
    });
    console.log('===================');
    //this.globallistvalue.subscribe();
    console.log('===================');
    return this.myObservable1;
  }
  deleteUsers2(value: string): Observable<any> {
    let stringify = '';
    this.myObservable1.subscribe((obj) => {
      console.log(obj[0].name);
      console.log(value == obj[0].name);

      stringify += '[';
      for (var i in obj) {
        if (obj[i].name != value) {
          stringify += JSON.stringify(obj[i]);
          stringify += ',';
        }
      }
      stringify = stringify.slice(0, stringify.length - 1);
      stringify += ']';
      console.log('stringify');
      console.log(stringify);
      localStorage.setItem('testJSON', stringify);
    });
    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);
    this.myObservable1 = new Observable((observer) => {
      observer.next(obj);
    });
    this.myObservable1.subscribe({
      next: (value) => console.log(value)
    });
    console.log('===================');
    //this.globallistvalue.subscribe();
    console.log('===================');
    return this.myObservable1;
  }
}
