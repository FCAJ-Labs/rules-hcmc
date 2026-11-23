## Đây là mô tả về website nộp bài dành cho sinh viên (link web: https://fcajsubmission.vercel.app/), trang web này là tool AI dùng để bổ trợ chấm bài, ngoài việc sinh viên nộp workshop theo contents/(internship)/instructions/workshop.mdx, sinh viên cần phải nộp thêm qua website trên và cấu trúc + nội dung cụ thể như bên dưới.


## Cụ thể hướng dẫn sinh viên mỗi nhóm nộp bài theo cấu trúc như sau
1. Mỗi cá nhân cần phải nộp:
- Workshop theo đúng template, gồm các phần: Thông tin cá nhân, Worklog, Proposal, Blogs,  Events, Workshop, Self-Evaluation, Sharing and Feedback.
**Lưu ý, trong template có các phần thuộc về 'Nhóm' và 'Cá nhân', cụ thể:
- Nhóm (được làm giống nhau): Proposal, Workshop, Blogs.
- Cá nhân (khác nhau/không được giống hoàn toàn - tự bản thân mình viết): Worklog, Events, Self-Evaluation, Sharing and Feedback.

2. Ngoài ra đại diện mỗi nhóm nộp thêm 1 file markdown (.md) và 1 file .xml - đóng vai trò như summary của toàn bộ dự án. 
2.1. File .md này bao gồm:
- Problem statement
- Proposed Solution 
- End to end workflow
- Additional (Optioned)
- Cost 
2.2. File .xml
- File architecture hoàn chỉnh của dự án được vẽ trên draw.io và export ra file .xml.
**Lưu ý:
File .md không cần hình ảnh.
Thông tin chi tiết cụ thể: xem mục Project và Chấm điểm trong https://hcm-rules.awsfcaj.com/

## Lưu ý về file .mdx hướng dẫn sinh viên nộp bài.
1. Chỉ cần sinh viên đại diện nhóm đăng nhập và nộp bài + theo dõi tình hình của bài đã nộp
3. Các hình ảnh hướng dẫn sử dụng được tôi thêm tuần tự vào assets\images\scoring, sử dụng MDX component STEPS của Blume.  


## Chú thích các ảnh được thêm vào assets/images/scoring
1. homepage.jpg: trang chủ của trang web nộp bài.
2. login 1 và login 2: hướng dẫn đăng nhập bằng google authentication
3. explain.jpg: Hướng dẫn các thành phần quan trọng sinh viên cần chú ý trên web. Cụ thể mỗi đợt thực tập sẽ được mở cổng nộp bài. Sẽ có 2 thành phần chính là Lịch sử nộp - giúp sinh viên quan sát được lịch sử nộp bài của mình và Nộp bài - nơi sinh viên nộp file .md chứa summary dự án và file .xml architecture
4. submission-history.jpg: giao diện xem lịch sử nộp
5. submission-tutorial.jpg: giao diện hướng dẫn sinh viên nộp, cụ thể gồm 5 bước:
    1. Trưởng nhóm/đại diện nhóm điền tên nhóm của minh.
    2. Điền thông tin các thành viên nhóm gồm: Họ tên sinh viên, mã số sinh viên, email. Đảm bảo đầy đủ thông tin thành viên trong nhóm, thêm thông tin bằng button "thêm sinh viên"
    3. File bài làm (.md): Trưởng nhóm/đại diện nhóm upload file .md đầy đủ các tiêu chí và yêu cầu như mô tả trước, file có kích thước tối đa 2MB.
    4. File architecture (.xml): Trưởng nhóm/đại diện nhóm upload file .xml của một sơ đồ hoàn chỉnh, file có kích thước tối đa 5MB.


## Scan và đảm bảo phân chia, để những thông tin quan trọng vào phần "cần nhớ Callout type="info" title="Cần nhớ" icon="lightbulb" color="#DA70D6""". Sử dụng note type cho các loại thông tin phù hợp