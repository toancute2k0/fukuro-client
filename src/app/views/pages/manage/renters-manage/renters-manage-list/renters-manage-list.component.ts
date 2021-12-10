import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-renters-manage-list',
  templateUrl: './renters-manage-list.component.html',
  styleUrls: ['./renters-manage-list.component.css'],
})
export class RentersManageListComponent implements OnInit {
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
        title: 'Họ và tên'
      },
      email: {
        title: 'Email'
      },
      phone: {
        title: 'SĐT'
      },
      address: {
        title: 'Địa chỉ'
      },
      motelName: {
        title: 'Tên nhà trọ'
      },
      roomName: {
        title: 'Tên phòng'
      }
    },
  }

  data = [];

  constructor(private _router: Router) { }

  ngOnInit(): void {

  }

  onCustomAction(event: any) {
    if(event.action == 'edit'){
      this._router.navigate(['/manage/renters/edit/'+event.data['id']]);
    }
    if(event.action == 'delete'){
      window.confirm('Bạn có chắn chắn sẽ xoá không?');
    }
  }

}
