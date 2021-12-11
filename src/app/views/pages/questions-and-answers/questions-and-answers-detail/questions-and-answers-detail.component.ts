import { Component, OnInit } from '@angular/core';
import {NgbModalConfig, NgbModal, NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-questions-and-answers-detail',
  templateUrl: './questions-and-answers-detail.component.html',
  styleUrls: ['./questions-and-answers-detail.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbCollapse]
})
export class QuestionsAndAnswersDetailComponent implements OnInit {
  cat?: BlogCategories[];
  public isCollapsed: any;
  public isCollapsed2: any;
  constructor(config: NgbModalConfig,
              private modalService: NgbModal,
              private catBlogs: BlogCategoriesService,private route: ActivatedRoute,
  public ngbCollapse: NgbCollapse,
  public fb: FormBuilder,) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
 
  //summernote editer
  config = {
    placeholder: '',
    tabsize: 2,
    height: 120,
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };

  open(content:any) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    const slug = this.route.snapshot.paramMap.get('slug');
    this.catBlogs.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
  }

}
