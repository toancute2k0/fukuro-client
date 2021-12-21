import { Component, OnInit } from '@angular/core';
import { CustomerContacts } from 'src/app/models/customer-contacts.model';
import { CustomerContactsService } from 'src/app/services/customer-contacts.service';

@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.css'],
})
export class CustomerContactsComponent implements OnInit {
  limit = 6;
  customerContacts?: CustomerContacts[];

  constructor(private customerContactsService: CustomerContactsService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');
    if (id) {
      this.getById(id);
    }
  }

  getById(id: string): void {
    this.customerContactsService.getByCustomerId(id, this.limit).subscribe((res: any | undefined) => {
      if(res['count'] > this.limit){
        this.customerContactsService.getByCustomerId(id, this.limit).subscribe((data: any | undefined) => {
          this.customerContacts = data['rows'];
        });
      }else{
        this.customerContacts = res['rows'];
      }
    });
  }

  openFilterSearch() {
    let textArea = document.getElementById(
      'filter_search'
    ) as HTMLTextAreaElement;
    if (textArea.style.display == 'none') {
      textArea.style.display = 'block';
    } else {
      textArea.style.display = 'none';
    }
  }
}
