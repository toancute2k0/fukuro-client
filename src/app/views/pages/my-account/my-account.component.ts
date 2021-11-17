import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  template: ` <router-outlet></router-outlet> `,
})
export class MyAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
