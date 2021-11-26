import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css'],
})
export class LatestNewsComponent implements OnInit {
  blogs?: Blogs[];
  constructor(private blogSer: BlogsService) {}

  ngOnInit(): void {
    this.blogSer.getLatest().subscribe(
      (data: any | undefined) => {
        this.blogs = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
