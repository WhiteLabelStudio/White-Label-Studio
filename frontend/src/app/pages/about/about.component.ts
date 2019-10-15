import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'about',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
