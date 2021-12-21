import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';
import { CustomersService } from 'src/app/services/customers.service';
import {ToastrService} from "ngx-toastr";
import {Router} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  limit = 6;
  notification?: Notification[];
  id: any;
  count: any;
  status = 'both';
  constructor(
    private notificationService: NotificationService,
    private toastrService: ToastrService,
    private _router: Router,
    private customersService: CustomersService
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    if (this.id) {
      this.getById();
      this.countNew();
    }
  }
  getById(): void {
    this.notificationService.getByCustomerId(this.id, this.limit, this.status).subscribe((res: any | undefined) => {
      if (res['count'] > this.limit) {
        this.notificationService.getByCustomerId(this.id, this.limit, this.status).subscribe((data: any | undefined) => {
          this.notification = data['rows'];
          this.count = data['count'];
        });
      } else {
        this.count = res['count'];
        this.notification = res['rows'];
      }
    });
  }

  countNew(){
    this.notificationService.getByCustomerId(this.id, this.limit, 0).subscribe((res: any | undefined) => {
      if (res['count'] > this.limit) {
        this.notificationService.getByCustomerId(this.id, this.limit, 0).subscribe((data: any | undefined) => {
          this.customersService.notifications$.next(res['count']);
        });
      } else {
        this.customersService.notifications$.next(res['count']);
      }
    });
  }

  update(data: any){
    const dataUpdate = {status: 1};
    if(data.status == 0){
      this.notificationService.update(data.id, dataUpdate).subscribe(
        (response) => {
          this.countNew();
          this._router.navigate([data.detailUrl]);
          this.getById();
        });
    }else{
      this._router.navigate([data.detailUrl]);
    }
  }

  deleteAllCusById(){
    if (window.confirm('Bạn có chắn chắn sẽ xoá tất cả không?')) {
      this.notificationService.deleteAll()
        .subscribe(
          response => {
            this.countNew();
            this.getById();
            this.toastrService.success(response.message);
          },
          error => {
            this.toastrService.success(error.message);
          });
    }
  }

  delete(id: any){
    if (window.confirm('Bạn có chắn chắn sẽ xoá không?')) {
      this.notificationService.delete(id)
        .subscribe(
          response => {
            this.countNew();
            this.getById();
            this.toastrService.success(response.message);
          },
          error => {
            this.toastrService.success(error.message);
          });
  }
  }

  openFilterSearch()
  {
    let textArea =(document.getElementById('filter_search') as HTMLTextAreaElement)
    if(textArea.style.display =='none')
    {
      textArea.style.display ='block'
    }
    else
    {
      textArea.style.display ='none'
    }
  }
}
