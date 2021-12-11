import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-rooms-manage-list',
  templateUrl: './rooms-manage-list.component.html',
  styleUrls: ['./rooms-manage-list.component.css'],
})
export class RoomsManageListComponent implements OnInit {
  settings = {
    actions: {
      custom: [
        {
          name: 'edit',
          title: `<i class="ti-pencil text-success" title="Edit"></i>`
        },
        {
          name: 'delete',
          title: `<i class="ti-trash text-danger" title="delete"></i>`
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      id: {
        title: 'STT'
      },
      name: {
        title: 'Tên phòng trọ'
      },
      price: {
        title: 'Giá phòng'
      },
      area: {
        title: 'Diện tích'
      },
      amountPeople: {
        title: 'Số người phù hợp'
      },
      renterName: {
        title: 'Tên người thuê'
      },
      endDate: {
        title: 'Ngày phòng sẽ trống'
      }
    },
  }

  data = [];

  source: LocalDataSource;

  constructor(private _router: Router) {
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit(): void {

  }

  onCustomAction(event: any) {
    if(event.action == 'edit'){
      this._router.navigate(['/manage/rooms/edit/'+event.data['id']]);
    }
    if(event.action == 'delete'){
      window.confirm('Bạn có chắn chắn sẽ xoá không?');
    }
  }
}
