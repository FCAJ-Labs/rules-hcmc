# Tổng quan repo FCAJ Rules HCMC

## 1. Mục đích và bản chất website

`rules-hcmc` là website tài liệu hướng dẫn bằng tiếng Việt cho FCAJ South Campus tại Bitexco, TP. Hồ Chí Minh. Website phục vụ hai nhóm người đọc có nhu cầu khác nhau:

- **Sinh viên thực tập tại FCAJ**: tài khoản Portal, đăng ký lịch, di chuyển, điểm danh, nội quy, Project, barem chấm điểm và xử lý vi phạm.
- **Người tham dự Event tại Bitexco**: đăng ký Event, gửi xe, di chuyển, thời gian check-in, quy định trong ngày Event và xác nhận đã đọc.

Trang chủ không đưa người đọc thẳng vào một danh sách tài liệu dài. Trang chủ yêu cầu chọn đúng nhóm đối tượng trước, sau đó mỗi nhóm có một cẩm nang riêng. Đây là nguyên tắc UX và cấu trúc nội dung quan trọng nhất của site.

## 2. Công nghệ và cách website vận hành

- Framework tài liệu: **Blume 2.2.7**, xây trên Astro.
- Package manager bắt buộc: **pnpm**.
- Module: ESM (`"type": "module"`).
- Nội dung: Markdown/MDX trong `contents/`.
- Component layout: Astro trong `components/`.
- Styling: `theme.css` ghi đè và mở rộng theme mặc định của Blume.
- Deployment: adapter Vercel trong `blume.config.ts`, site URL là `https://hcm-rules.awsfcaj.com`.
- Output build Astro hiện gồm `dist/` và phần output triển khai Vercel trong `.vercel/output/`.
- Analytics: Vercel Speed Insights.
- AI assistant: Blume AI Gateway, model `xiaomi/mimo-v2.6-flash`, reasoning `minimal`.
- Rate limit: Upstash, giới hạn 60 requests.
- Font: **Be Vietnam Pro** cho display và body, `geist-mono` cho monospace.
- Ngôn ngữ: chỉ có locale `vi`, dù label locale trong config đang ghi `Vietnamese`.
- SEO: robots, sitemap và structured data bật; Open Graph đang tắt.
- Agent discoverability: `llms.txt`, MCP server và agent readability bật.
- Feedback cuối trang bị tắt.

Blume sẽ sinh thêm các endpoint và tài liệu máy đọc như Markdown mirror, JSON API, OpenAPI, `llms.txt`, `llms-full.txt`, sitemap và các manifest dành cho agent. Vì MCP đang bật, bundle Vercel cần truy cập được package `@modelcontextprotocol/sdk` khi deploy.

## 3. Cấu trúc thư mục

```text
.
├── assets/images/             Ảnh nội dung, được Blume tối ưu lúc build
├── components/                Layout override và logic navigation riêng
│   └── navigation/
├── contents/                  Toàn bộ trang MDX
│   ├── (internship)/          Nhóm route Internship, không tạo URL segment
│   ├── events/                Nhóm route Event, giữ prefix /events
│   ├── _shared/               Partial dùng chung, không tạo route
│   ├── index.mdx              Landing page chọn audience
│   └── internship.mdx         Landing page của cẩm nang Internship
├── public/                    Logo, favicon và file tĩnh phục vụ nguyên trạng
├── blume.config.ts            Cấu hình Blume/site/runtime/deployment
├── components.ts              Đăng ký component layout override
├── theme.css                  CSS tùy biến giao diện
├── package.json               Script và dependency
├── pnpm-lock.yaml             Lockfile pnpm
├── README.md                  Hướng dẫn chạy project
├── AGENTS.md                  Quy ước làm việc trong repo
└── .prettierrc                Cấu hình Prettier
```

### Số liệu nội dung hiện tại

- 63 file `.mdx` trong `contents/`.
- 51 file nội dung được publish thành page route.
- 12 file trong `_shared/`, chỉ dùng làm partial.
- 44 file ảnh trong `assets/images/`; 38 file đang được MDX hiện tại tham chiếu, 6 file trong `assets/images/scoring/` đang là asset chưa được dùng trong page.
- 4 file public chính: `logo-light.png`, `logo-dark.png`, `favicon.ico`, `apple-touch-icon.png`.
- Không có test suite riêng; kiểm tra chính hiện tại là Blume typecheck, build và các lệnh audit/doctor nếu cần.

