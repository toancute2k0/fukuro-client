import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-manage',
  templateUrl: './footer-manage.component.html',
  styleUrls: ['./footer-manage.component.css']
})
export class FooterManageComponent implements OnInit {

  currentYear: number=new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
