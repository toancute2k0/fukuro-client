import { Component, OnInit } from '@angular/core';
import {BlogCategories} from "../../../models/blog-categories.model";
import {BlogCategoriesService} from "../../../services/blog-categories.service";

@Component({
  selector: 'app-footer-manage',
  templateUrl: './footer-manage.component.html',
  styleUrls: ['./footer-manage.component.css']
})
export class FooterManageComponent implements OnInit {

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