## 4. Routing và phân nhóm audience

### 4.1. Group folder `(internship)`

Tên folder có ngoặc giúp nhóm file Internship dùng chung namespace mà không xuất hiện trong URL. Vì vậy:

- `contents/(internship)/instructions/...` thành `/instructions/...`.
- `contents/(internship)/regulations/...` thành `/regulations/...`.
- `contents/(internship)/project/...` thành `/project/...`.
- `contents/(internship)/scoring/...` thành `/scoring/...`.
- `contents/(internship)/review/...` thành `/review/...`.
- `contents/(internship)/violations.mdx` thành `/violations`.

### 4.2. Landing page

`contents/index.mdx` có frontmatter `mode: custom` và `sidebar.hidden: true`. Đây là landing page riêng, không theo layout tài liệu thông thường. Nội dung tự viết HTML/inline SVG và dùng hai đường dẫn:

- `/internship`: sinh viên thực tập tại FCAJ, màu chủ đạo xanh.
- `/events`: người tham dự Event tại Bitexco, màu chủ đạo cam.

`contents/internship.mdx` là trang cẩm nang Internship, có `sidebar.order: 1`. Trang này dùng callout nguy hiểm, CardGroup và Steps để dẫn người đọc qua toàn bộ lộ trình.

### 4.3. Nhóm Internship

Các group trong sidebar được kiểm soát bằng `meta.ts`:

| Group             | Order | Các page theo thứ tự                                                                                          |
| ----------------- | ----: | ------------------------------------------------------------------------------------------------------------- |
| Hướng dẫn         |    10 | `document`, `portal`, `register`, `parking`, `moving`, `attendance`, `toilet`, `workshop`, `stamp`, `uniform` |
| Nội quy           |    20 | `diligence`, `time`, `dress-code`, `inout`, `eatuse`, `toilet`                                                |
| Xử lý vi phạm     |    30 | `violations.mdx` ở root của group `(internship)`                                                              |
| Project           |    40 | `content`, `requirement`, `standard`                                                                          |
| Chấm điểm         |    50 | `attentions`, `workshop`, `attitude-style`, `attendance`, `bonus`, `deductions`                               |
| Ôn lại & Xác nhận |    60 | `summary`, `acknowledgement`                                                                                  |

Các `index.mdx` của Hướng dẫn, Nội quy, Project và Chấm điểm có `sidebar.hidden: true`, nhưng vẫn là route index của nhóm. Chúng đóng vai trò trang điều hướng hoặc trang tổng quan.

### 4.4. Nhóm Events

Events giữ prefix `/events`:

- `/events`: landing page của người tham dự Event.
- `/events/instructions`: chuẩn bị trước Event.
- `/events/regulations`: quy định trong ngày Event.
- `/events/review`: ôn lại và xác nhận.

Các group con có thứ tự:

- `instructions/meta.ts`: `register`, `parking`, `moving`, `time-checkin`.
- `regulations/meta.ts`: `dress-code`, `inout`, `eatuse`, `toilet`.
- `review/meta.ts`: `summary`, `acknowledgement`.

Các route chuyên biệt nhưng không muốn hiện trên sidebar:

- `/events/instructions/portal` dùng cho luồng OJT/thực tập, `sidebar.hidden: true`, `pagination: false`.
- `/events/instructions/register-general` dùng cho khách thông thường, hidden và không pagination.
- `/events/instructions/register-ojt` dùng cho OJT, hidden và không pagination.
- Các trang chi tiết được mở từ Card lựa chọn luồng, không làm sidebar bị quá tải.

### 4.5. Cách lọc sidebar và pagination

`components/navigation/audience.ts` định nghĩa audience theo route:

- Route `/events` hoặc bắt đầu bằng `/events/` là audience `events`.
- Mọi route còn lại được xem là audience `internship`.

`Sidebar.astro` lọc navigation tree đệ quy theo audience hiện tại. Group cha chỉ được giữ lại nếu còn child phù hợp hoặc chính group có route phù hợp.

