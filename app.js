(() => {
  const QURAN_FILE = './quran.txt';
  const box = document.querySelector('[data-quran-box]');
  if (!box) return;

  const img = box.querySelector('[data-ayah-image]');
  const loader = box.querySelector('[data-loader]');
  const meta = box.querySelector('[data-meta]');
  const nextBtn = box.querySelector('[data-next-ayah]');
  let ayahImages = [];
  let lastIndex = -1;

  function setMessage(message, isError = false) {
    if (!loader) return;
    loader.textContent = message;
    loader.classList.toggle('error', Boolean(isError));
    loader.hidden = false;
    if (img) img.hidden = true;
  }

  function normalizeLines(text) {
    return text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && /^https?:\/\//i.test(line));
  }

  function randomIndex() {
    if (ayahImages.length <= 1) return 0;
    let index = Math.floor(Math.random() * ayahImages.length);
    if (index === lastIndex) index = (index + 1) % ayahImages.length;
    lastIndex = index;
    return index;
  }

  function showRandomAyah() {
    if (!ayahImages.length) {
      setMessage('هیچ آدرس تصویری در quran.txt پیدا نشد.', true);
      return;
    }

    const index = randomIndex();
    const url = ayahImages[index];

    loader.hidden = false;
    loader.textContent = 'در حال بارگذاری تصویر...';
    loader.classList.remove('error');

    img.hidden = true;
    img.onload = () => {
      loader.hidden = true;
      img.hidden = false;
      if (meta) meta.textContent = `تصویر ${index + 1} از ${ayahImages.length}`;
      try { localStorage.setItem('last-quran-image', String(index)); } catch(e) {}
    };
    img.onerror = () => {
      setMessage('این تصویر بارگذاری نشد؛ آیه دیگری را امتحان کنید.', true);
    };
    img.src = url;
  }

  async function loadQuranFile() {
    try {
      setMessage('در حال خواندن quran.txt...');
      const response = await fetch(QURAN_FILE, { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const text = await response.text();
      ayahImages = normalizeLines(text);

      if (!ayahImages.length) {
        setMessage('فایل quran.txt خوانده شد، اما لینک تصویر معتبری داخل آن نبود.', true);
        return;
      }

      showRandomAyah();
    } catch (error) {
      setMessage('خطا در خواندن quran.txt. پروژه را از طریق GitHub Pages یا یک سرور محلی اجرا کنید، نه با باز کردن مستقیم فایل.', true);
      console.error(error);
    }
  }

  nextBtn?.addEventListener('click', showRandomAyah);
  loadQuranFile();

  // Generate share codes on demo page
  const originPath = window.location.href.replace(/index\.html(?:[#?].*)?$/,'').replace(/[#?].*$/,'');
  const base = originPath.endsWith('/') ? originPath : originPath + '/';
  const scriptCode = `<script src="${base}widget.js" data-quran-widget></script>`;
  const iframeCode = `<iframe src="${base}embed.html" style="width:100%;max-width:760px;height:430px;border:0;border-radius:24px;overflow:hidden" loading="lazy"></iframe>`;

  const shareCodeEl = document.getElementById('shareCode');
  const iframeCodeEl = document.getElementById('iframeCode');
  if (shareCodeEl) shareCodeEl.textContent = scriptCode;
  if (iframeCodeEl) iframeCodeEl.textContent = iframeCode;

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const selector = btn.getAttribute('data-copy');
      const target = document.querySelector(selector);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.textContent);
        const old = btn.textContent;
        btn.textContent = 'کپی شد';
        setTimeout(() => btn.textContent = old, 1300);
      } catch(e) {
        alert('کپی خودکار انجام نشد. کد را دستی انتخاب و کپی کنید.');
      }
    });
  });
})();
