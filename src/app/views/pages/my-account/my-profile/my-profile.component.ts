import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

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