`components/navigation/pagination.ts` dùng đúng helper audience này, sau đó flatten page theo thứ tự sidebar để tính trang trước/trang sau. Nhờ vậy người đọc Event không bao giờ bị pagination nhảy sang trang Internship và ngược lại.

## 5. Mẫu tổ chức một trang MDX

Phần lớn page có dạng:

```mdx
---
title: Tên trang
sidebar:
    label: Nhãn ngắn trên sidebar
---

Đoạn mở đầu nêu mục đích hoặc quy tắc chính.

## Nhóm nội dung

Nội dung chi tiết...
```

Các quy tắc thực tế:

- `title` là frontmatter bắt buộc theo convention của repo.
- Dùng `sidebar.label` khi tên hiển thị trên sidebar cần ngắn hơn title.
- Dùng `sidebar.hidden: true` cho index/route trung gian không muốn đưa vào danh sách.
- Dùng `sidebar.order` cho page đơn lẻ cần chen vào thứ tự group.
- Dùng `pagination: false` cho các route nhánh không nên tham gia luồng đọc tuần tự.
- Tên file dùng slug tiếng Anh ngắn, còn nội dung và title viết tiếng Việt.
- Internal link viết bằng absolute route, thường kèm anchor cụ thể, ví dụ `/regulations/diligence#huy-dang-ky`.
- Heading chính trong page thường bắt đầu từ `##`; H1 do layout Blume xử lý từ title.

### Component được dùng theo mục đích

- `<Steps>` và `<Step>`: quy trình có thứ tự, đặc biệt là đăng ký Portal, check-in, di chuyển và nộp bài.
- `<CardGroup>` và `<Card>`: trang index, lựa chọn đường đọc và các nhóm nội dung.
- Callout directive `:::danger`, `:::warning`, `:::info`, `:::note`: nhấn mạnh mức độ nghiêm trọng, cảnh báo thao tác và thông tin bổ sung.
- `<Badge>`: gắn mức độ hoặc trạng thái trong trang nội quy.
- `<Accordion>` và `<AccordionItem>`: phần tự kiểm tra trước khi xác nhận đã đọc.
- Markdown table: khung giờ, barem, địa điểm gửi xe và so sánh nhanh.
- Markdown image: ảnh minh họa thao tác Portal hoặc đường đi, luôn kèm alt text tiếng Việt.

## 6. Nội dung và luồng trải nghiệm

### Luồng Internship

1. Đọc trang `/internship` để nắm cảnh báo và thứ tự đọc.
2. Vào `/instructions` để tạo tài khoản Portal, đăng ký lịch, chuẩn bị trước ngày đầu, di chuyển, điểm danh, nộp Workshop, xin mộc và đặt đồng phục.
3. Đọc `/regulations` về chuyên cần, thời gian, trang phục, ra vào, ăn uống và nhà vệ sinh.
4. Đọc `/violations` để hiểu hậu quả.
5. Đọc `/project` về nội dung báo cáo, yêu cầu và tiêu chuẩn Workshop.
6. Đọc `/scoring` về barem 10 điểm, Worklog/Blog, Architecture, Workshop, thái độ, chuyên cần, bonus và các khoản trừ.
7. Xem `/review/summary`, sau đó mở `/review/acknowledgement` để tự kiểm tra và cam kết.

Barem dùng chung trong `_shared/internship/barem/score-structure.mdx` là:

| Nhóm tiêu chí       | Điểm tối đa |
| ------------------- | ----------: |
| Worklog / Blog      |         1.0 |
| Proposal / Workshop |         5.0 |
| Thái độ / tác phong |         2.0 |
| Chuyên cần          |         1.5 |
| Bonus               |         0.5 |
| Tổng                |        10.0 |

### Luồng Events

1. `/events` giới thiệu ba nhóm: trước Event, trong ngày Event, ôn lại và xác nhận.
2. `/events/instructions` yêu cầu đọc theo thứ tự đăng ký, gửi xe, di chuyển, thời gian và check-in.
3. `/events/instructions/register` bắt người đọc chọn đúng luồng OJT/thực tập hoặc khách thông thường.
4. Hai luồng chi tiết nằm ở các page hidden để vẫn truy cập được từ Card nhưng không xuất hiện trong sidebar.
5. `/events/regulations` bao gồm trang phục, ra vào, ăn uống và nhà vệ sinh.
6. `/events/review/summary` và `/events/review/acknowledgement` dùng để ôn lại và xác nhận.

