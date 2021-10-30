### PHÂN TÍCH CÔNG VIỆC

# \*\*\* 1. Setup và các câu lệnh:

- npm i -g @angular/cli: cài đặc cli
- ng new my-app
- ng serve ( thêm -o auto mở tab)
- ng serve --port=9000
- file setup trong angular.json: thêm script, style...
- ng g c name-folder/name : tạo component
- ng g c tên folder/ten compo --skip-tests=true : tạo compo nhưng bỏ qua file spec( là file để test có thể bỏ) hoặc import vào global. <br>
  {
  "schematics": {
  "@schematics/angular:component": {
  "skipTests": true
  }}} -> thêm file angular.json local bỏ spec <br>
- ng g s services/data: tạo file chứa biến toàn cục
- ng g m components/blog --route components/blog --module app.module ->
  lệnh tạo Module components/blog chứa component và routing Child(tạo thêm component blog/list và blog/details) đã setup sẵn
  nhớ xoá file html và css của thằng Blog cho gọn. Vào AppRoutingModule sửa cái path lại thành path: bai-viet chẳng hạn. vào
  blog.routing.module.ts thêm vào route của tụi list và show. <br>
- ng g m name-folder/name-module: tạo modules

# \*\*\* 2. Mô tả cấu trúc thư mục:

- **---Src** <br>
  - **---App** <br>
    - **---Models** : type dữ liệu <br>
    ```
    ng generate class models/name-models --type=model --skip-tests=true
    ```
    - **---Services** : get data ()<br>
    ```
    ng g m services/name-services --skip-tests=true
    ```
    - **---Views** <br>
      - **---Pages** : 2 loại cái nào 1 trang thì xài câu lệnh tạo component, nhiều trang con như blog, products, motels... sd câu lệnh 2-> sau đó chạy câu lệnh 3 tạo component các trang con list, details... <br>
      ```
      1. ng g c views/pages/name-page
      2. ng g m views/pages/blogs --route views/pages/blogs --module app.module
      3. ng g c views/pages/blogs/blogDetails
      ```
      - **---Components** : tạo (1) -> vào **component.modules.ts** import tên components vào export(để cho các modules khác sử dụng) -> các modules khác (App, Blog, Motels...) muốn xài thì mở name.modules.ts thêm **Components** vào import. bên html xài bình thường <br>
      ```
      (1). ng g c views/components/name-components
      ```
      - **---Layouts** : thì tạo file components bình thường<br>
      ```
      ng g c views/layouts/name-layouts
      ```
  - **---Assets** : file css, js, img... <br>
  - **---index.html** : root <br>
  - **---angular.json** <br>

# \*\*\* 3. Gắn Layout xong chờ Update:

- Cập nhật Logo.
- ☑ Header.
- ☑ Footer( chưa sửa nội dung).
- ☑ Trang Chủ.
- ☑ Đăng kí/Đăng nhập.
- ☑ Danh sách cho thuê.
- ☑ Trang đăng bài.
- ☑ Trang Blog.
- ☑ Liên hệ.
- Chi tiết bài viết.
- Chi tiết cho thuê.
- Về chúng tôi

# \*\*\* 4. Lưu ý:

- Vụ load js file custom.js: angular load trang theo SPA html->css->js, nên mỗi lần load chỉ load được js của 1 page hiện tại, khi click chuyển page thì js đó ko nhận, phải load lại mới nhận.
- Xem lại Login, Register là theo Modal hay tách page riêng.
- Button tìm kiếm: suy nghĩ chắc sửa thành Modal như trang Mogi
- Trang danh sách cho thuê: Tạm thời full with -> sau update sửa thành.

* Bên trái (col-lg-8 col-md-8 col-sm-12): show list trọ
* Bên phải (col-lg-4 col-md-4 col-sm-12): có thể đặc banner quảng cáo, thống kê số lượng cho thuê mỗi khu vực, Bài viết mới... tham khảo trang Mogi.vn nhưng cũng còn tuỳ à.

- Cập nhật sự kiện nút show Gird kế Show All trang thue-nha-dat
