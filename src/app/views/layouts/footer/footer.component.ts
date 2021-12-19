import { Component, OnInit } from '@angular/core';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogCategories } from 'src/app/models/blog-categories.model';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  cat?: BlogCategories[];
  currentYear: number=new Date().getFullYear();

  constructor(
    private catBlogs: BlogCategoriesService,
  ) { }

  ngOnInit(): void {
    this.catBlogs.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
  }

}
