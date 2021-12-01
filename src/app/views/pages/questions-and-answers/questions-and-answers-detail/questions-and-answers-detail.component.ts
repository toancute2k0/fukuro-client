import { Component, OnInit } from '@angular/core';
import {NgbModalConfig, NgbModal, NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-questions-and-answers-detail',
  templateUrl: './questions-and-answers-detail.component.html',
  styleUrls: ['./questions-and-answers-detail.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbCollapse]
})
export class QuestionsAndAnswersDetailComponent implements OnInit {
  public isCollapsed: any;
  public isCollapsed2: any;
  constructor(config: NgbModalConfig,
              private modalService: NgbModal,
  public ngbCollapse: NgbCollapse) {
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
  }
}
