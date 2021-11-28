import { Component, OnInit } from '@angular/core';
import { RentalNews } from 'src/app/models/rental-news.model';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-rental-manage',
  templateUrl: './rental-manage.component.html',
  styleUrls: ['./rental-manage.component.css'],
})
export class RentalManageComponent implements OnInit {
  linkImg = environment.linkImg;
  rental?: RentalNews[];
  id: any;
  constructor(private rentalNewsService: RentalNewsService) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    this.getRentalNews();
  }
  getRentalNews(): void {
    this.rentalNewsService.getfindByCustomerId(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.rental = data['rows'];
        for (var i = 0; i < data['rows'].length; i++) {
          data['rows'][i].image = JSON.parse(data['rows'][i].image);
          data['rows'][i].image = data['rows'][i].image[0];
        }
      },
      (err) => {
        console.log(err);
      }
    );
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
