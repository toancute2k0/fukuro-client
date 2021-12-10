import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogsService } from 'src/app/services/blogs.service';
import { environment } from 'src/environments/environment';

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
        for (var i = 0; i < data['rows'].length; i++) {
          data['rows'][i].thumbnail = environment.linkImg+data['rows'][i].thumbnail;
        }
        this.blogs = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
