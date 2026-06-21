(() => {
  const script = document.currentScript;
  if (!script) return;

  const scriptUrl = new URL(script.src);
  const baseUrl = scriptUrl.href.replace(/widget\.js(?:\?.*)?$/, '');
  const width = script.dataset.width || '100%';
  const height = script.dataset.height || '430';
  const maxWidth = script.dataset.maxWidth || '760px';
  const radius = script.dataset.radius || '24px';

  const iframe = document.createElement('iframe');
  iframe.src = baseUrl + 'embed.html';
  iframe.title = script.dataset.title || 'آیه تصادفی قرآن';
  iframe.loading = 'lazy';
  iframe.style.width = width;
  iframe.style.maxWidth = maxWidth;
  iframe.style.height = /^\d+$/.test(height) ? height + 'px' : height;
  iframe.style.border = '0';
  iframe.style.borderRadius = radius;
  iframe.style.overflow = 'hidden';
  iframe.style.display = 'block';
  iframe.style.margin = script.dataset.margin || '16px auto';
  iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

  script.insertAdjacentElement('afterend', iframe);
})();
