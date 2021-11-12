import { Component, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cat?: BlogCategories[];
  constructor(private catBlogs: BlogCategoriesService) {}

  ngOnInit(): void {
    this.catBlogs.getAllCat().subscribe((res) => {
      this.cat = res;
    });
  }
}
