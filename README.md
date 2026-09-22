# Website Công Ty Luật TNHH Luật Sư Nam

Website tĩnh (HTML + CSS + JavaScript thuần), **không cần máy chủ, không cần cài đặt, không phụ thuộc thư viện ngoài**.
Chỉ cần tải toàn bộ thư mục lên bất kỳ dịch vụ lưu trữ nào là chạy được.

---

## 1. Ba việc cần làm trước khi đưa website lên mạng

Đây là ba việc **bắt buộc**. Website vẫn chạy nếu chưa làm, nhưng sẽ chưa hoạt động đúng như thiết kế.

### ✅ Việc 1 — Đổi tên miền trong mã nguồn

Toàn bộ mã đang dùng tên miền tạm `https://luatsunam.vn`. Khi có tên miền thật, chạy một lệnh duy nhất
tại thư mục gốc của dự án (thay `tenmiencuaban.vn` bằng tên miền thật):

```bash
grep -rl "luatsunam.vn" . --include="*.html" --include="*.xml" --include="*.txt" \
  | xargs sed -i 's|https://luatsunam\.vn|https://tenmiencuaban.vn|g'
```

> **Vì sao quan trọng:** các thẻ `canonical`, `sitemap.xml` và `og:image` đều dùng đường dẫn tuyệt đối.
> Nếu sai tên miền, Google sẽ lập chỉ mục nhầm và ảnh xem trước khi chia sẻ link sẽ không hiển thị.

### ✅ Việc 2 — Kích hoạt biểu mẫu liên hệ (5 phút)

Hiện biểu mẫu đang ở **chế độ dự phòng**: khi khách bấm gửi, ứng dụng email trên máy họ sẽ mở ra.
Cách này khiến phần lớn khách bỏ cuộc giữa chừng. Để yêu cầu tư vấn gửi thẳng về hộp thư công ty:

1. Truy cập <https://web3forms.com> → nhập `luatsunam.hcm@gmail.com` → nhận **Access Key** qua email (miễn phí).
2. Mở tệp `script.js`, dòng đầu tiên, thay chuỗi tạm bằng key vừa nhận:

```js
const WEB3FORMS_KEY = 'a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx';   // ← dán key thật vào đây
```

Xong. Hệ thống tự động chuyển sang gửi trực tiếp, khách nhận được thông báo ngay trên trang,
và có sẵn cơ chế báo lỗi kèm số hotline nếu đường truyền gặp sự cố.

### ✅ Việc 3 — Điền thông tin thật của đội ngũ và pháp nhân

Mọi chỗ cần điền đều được đánh dấu bằng `[dấu ngoặc vuông]` và có chú thích hướng dẫn ngay trong mã nguồn
(tìm từ khóa `GHI CHÚ CHO NGƯỜI QUẢN TRỊ`).

| Tệp | Cần bổ sung |
|---|---|
| `gioi-thieu.html` | Họ tên đầy đủ, **số Thẻ luật sư**, **Đoàn Luật sư**, năm hành nghề của từng luật sư |
| `mien-tru-trach-nhiem.html` | **Mã số doanh nghiệp**, **số Giấy đăng ký hoạt động** do Sở Tư pháp cấp |

> ⚖️ **Lưu ý nghề nghiệp:** chỉ công bố thông tin chính xác và đã được từng luật sư đồng ý.
> Thông tin giới thiệu dịch vụ pháp lý phải trung thực, không gây hiểu nhầm, không so sánh hạ thấp tổ chức
> hành nghề luật sư khác — theo Luật Luật sư và Bộ Quy tắc Đạo đức và Ứng xử nghề nghiệp luật sư Việt Nam.

---

## 2. Sau khi đưa website lên mạng

