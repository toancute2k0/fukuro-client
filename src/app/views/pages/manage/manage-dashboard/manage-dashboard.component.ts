import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-dashboard',
  templateUrl: './manage-dashboard.component.html',
  styleUrls: ['./manage-dashboard.component.scss'],
})
export class ManageDashboardComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Hệ thống quản lý trọ');
  }

  ngOnInit(): void {}
}
