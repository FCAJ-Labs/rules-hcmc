# Plan: Hướng dẫn nộp bài trên FCAJ Submission

## Mục tiêu

Bổ sung một luồng hướng dẫn riêng cho website `https://fcajsubmission.vercel.app/`, đồng thời làm rõ ranh giới giữa ba loại công việc:

- Mỗi cá nhân nộp báo cáo cá nhân và Workshop link trên FCAJ Portal.
- Trưởng nhóm/đại diện nhóm nộp một file `.md` và một file `.xml` trên FCAJ Submission.
- Các yêu cầu nội dung và tiêu chí đánh giá tiếp tục nằm ở Project và Scoring.

Không thay đổi barem điểm, logic của FCAJ Submission hoặc quy trình nộp Workshop hiện có ngoài việc bổ sung liên kết và làm rõ hai hệ thống độc lập.

## Phạm vi file

### Tạo mới

- `contents/(internship)/instructions/fcaj-submission.mdx`

### Cập nhật

- `contents/(internship)/instructions/meta.ts`: tổ chức bốn group con theo hành trình đọc, giữ nguyên route page.
- `contents/(internship)/instructions/(before-office)/meta.ts`: nhóm Chuẩn bị trước ngày đầu.
- `contents/(internship)/instructions/(travel)/meta.ts`: nhóm Di chuyển đến văn phòng.
- `contents/(internship)/instructions/(in-office)/meta.ts`: nhóm Trong ngày làm việc.
- `contents/(internship)/instructions/(completion)/meta.ts`: nhóm Nộp bài và hoàn tất thực tập.
- Di chuyển các page Instructions vào group folder có ngoặc đơn để không đổi URL.
- `contents/(internship)/instructions/index.mdx`: giữ CardGroup phẳng theo quyết định của người dùng; thêm callout và bảng trách nhiệm nộp bài ở đầu trang để phân luồng người đọc ngay từ điểm vào.
- `contents/(internship)/instructions/workshop.mdx`: giải thích Workshop link trên Portal và file nhóm trên FCAJ Submission là hai việc độc lập, kèm liên kết sang page mới.
- `contents/(internship)/scoring/index.mdx`: bỏ bảng trách nhiệm nộp bài khỏi Scoring, thay bằng liên kết ngắn về nguồn chính tại Instructions.
- `contents/(internship)/project/content.mdx`: ghi rõ phần nội dung dùng chung của nhóm và phần mỗi cá nhân phải tự viết; điều chỉnh mô tả Blogs để không mâu thuẫn với quy định nhóm có 3 bài dùng chung.

Không cập nhật `scoring/workshop.mdx` vì file này đã là nguồn chính của barem Proposal/Workshop và không cần chứa hướng dẫn thao tác upload.

## Bố cục page mới

### Frontmatter và vị trí navigation

- Title: `Hướng dẫn nộp bài trên FCAJ Submission`.
- Sidebar label: `Nộp bài FCAJ Submission`.
- Page hiển thị trong sidebar và search.
- Slug: `/instructions/fcaj-submission`.
- Nằm trong group `Nộp bài và hoàn tất thực tập`, sau `Nộp Workshop` và trước `Yêu cầu mộc thực tập`.

### Bốn group Instructions

- `Chuẩn bị trước ngày đầu`: `portal`, `register`, `uniform`, `document`.
- `Di chuyển đến văn phòng`: `parking`, `moving`.
- `Trong ngày làm việc`: `attendance`, `toilet`.
- `Nộp bài và hoàn tất thực tập`: `workshop`, `fcaj-submission`, `stamp`.

Các group con dùng tên folder có ngoặc đơn để giữ nguyên mọi URL hiện tại. Group hiện tại được mở theo cơ chế `navigation.sidebar.display: "group"`; các group không active được thu gọn để sidebar không quá dài.

### Nội dung theo thứ tự đọc

1. **Mục đích của FCAJ Submission**
    - Đây là hệ thống hỗ trợ chấm bài tự động.
    - Hoạt động độc lập với FCAJ Portal.
    - Không thay thế việc nộp Workshop link trên Portal.

2. **Callout `Cần nhớ`**
    - Chỉ trưởng nhóm/đại diện nhóm cần submit.
    - Mỗi nhóm nộp một `.md` và một `.xml`.
    - `.md` tối đa 2 MB; `.xml` tối đa 5 MB.
    - Cổng mở theo từng đợt thực tập và tự đóng theo thời gian quy định.
    - Tối đa 3 lần nộp.
    - Kiểm tra kỹ trước khi submit.

3. **Ai nộp ở đâu**
    - Bảng phân chia cá nhân, FCAJ Portal và FCAJ Submission.
    - Làm rõ thành viên có thể đăng nhập để xem nhưng không cần submit.

4. **Khi nào cổng mở**
    - Đợt thực tập 3 tháng mở cổng vào giữa kỳ.
    - Giữ ví dụ ngày bắt đầu 15/5 và mở ngày 15/7.
    - Không ghi một deadline cố định vì thời gian có thể theo từng đợt.

5. **Chuẩn bị file và thông tin**
    - File `.md` là summary kỹ thuật đầy đủ của Proposal/Workshop nhóm.
    - Năm phần bắt buộc: Problem Statement, Proposed Solution, End-to-End Workflow, Additional/Optional, Cost.
    - Additional/Optional không ảnh hưởng điểm.
    - `.md` không chèn hình ảnh.
    - `.xml` là AWS Architecture export từ app/web draw.io.
    - Dùng AWS icon package mới nhất.
    - Nhóm có từ 1 đến 5 thành viên.
    - Mỗi thành viên cần họ tên, mã số sinh viên và email.