## 7. Phong cách viết content

Phong cách hiện tại có tính vận hành cao, ưu tiên để người đọc làm đúng hành động hơn là đọc văn phong quảng bá:

- Viết tiếng Việt trực tiếp, ngắn và có tính chỉ dẫn.
- Gọi đối tượng là `sinh viên`, `bạn`, `người tham dự`, tùy ngữ cảnh.
- Giữ nguyên các thuật ngữ vận hành quen thuộc bằng tiếng Anh: Portal, Pending, Approved, Check-in, Check-out, Event, Workshop, Architecture, Production, Worklog, Blog.
- Nêu chính xác giờ, hạn đăng ký, số điểm, mức phạt và điều kiện áp dụng.
- Bôi đậm từ khóa hành động hoặc hậu quả quan trọng.
- Mỗi page thường mở đầu bằng một đoạn giải thích ngắn, sau đó chia thành các H2 theo chủ đề.
- Quy trình thao tác dùng Steps; quy tắc tổng hợp dùng bảng hoặc danh sách; cảnh báo nghiêm trọng đưa vào callout.
- Nội dung có tính nhắc lại có chủ ý: một quy định quan trọng thường xuất hiện ở trang hướng dẫn, trang nội quy, trang tóm tắt và accordion xác nhận.
- Tone nghiêm túc, rõ ràng, có thể dùng câu mạnh như `nghiêm cấm`, `bị tính vắng`, `hủy thực tập`, nhưng vẫn hướng dẫn cụ thể cách làm đúng.
- Không nên tự ý đổi thuật ngữ hoặc làm mềm mức xử lý nếu không có yêu cầu nghiệp vụ mới.

## 8. Partial và cơ chế tái sử dụng nội dung

Blume splice file được tham chiếu bằng `<include>` tại build time. Các file trong `_shared/` không có route riêng, không vào navigation, search hoặc sitemap.

Các nhóm shared hiện tại:

- `_shared/common/`: bãi xe, vị trí nhà vệ sinh, Wi-Fi.
- `_shared/events/`: khung giờ Event.
- `_shared/internship/portal/`: tạo tài khoản, notification, kết quả đăng ký Portal.
- `_shared/internship/barem/`: cấu trúc điểm, quy tắc chấm, attendance, bonus, deductions.

Một partial có thể nhận biến bằng attribute, ví dụ:

```mdx
<include occasion="lên văn phòng">/_shared/internship/portal/registration.mdx</include>
```

Trong partial, biến được dùng bằng `{{occasion}}`. Cách này cho phép dùng cùng quy trình đăng ký cho cả Internship và Event mà chỉ thay đổi ngữ cảnh câu chữ.

Khi thêm shared content:

1. Đặt file dưới `contents/_shared/`.
2. Dùng đường dẫn include bắt đầu bằng `/` nếu muốn resolve từ content root.
3. Nếu partial có ảnh hoặc link tương đối, nhớ kiểm tra đường dẫn sau khi được include vào page.
4. Không thêm frontmatter cần thiết cho page vào partial; frontmatter của page gọi include mới là frontmatter được dùng.

## 9. Component và layout tùy biến

`components.ts` đăng ký ba layout override:

```ts
layout: {
  PageFooter,
  Pagination,
  Sidebar,
}
```

### `Sidebar.astro`

Nhận `items` từ Blume, xác định audience bằng route hiện tại rồi truyền navigation đã lọc vào `NavTree` mặc định của Blume. Không tự dựng lại toàn bộ giao diện sidebar.

### `Pagination.astro`

Dùng `blume:data` để lấy sidebar navigation, resolve pagination theo audience và render hai link trước/sau. Mỗi link có data attribute:

- `data-fcaj-pagination="previous"`
- `data-fcaj-pagination="next"`

Các attribute này vừa phục vụ CSS/selector vừa là API nội bộ cho keyboard navigation.

### `PageFooter.astro`

