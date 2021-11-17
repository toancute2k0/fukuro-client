import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental-manage',
  templateUrl: './rental-manage.component.html',
  styleUrls: ['./rental-manage.component.css']
})
export class RentalManageComponent implements OnInit {

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
