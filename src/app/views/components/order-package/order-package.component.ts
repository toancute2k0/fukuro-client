import { Component, OnInit } from '@angular/core';
import { PremiumService } from 'src/app/models/premium-service.model';
import { PremiumServiceService } from 'src/app/services/premium-service.service';

@Component({
  selector: 'app-order-package',
  templateUrl: './order-package.component.html',
  styleUrls: ['./order-package.component.css'],
})
export class OrderPackageComponent implements OnInit {
  premium?: PremiumService[];
  constructor(private premiumSer: PremiumServiceService) {}

  ngOnInit(): void {
    this.premiumSer.getAllLatest('3').subscribe(
      (data: any | undefined) => {
        this.premium = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
