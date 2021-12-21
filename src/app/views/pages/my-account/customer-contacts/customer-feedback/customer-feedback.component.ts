import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerContactsService } from 'src/app/services/customer-contacts.service';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.css'],
})
  export class CustomerFeedbackComponent implements OnInit {
  submitted = false;

  customerContact: any = [];

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

  constructor(
    private customerContactsService: CustomerContactsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  feedback = this.fb.group({
    subject: ['', Validators.compose([Validators.required])],
    message: ['', Validators.compose([Validators.required])],
    email: [''],
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.getId(id);
  }

  get f() {
    return this.feedback.controls;
  }

  getId(id: string): void {
    this.customerContactsService.get(id).subscribe((res: any | undefined) => {
      this.customerContact = res;
    });
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

  onSubmit(): any {
    this.submitted = true;

    // return validators
    if (this.feedback.invalid) {
      return false;
    }
    const data = {
      subject:this.feedback.value['subject'],
      message: this.feedback.value['message'],
      email: this.customerContact.email,
    };
    this.feedback.value['email'] = this.customerContact.email;
    this.customerContactsService.requestContact( this.customerContact.id, data).subscribe(
      (res) => {
        this.router.navigate([`/my-account/customer-contacts`]);
        this.toastrService.success(res.message);
      },
      (error) => {
        this.toastrService.error(error.message);
      }
    );
  }
}
