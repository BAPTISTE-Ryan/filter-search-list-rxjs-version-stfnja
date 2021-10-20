import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppComponent } from './app.component';
@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent implements OnChanges {
  @Input() name: string;

  ngOnChanges(change: SimpleChanges) {
  
    let a:AppComponent;
   
      console.log(change['name']);
    
  }
}
