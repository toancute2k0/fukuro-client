import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerContactsService } from 'src/app/services/customer-contacts.service';

@Component({
  selector: 'app-customer-contact-details',
  templateUrl: './customer-contact-details.component.html',
  styleUrls: ['./customer-contact-details.component.css'],
})
  export class CustomerContactDetailsComponent implements OnInit {
  customerContact: any = [];

  constructor(
    private customerContactsService: CustomerContactsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.getId(id);
  }

  getId(id: string): void {
    this.customerContactsService.get(id).subscribe((res: any | undefined) => {
      this.customerContact = res;
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
