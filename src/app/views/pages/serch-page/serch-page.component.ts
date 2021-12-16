import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-serch-page',
  templateUrl: './serch-page.component.html',
  styleUrls: ['./serch-page.component.css']
})
export class SerchPageComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

}
