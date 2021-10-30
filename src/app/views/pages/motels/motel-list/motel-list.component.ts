import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-motel-list',
  templateUrl: './motel-list.component.html',
  styleUrls: ['./motel-list.component.css'],
})
export class MotelListComponent implements OnInit {
  imagesList = [
    'assets/img/room/p-1.jpg',
    'assets/img/room/p-2.jpg',
    'assets/img/room/p-3.jpg',
    'assets/img/room/p-4.jpg',
    'assets/img/room/p-5.jpg',
    'assets/img/room/p-6.jpg',
    'assets/img/room/p-7.jpg',
  ];

  constructor() {}

  ngOnInit(): void {}
}
