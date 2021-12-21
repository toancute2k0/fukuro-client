import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { PremiumServiceService } from 'src/app/services/premium-service.service';
import { CustomerPremiumServicesService } from 'src/app/services/customer-premium-services.service';

@Component({
  selector: 'app-manage-premiums',
  templateUrl: './manage-premiums.component.html',
  styleUrls: ['./manage-premiums.component.css'],
})
export class ManagePremiumsComponent implements OnInit {
  premiumBill: any = [];
  customerPremiumServices: any = [];
  premium?: string;
  limit = 6;
  id: any;

  constructor(
    private premiumServiceService: PremiumServiceService,
    private activatedRoute: ActivatedRoute,
    private customSer: CustomersService,
    private customerPremiumServicesService: CustomerPremiumServicesService
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    this.getData();
  }

  getData(): void {
    this.customerPremiumServicesService.getByCustomerId(this.id, this.limit).subscribe((data: any | undefined) => {
      if (data['count'] > this.limit) {
        this.customerPremiumServicesService.getByCustomerId(this.id, data['count']).subscribe((res: any | undefined) => {
          this.customerPremiumServices = res['rows'];
        });
      }
      this.customerPremiumServices = data['rows'];
      console.log(this.customerPremiumServices);
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
