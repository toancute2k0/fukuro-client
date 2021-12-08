import { Component, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-questions-and-answers-list',
  templateUrl: './questions-and-answers-list.component.html',
  styleUrls: ['./questions-and-answers-list.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class QuestionsAndAnswersListComponent implements OnInit {
  cat?: BlogCategories[];
  constructor(config: NgbModalConfig, private modalService: NgbModal, private catBlogs: BlogCategoriesService,private route: ActivatedRoute,) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content:any) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.catBlogs.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
  }

}