- Render Vercel Speed Insights.
- Thêm marker ẩn `data-fcaj-content-page` để nhận diện page nội dung.
- Khởi tạo keyboard navigation.

### `fcaj-keyboard-navigation.ts`

- `ArrowLeft` đi page trước.
- `ArrowRight` đi page sau.
- Không kích hoạt khi focus đang ở link, button, input, select, textarea, dialog, `pre` hoặc phần tử interactive khác.
- Bỏ qua key repeat, modifier key, IME composition và trường hợp không có pagination link.
- Khởi tạo một lần nhờ `data-fcaj-keyboard-navigation` trên `document.documentElement`.

## 10. Design system và CSS

`theme.css` là lớp tùy biến chính trên theme Blume mặc định.

### Typography và nội dung

- Logo header cao 32px.
- `.prose` dùng cỡ chữ khoảng `0.9375rem`, line-height `1.65`.
- H1 đậm, tracking âm; H2 cỡ `1.5rem`, đậm vừa và có khoảng cách lớn phía trên.
- Code block dùng background của Blume.
- `main#blume-content` dùng `overflow-x: clip` để tránh tràn ngang.

### Twoslash và layout rail

CSS có một nhóm xử lý chi tiết cho twoslash popup:

- Ẩn popup chưa active khỏi layout trên màn hình hẹp.
- Hỗ trợ trạng thái mở bằng touch.
- Dismiss popup khi scroll.
- Cho code block scroll ngang bình thường.
- Đặt popup fixed, có max width, max height và scroll nội bộ.

Ở màn hình từ `80rem`, TOC aside được chuyển thành flex column để card phụ trợ bám cuối rail. Menu trong TOC bị giới hạn theo bề rộng rail để không bị clip.

### Callout

Callout `tip` của Blume vốn dùng accent pink, nhưng site đổi sang xanh lá để phân biệt với `danger`. List marker trong callout cũng được khôi phục vì Blume dùng `not-prose` cho callout.

### Landing page

Các class custom cho landing page:

- `.fcaj-guide-landing`
- `.fcaj-guide-hero`
- `.fcaj-guide-paths`
- `.fcaj-path`
- `.fcaj-path--events`

Landing dùng nền dot grid rất nhẹ, hai card đường dẫn có góc cắt, gradient màu, hover lift, mũi tên chuyển động và focus state bên trong card. Layout chuyển từ hai cột sang một cột ở màn hình nhỏ. `prefers-reduced-motion` được tôn trọng.

### Card chọn luồng đăng ký Event

`.fcaj-event-registration-options` tùy biến hai Blume Card:

- OJT/thực tập: purple.
- Khách thông thường: teal.

Card có hover/focus lift, border màu riêng, shadow riêng và responsive theo CardGroup.

## 11. Hình ảnh và asset

- Ảnh thao tác Portal nằm chủ yếu ở `assets/images/instructions/`.
- Ảnh trang phục và bảng size nằm ở `assets/images/regulations/`.
- Ảnh vị trí nhà vệ sinh nằm trực tiếp dưới `assets/images/`.
- `assets/images/scoring/` hiện chứa 6 ảnh JPG chưa được page MDX nào tham chiếu; đây có thể là nhóm asset chuẩn bị cho nội dung scoring, không nên xóa nếu chưa xác nhận.
- Screenshot dùng PNG; ảnh thực tế dùng JPEG/JPEG-like.
- Ảnh relative được import từ MDX nên Blume tối ưu trong build, đổi sang WebP và thêm intrinsic dimensions.
- Ảnh trong `public/` không qua pipeline tối ưu; dùng cho logo, favicon và icon hệ thống.
- Alt text hiện viết bằng tiếng Việt và mô tả chính xác màn hình/thao tác hoặc địa điểm.
- Không nên thêm ảnh PNG cho ảnh chụp thực tế; giữ nguyên quy ước screenshot PNG, photo JPEG.

## 12. Quy trình chỉnh sửa và vận hành

### Thêm hoặc sửa page

