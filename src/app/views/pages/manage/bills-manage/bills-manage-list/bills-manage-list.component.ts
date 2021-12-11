import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-bills-manage-list',
  templateUrl: './bills-manage-list.component.html',
  styleUrls: ['./bills-manage-list.component.css'],
})
export class BillsManageListComponent implements OnInit {
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
        title: 'Tên hoá đơn'
      },
      priceRoom: {
        title: 'Giá tiền phòng'
      },
      eletricPrice: {
        title: 'Tiền điện'
      },
      waterPrice: {
        title: 'Tiền nước'
      },
      internetPrice: {
        title: 'Tiền Internet'
      },
      discountPrice: {
        title: 'Giảm giá'
      },
      amount: {
        title: 'Tổng tiền'
      },
      nameRenter: {
        title: 'Tên người thuê'
      }
    },
  }

  data = [];

  constructor(private _router: Router) { }

  ngOnInit(): void {

  }
  onCustomAction(event: any) {
    if(event.action == 'edit'){
      this._router.navigate(['/manage/bills/edit/'+event.data['id']]);
    }
    if(event.action == 'delete'){
      window.confirm('Bạn có chắn chắn sẽ xoá không?');
    }
  }
}
