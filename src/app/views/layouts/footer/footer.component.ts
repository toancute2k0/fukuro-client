import { Component, OnInit } from '@angular/core';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { QuestionCategories } from 'src/app/models/question-cat.model';
import {QuestionCategoriesService} from 'src/app/services/question-cate.service'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  cat?: BlogCategories[];
  catqts?: QuestionCategories[];
  currentYear: number=new Date().getFullYear();

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