6. **Phân chia nội dung nhóm và cá nhân**
    - Nhóm có thể dùng giống nhau cho Proposal, Workshop và Blogs.
    - Worklog, Events, Self-Evaluation và Sharing and Feedback phải do từng cá nhân tự viết và không giống hoàn toàn.
    - Liên kết sang `/project/content` để xem template đầy đủ.

7. **Quy trình đăng nhập và submit**
   Dùng `<Steps>` theo năm bước nghiệp vụ:
    - Truy cập trang và đăng nhập Google bằng ảnh `homepage.jpg`, `login1.jpg`, `login2.jpg`.
    - Nhận biết khu vực Lịch sử nộp và Nộp bài bằng `explain.jpg`.
    - Điền tên nhóm và thông tin thành viên.
    - Upload `.md` và `.xml` bằng `submission-tutorial.jpg`.
    - Kiểm tra toàn bộ và submit.

8. **Cần kiểm tra trước khi nộp**
    - Tên nhóm chính xác.
    - Đủ thành viên và thông tin thành viên.
    - `.md` đủ năm phần, không có hình ảnh, không quá 2 MB.
    - `.xml` là architecture hoàn chỉnh, đúng định dạng, không quá 5 MB.
    - Đây là bước quan trọng vì mỗi nhóm chỉ có tối đa 3 lần nộp.

9. **Theo dõi lịch sử và nộp lại**
    - Dùng `submission-history.jpg`.
    - Lịch sử chỉ phục vụ quan sát các lần nộp.
    - Chỉ trưởng nhóm được nộp lại.
    - Tối đa 3 lần nộp.
    - Cổng đóng theo thời gian quy định.
    - Nếu file vượt dung lượng, cần giảm dung lượng trước khi upload.

10. **Liên kết tham khảo**
    - `/instructions/workshop`: nộp Workshop link trên Portal.
    - `/project/content`: cấu trúc báo cáo và phân chia nội dung.
    - `/scoring/workshop`: barem Proposal/Workshop.

## Design pattern và UX

- Dùng văn phong hướng dẫn chuẩn, chủ thể rõ ràng là `sinh viên` hoặc `trưởng nhóm`, tránh văn nói.
- Dùng một Callout info màu tím cho các điều kiện không được bỏ sót.
- Đặt bảng trách nhiệm nộp bài tại `instructions/index.mdx` vì đây là điểm vào chung; Scoring chỉ liên kết về nguồn này để tránh hai bảng bị lệch nội dung.
- Dùng `:::note` cho thông tin phân biệt hai hệ thống và giải thích ngắn.
- Dùng `:::warning` ở bước cuối để nhắc kiểm tra trước khi submit.
- Dùng Steps cho thao tác có thứ tự; không đặt quy định chấm điểm dài trong page thao tác.
- Dùng bảng cho phân chia trách nhiệm để người đọc quét nhanh.
- Mỗi ảnh có alt text tiếng Việt mô tả đúng giao diện và mục đích.
- Giữ các ảnh hiện tại trong `assets/images/scoring/`, không đổi tên hoặc di chuyển ngoài phạm vi cần thiết.
- Dùng các từ khóa trong title/heading: `Nộp bài`, `FCAJ Submission`, `Trưởng nhóm`, `Summary`, `Architecture`, `.md`, `.xml`, `draw.io`, `Lịch sử nộp`.
- Liên kết nội bộ dùng absolute route và trỏ về nguồn nội dung chi tiết thay vì lặp lại.
- Không đưa chi tiết về privacy, AI scoring hoặc trạng thái nội bộ vì người dùng đã xác định không cần ghi.

## Quy tắc nội dung cần bảo toàn

- FCAJ Portal và FCAJ Submission là hai hệ thống độc lập.
- Mỗi cá nhân nộp báo cáo cá nhân và Workshop link trên Portal.
- Chỉ trưởng nhóm/đại diện nhóm nộp thêm trên FCAJ Submission.
- Mỗi nhóm nộp một `.md` và một `.xml`.
- File `.md` gồm đúng năm nhóm nội dung nêu trên.
- Additional/Optional không ảnh hưởng đến điểm.
- File `.xml` chỉ cần AWS Architecture, export từ draw.io và dùng AWS icon package mới nhất.
- Không tự thêm deadline cố định, quy tắc trạng thái hoặc mô tả AI scoring ngoài thông tin đã được cung cấp.
- Không thay đổi barem scoring hiện hành.

## Kiểm tra sau khi thực hiện

1. Chạy Prettier trên các file thay đổi.
2. Chạy `pnpm typecheck`.
3. Chạy `pnpm build` để kiểm tra MDX, route, include, ảnh và navigation.
4. Kiểm tra page mới xuất hiện trong group `Nộp bài và hoàn tất thực tập`, đúng sau `Nộp Workshop`.
5. Kiểm tra URL cũ của toàn bộ 11 page Instructions vẫn giữ nguyên sau khi di chuyển folder.
6. Kiểm tra các link `/instructions/fcaj-submission`, `/instructions/workshop`, `/project/content` và `/scoring/workshop`.
7. Kiểm tra đủ sáu asset ảnh và alt text.
8. Kiểm tra page hiển thị tốt ở light/dark mode và mobile khi chạy dev nếu môi trường cho phép.
9. Ghi nhận riêng blocker dependency Vercel/MCP hiện có của repo nếu build tiếp tục gặp lỗi `@modelcontextprotocol/sdk`.
