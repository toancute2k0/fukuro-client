import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-questions-and-answers-list',
  templateUrl: './questions-and-answers-list.component.html',
  styleUrls: ['./questions-and-answers-list.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class QuestionsAndAnswersListComponent implements OnInit {


  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content:any) {
    this.modalService.open(content);
  }
  ngOnInit(): void {

  }
}
