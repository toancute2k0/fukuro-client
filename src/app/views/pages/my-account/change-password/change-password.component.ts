import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openFilterSearch()
  {
    let textArea =(document.getElementById('filter_search') as HTMLTextAreaElement)
    if(textArea.style.display =='none')
    {
      textArea.style.display ='block'
    }
    else
    {
      textArea.style.display ='none'
    }
  }
}
