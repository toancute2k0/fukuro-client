import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

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