1. Chọn đúng nhánh audience: `(internship)`, `events` hoặc `_shared`.
2. Tạo/sửa `.mdx` với frontmatter `title` và `sidebar.label` nếu cần.
3. Nếu page thuộc folder có `meta.ts`, thêm slug vào `pages` đúng vị trí. Nếu bỏ qua, page vẫn có thể được build nhưng thứ tự sidebar có thể không như mong muốn.
4. Dùng component Blume sẵn có thay vì raw HTML nếu nội dung chỉ cần Card, Steps, Callout hoặc Accordion.
5. Dùng absolute route cho internal link.
6. Mọi ảnh phải có alt text tiếng Việt.
7. Chạy format, typecheck và build.

### Lệnh chính

```bash
pnpm install       # Cài dependency, chỉ dùng pnpm
pnpm dev           # Chạy dev server
pnpm build         # Build production
pnpm typecheck     # blume check --strict
pnpm fmt           # Prettier toàn repo
pnpm doctor        # Kiểm tra sức khỏe Blume
pnpm up            # Kiểm tra cập nhật dependency bằng taze
```

Prettier dùng tab, width 100, line ending LF và `prettier-plugin-astro`.

### Environment cần cho production

- `AI_GATEWAY_API_KEY`, hoặc cơ chế Vercel OIDC tương ứng, cho AI assistant.
- `KV_REST_API_URL` cho Upstash rate limit.
- `KV_REST_API_TOKEN` cho Upstash rate limit.

Không commit secret vào repo. Local secret nên nằm trong `.env.local`, còn production secret nằm trong Vercel environment variables.

## 13. Kết quả kiểm tra repo tại thời điểm scan

Đã chạy:

- `pnpm typecheck`: **pass**, 0 type errors, 0 warnings và 0 hints trong kết quả typecheck. Blume vẫn in 3 cảnh báo cấu hình secret vì môi trường scan không có `AI_GATEWAY_API_KEY`, `KV_REST_API_URL` và `KV_REST_API_TOKEN`.
- `pnpm build`: quá trình compile nội dung, render 51 page và tối ưu 38 ảnh đang được dùng đã hoàn tất, nhưng build kết thúc lỗi ở bước kiểm tra Vercel function bundle. Lỗi yêu cầu package trực tiếp `@modelcontextprotocol/sdk` để dependency trace của Vercel tìm được package khi MCP được bật.

Cảnh báo build cần xử lý trước khi deploy production:

```text
The Vercel function bundle ... is missing packages:
@modelcontextprotocol/sdk
```

Theo thông báo của chính Blume, hướng xử lý là thêm package này vào `package.json` bằng pnpm, sau đó cập nhật `pnpm-lock.yaml` và chạy lại `pnpm typecheck`/`pnpm build`. Đây là vấn đề dependency/deployment, không phải lỗi route, MDX hay đường dẫn ảnh.

## 14. Nguyên tắc design pattern cần giữ khi phát triển tiếp

1. **Tách audience trước khi tách nội dung**: Internship và Events phải giữ sidebar, pagination và luồng đọc độc lập.
2. **Dùng group folder để tổ chức code, không tạo URL thừa**: `(internship)` là pattern chuẩn cho route Internship.
3. **Dùng `meta.ts` làm nguồn sự thật cho thứ tự navigation**: không dựa vào thứ tự file hệ thống.
4. **Tái sử dụng nội dung nghiệp vụ qua `_shared/`**: đặc biệt cho parking, toilet, Wi-Fi, Portal và bảng điểm.
5. **Index page để điều hướng, detail page để thực thi**: index dùng Card/Steps; detail dùng Steps, bảng, callout và ảnh.
6. **Page hidden vẫn có thể là route hợp lệ**: dùng cho trang nhánh của flow hoặc trang trung gian, không dùng để xóa page khỏi build.
7. **Viết nội dung theo thao tác và điều kiện**: nêu đối tượng, thời điểm, hành động, trạng thái và hậu quả cụ thể.
8. **Giữ link có anchor tới quy định gốc**: tránh copy một quy định ở nhiều nơi mà không trỏ về nguồn chi tiết.
9. **Giữ accessibility và responsive behavior**: alt text, focus state, keyboard navigation, reduced motion và layout mobile là một phần của pattern hiện tại.
10. **Không sửa `theme.css` hoặc component override chỉ để giải quyết một page** nếu có thể dùng component Blume hoặc content convention phù hợp.
