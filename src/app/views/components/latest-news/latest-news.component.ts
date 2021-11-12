import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css'],
})
export class LatestNewsComponent implements OnInit {
  Blog = [
    {
      id: '1',
      name: 'Kinh nghiệm tìm phòng trọ: bẫy lừa đảo khi thuê phòng sinh viên cần chú ý',
      summary:
        'Thị trường phòng trọ phát triển, các bạn sinh viên sẽ có thể dễ dàng tìm phòng',
      image: 'http://localhost:4200/assets/img/blog/1636117193887-blog.jpg',
      created_at: '30 tháng 10 2021',
    },
    {
      id: '2',
      name: 'Nắm vững 5 mẹo này bạn sẽ nấu ăn ngon không kém gì đầu bếp nhà hàng',
      summary:
        'Đây là những thao tác nấu nướng cơ bản mà đầu bếp giỏi nào cũng biết – học nó, bạn sẽ nâng cấp các món bình thường.',
      image: 'http://localhost:4200/assets/img/blog/1628836217423-blog.jpg',
      created_at: '30 tháng 10 2021',
    },
    {
      id: '3',
      name: '5 thói quen giúp phụ nữ ít bệnh tật, sống thêm 14 tuổi',
      summary:
        'Hãy tuân thủ 5 thói quen đơn giản sau đây vì chúng có thể giúp bạn phòng ngừa nhiều bệnh mãn tính nguy hiểm, từ đó kéo dài tuổi thọ.',
      image: 'http://localhost:4200/assets/img/blog/1628836140232-blog.jpeg',
      created_at: '30 tháng 10 2021',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
