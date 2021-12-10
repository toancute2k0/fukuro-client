import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-motels-manage-list',
  templateUrl: './motels-manage-list.component.html',
  styleUrls: ['./motels-manage-list.component.css'],
})
export class MotelsManageListComponent implements OnInit {
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
        title: 'Tên trọ'
      },
      username: {
        title: 'Số phòng'
      },
      address: {
        title: 'Địa chỉ'
      },
      customerId: {
        title: 'Tên chủ trọ'
      },
      email: {
        title: 'Email'
      },
      phone: {
        title: 'Số điện thoại'
      }
    },
  }

  data = [];

  constructor(private _router: Router) { }

  ngOnInit(): void {

  }

  onCustomAction(event: any) {
    if(event.action == 'edit'){
      this._router.navigate(['/manage/motels/edit/'+event.data['id']]);
    }
    if(event.action == 'delete'){
     window.confirm('Bạn có chắn chắn sẽ xoá không?');
    }
  }

}
