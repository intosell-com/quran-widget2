# Quran Random Image Widget

ابزار ساده و بدون سرور برای نمایش تصادفی آیات قرآن به صورت تصویر در سایت یا وبلاگ.

این پروژه از فایل `quran.txt` استفاده می‌کند. داخل این فایل، هر خط باید یک آدرس مستقیم تصویر باشد. نسخه فعلی بر اساس فایل ارسالی شما ساخته شده و شامل 2778 لینک تصویر است.

## فایل‌ها

- `index.html` صفحه اصلی و پیش‌نمایش
- `embed.html` نسخه قابل نمایش داخل سایت‌های دیگر
- `widget.js` اسکریپت اشتراک‌گذاری برای سایت‌ها و وبلاگ‌ها
- `app.js` منطق خواندن `quran.txt` و نمایش تصادفی
- `styles.css` ظاهر ویجت
- `quran.txt` آدرس عکس‌های آیات

## روش استفاده در GitHub Pages

1. یک Repository جدید در GitHub بسازید.
2. همه فایل‌های این پوشه را داخل Repository آپلود کنید.
3. از مسیر `Settings > Pages`، بخش GitHub Pages را فعال کنید.
4. Branch را روی `main` و Folder را روی `/root` بگذارید.
5. بعد از انتشار، آدرس شما چیزی شبیه این می‌شود:

```text
https://USERNAME.github.io/REPOSITORY/
```

## کد اشتراک‌گذاری برای سایت‌های دیگر

بعد از انتشار، این کد را در سایت یا وبلاگ مقصد قرار دهید:

```html
<script src="https://USERNAME.github.io/REPOSITORY/widget.js" data-quran-widget></script>
```

به جای `USERNAME` نام کاربری GitHub و به جای `REPOSITORY` نام مخزن را بگذارید.

## تنظیم اندازه ویجت

```html
<script
  src="https://USERNAME.github.io/REPOSITORY/widget.js"
  data-quran-widget
  data-height="430"
  data-max-width="760px">
</script>
```

## روش جایگزین با iframe

```html
<iframe
  src="https://USERNAME.github.io/REPOSITORY/embed.html"
  style="width:100%;max-width:760px;height:430px;border:0;border-radius:24px;overflow:hidden"
  loading="lazy">
</iframe>
```

## تست روی کامپیوتر

به دلیل محدودیت مرورگر در خواندن فایل‌های محلی، بهتر است پروژه را با یک سرور ساده اجرا کنید:

```bash
python -m http.server 8000
```

سپس این آدرس را باز کنید:

```text
http://localhost:8000
```
