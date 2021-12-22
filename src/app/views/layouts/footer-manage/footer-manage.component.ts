import { Component, OnInit } from '@angular/core';
import {BlogCategories} from "../../../models/blog-categories.model";
import {BlogCategoriesService} from "../../../services/blog-categories.service";
import {QuestionCategories} from "../../../models/question-cat.model";
import {QuestionCategoriesService} from "../../../services/question-cate.service";

@Component({
  selector: 'app-footer-manage',
  templateUrl: './footer-manage.component.html',
  styleUrls: ['./footer-manage.component.css']
})
export class FooterManageComponent implements OnInit {

  cat?: BlogCategories[];
  currentYear: number=new Date().getFullYear();
  catqts?: QuestionCategories[];

  constructor(
    private catBlogs: BlogCategoriesService,
    private catQuestions: QuestionCategoriesService,
  ) { }

  ngOnInit(): void {
    this.catBlogs.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
    this.catQuestions.getAllCat().subscribe((data: any | undefined) => {
      this.catqts = data['rows'];
    });
  }

}
