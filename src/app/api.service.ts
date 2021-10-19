import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  url: string;
  private data: any = [];

  constructor(private http: HttpClient) {
    this.url = `https://jsonplaceholder.typicode.com/users`;
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

  addUsers(name: string): Observable<any> {
    this.http.get(this.url).subscribe((r) => {
      let text = localStorage.getItem('testJSON');
      text = text.slice(0, text.length - 1);
      var p = r[1];
      p.name = name;
      console.log(p);
      var o = JSON.stringify(p);
      text = text+","+ o;
      text += ']';
      console.log(text);
      localStorage.setItem('testJSON', text);
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

  deleteUsers(): Observable<any> {
    return this.http.get(this.url);
  }
}