1. **Khai báo với Google** — đăng ký [Google Search Console](https://search.google.com/search-console),
   xác minh quyền sở hữu, rồi nộp `https://tenmiencuaban.vn/sitemap.xml`.
2. **Tạo hồ sơ Google Doanh nghiệp** — quan trọng bậc nhất với khách tìm "luật sư gần đây".
   Địa chỉ, số điện thoại, giờ làm việc phải **trùng khớp từng ký tự** với thông tin trên website.
3. **Kiểm tra dữ liệu có cấu trúc** — dán từng đường dẫn vào
   [Rich Results Test](https://search.google.com/test/rich-results) để xác nhận Google đọc được
   `LegalService` (trang chủ) và `FAQPage` (trang Liên hệ).
4. **Cấu hình trang 404** — xem mục 5 bên dưới theo từng nền tảng lưu trữ.

---

## 3. Cấu trúc dự án

```
├── index.html                  Trang chủ
├── gioi-thieu.html             Giới thiệu & Đội ngũ luật sư
├── lien-he.html                Liên hệ + bản đồ + câu hỏi thường gặp
├── mien-tru-trach-nhiem.html   Tuyên bố miễn trừ trách nhiệm
├── chinh-sach-bao-mat.html     Chính sách bảo mật
├── dieu-khoan-su-dung.html     Điều khoản sử dụng
├── 404.html                    Trang báo lỗi không tìm thấy
├── en/index.html               Bản tiếng Anh
├── dich-vu/                    8 trang lĩnh vực hoạt động
│   ├── tu-van-thua-ke.html                 Thừa kế
│   ├── tranh-tung-giai-quyet-tranh-chap.html
│   ├── hon-nhan-gia-dinh.html
│   ├── dat-dai-bat-dong-san.html
│   ├── lao-dong-viec-lam.html
│   ├── hinh-su.html
│   ├── dan-su.html
│   ├── cong-chung.html
│   └── thua-ke.html            (chuyển hướng cũ, đã đánh dấu noindex)
├── assets/                     Logo, ảnh, biểu tượng
│   └── fonts/                  Font chữ tự lưu trữ (woff2)
├── styles.css                  Toàn bộ giao diện
├── script.js                   Menu, hiệu ứng, xử lý biểu mẫu  ← chứa CẤU HÌNH
├── sitemap.xml                 Sơ đồ website cho công cụ tìm kiếm
├── robots.txt
└── site.webmanifest            Cho phép lưu website ra màn hình chính điện thoại
```

---

## 4. Hướng dẫn sửa nội dung thường gặp

| Muốn sửa | Mở tệp | Tìm từ khóa |
|---|---|---|
| Số điện thoại | tất cả tệp `.html` + `script.js` | `0983498499` và `0983 498 499` |
| Email | tất cả tệp `.html` + `script.js` | `luatsunam.hcm@gmail.com` |
| Địa chỉ văn phòng | tất cả tệp `.html` | `Vũ Ngọc Phan` |
| Giờ làm việc | tất cả tệp `.html` | `08:00 — 17:30` |
| Hồ sơ luật sư | `gioi-thieu.html` | `lawyer-card` |
| Câu hỏi thường gặp | `lien-he.html` | `faq-item` |
| Màu sắc giao diện | `styles.css` | `:root` |
| Font chữ | `styles.css` | `--serif` / `--sans` trong `:root` |

**Đổi số điện thoại trên toàn bộ website bằng một lệnh:**

```bash
grep -rl "0983498499" . --include="*.html" --include="*.js" | xargs sed -i 's|0983498499|SỐ_MỚI|g'
grep -rl "0983 498 499" . --include="*.html" --include="*.js" | xargs sed -i 's|0983 498 499|SỐ MỚI CÓ DẤU CÁCH|g'
```

> ⚠️ Khi sửa nội dung, **đừng thêm các cụm cam kết kết quả** như "cam kết thắng kiện", "bảo đảm thắng 100%".
> Bộ Quy tắc Đạo đức và Ứng xử nghề nghiệp luật sư Việt Nam nghiêm cấm luật sư hứa hẹn, cam kết bảo đảm
> kết quả vụ việc nằm ngoài khả năng và điều kiện thực hiện của luật sư (Quy tắc 9.1.6).

---

## 5. Đưa website lên mạng

### GitHub Pages (miễn phí)
`Settings → Pages → Source: Deploy from a branch → nhánh main, thư mục /(root)`.
GitHub Pages tự dùng `404.html`. Gắn tên miền riêng tại mục *Custom domain*.

### Netlify / Cloudflare Pages / Vercel (miễn phí, khuyến nghị)
Kéo thả cả thư mục vào trang chủ dịch vụ, hoặc kết nối trực tiếp với kho GitHub này.
Không cần cấu hình build. Cả ba đều tự dùng `404.html` và cấp chứng chỉ HTTPS miễn phí.

### Máy chủ chia sẻ (cPanel, hosting Việt Nam)
Tải toàn bộ thư mục vào `public_html/`. Để trang 404 hoạt động, tạo tệp `.htaccess` ở thư mục gốc:

```apache
ErrorDocument 404 /404.html
```

---

## 6. Xem thử trên máy trước khi đăng

```bash
python3 -m http.server 8000
```

Mở trình duyệt tại <http://localhost:8000>.

> Nên xem qua máy chủ cục bộ thay vì mở thẳng tệp bằng cách nhấp đúp — khi mở trực tiếp,
> trình duyệt chặn một số tính năng và bản đồ sẽ không hiển thị.

---

## 7. Những gì đã được xây dựng sẵn

**Tối ưu công cụ tìm kiếm**
- Thẻ `canonical`, `description`, `hreflang` riêng cho từng trang
- Dữ liệu có cấu trúc: `LegalService`, `Service`, `BreadcrumbList`, `FAQPage`, `AboutPage`, `ContactPage`
- `sitemap.xml` (15 đường dẫn), `robots.txt`
- Thẻ Open Graph + Twitter Card kèm ảnh chia sẻ riêng (`assets/og-image.jpg`)

**Hiệu năng**
- Toàn bộ ảnh đã chuyển sang định dạng WebP — dung lượng giảm **từ 3,7 MB xuống còn khoảng 150 KB**
- Không dùng thư viện ngoài, không webfont tải từ máy chủ khác, không mã theo dõi

**Font chữ và khả năng đọc tiếng Việt**
- **Lora** (tiêu đề) và **Be Vietnam Pro** (phần thân) — cả hai hỗ trợ đầy đủ
  ký tự tiếng Việt, kể cả bộ dấu chồng khó nhất: ấ ầ ẩ ẫ ậ ế ề ể ễ ệ ố ồ ổ ỗ ộ ớ ờ ở ỡ ợ ứ ừ ử ữ ự
- **Tự lưu trữ** tại `assets/fonts/` (giấy phép SIL Open Font License 1.1) —
  không gửi bất kỳ yêu cầu nào tới máy chủ của bên thứ ba, giữ nguyên cam kết
  bảo mật trong Chính sách bảo mật
- Khoảng cách dòng của tiêu đề được nới riêng cho tiếng Việt, tránh dấu thanh
  ở dòng dưới va vào phần thòng xuống của dòng trên

> ⚠️ **Không đổi sang Georgia, Times New Roman hay Arial cho phần tiêu đề.**
> Các font này thiếu glyph dấu chồng tiếng Việt, khiến chữ hiển thị sai kiểu
> `Thâ´u hiê?u vâ´n đê`` thay vì `Thấu hiểu vấn đề`. Đây chính là lỗi đã được
> khắc phục ở phiên bản này.

**Khả năng tiếp cận**
- Liên kết bỏ qua nội dung, nhãn ARIA, viền hiển thị rõ khi điều hướng bằng bàn phím
- Mọi ảnh đều có thuộc tính `alt`; tôn trọng thiết lập giảm chuyển động của người dùng

**Tuân thủ nghề nghiệp**
- Dải miễn trừ trách nhiệm ở chân mọi trang
- Trang Tuyên bố miễn trừ trách nhiệm đầy đủ 9 mục
- Ghi chú rõ: gửi biểu mẫu chưa làm phát sinh quan hệ luật sư — khách hàng
- Cảnh báo không gửi tài liệu mật trước khi ký hợp đồng dịch vụ pháp lý
- Không có bất kỳ nội dung cam kết bảo đảm kết quả vụ việc nào

---

*Mọi nội dung pháp lý trên website cần được luật sư phụ trách rà soát lại trước khi công bố chính thức.*
