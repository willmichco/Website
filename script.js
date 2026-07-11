const header = document.querySelector('#site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];

if (header) {
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
  });
}

navLinks.forEach((link) => link.addEventListener('click', () => {
  nav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const form = document.querySelector('#contact-form');
if (form) {
  const formStatus = form.querySelector('.form-success');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')?.toString().trim() || '';
    const phone = data.get('phone')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const service = data.get('service')?.toString().trim() || 'Chưa chọn lĩnh vực';
    const message = data.get('message')?.toString().trim() || 'Chưa cung cấp nội dung chi tiết';
    const subject = `Yêu cầu tư vấn pháp lý - ${service}`;
    const body = [
      `Họ và tên: ${name}`,
      `Số điện thoại: ${phone}`,
      `Email: ${email || 'Không cung cấp'}`,
      `Lĩnh vực: ${service}`,
      '',
      'Nội dung cần tư vấn:',
      message,
    ].join('\n');
    if (formStatus) {
      formStatus.textContent = `Cảm ơn ${name || 'bạn'}. Ứng dụng email sẽ mở để bạn kiểm tra và gửi yêu cầu.`;
      formStatus.classList.add('visible');
    }
    window.location.href = `mailto:luatsunam.hcm@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const legacyCallButton = document.querySelector('body > .floating-call');

if (legacyCallButton) {
  const floatingContact = document.createElement('div');
  const floatingActions = document.createElement('div');
  const floatingToggle = document.createElement('button');

  floatingContact.className = 'floating-contact';
  floatingActions.className = 'floating-actions';
  floatingActions.id = 'floating-contact-menu';
  floatingActions.setAttribute('aria-hidden', 'true');
  floatingActions.innerHTML = `
    <a href="tel:0983498499"><span class="floating-action-icon" aria-hidden="true">☎</span><span><strong>Gọi ngay</strong><small>0983 498 499</small></span></a>
    <a href="https://zalo.me/0983498499" target="_blank" rel="noopener"><span class="floating-action-icon zalo" aria-hidden="true">Z</span><span><strong>Zalo</strong><small>Nhắn tin tư vấn</small></span></a>
    <a href="mailto:luatsunam.hcm@gmail.com"><span class="floating-action-icon" aria-hidden="true">✉</span><span><strong>Gửi mail</strong><small>luatsunam.hcm@gmail.com</small></span></a>
  `;

  floatingToggle.className = 'floating-call';
  floatingToggle.type = 'button';
  floatingToggle.setAttribute('aria-expanded', 'false');
  floatingToggle.setAttribute('aria-controls', floatingActions.id);
  floatingToggle.setAttribute('aria-label', 'Mở các phương thức liên hệ');
  floatingToggle.innerHTML = '<span aria-hidden="true">☎</span><small>Liên hệ</small>';

  legacyCallButton.replaceWith(floatingContact);
  floatingContact.append(floatingActions, floatingToggle);

  const setFloatingContactOpen = (isOpen) => {
    floatingContact.classList.toggle('open', isOpen);
    floatingToggle.setAttribute('aria-expanded', String(isOpen));
    floatingToggle.setAttribute('aria-label', isOpen ? 'Đóng các phương thức liên hệ' : 'Mở các phương thức liên hệ');
    floatingActions.setAttribute('aria-hidden', String(!isOpen));
  };

  floatingToggle.addEventListener('click', () => {
    setFloatingContactOpen(!floatingContact.classList.contains('open'));
  });

  document.addEventListener('click', (event) => {
    if (!floatingContact.contains(event.target)) setFloatingContactOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !floatingContact.classList.contains('open')) return;
    setFloatingContactOpen(false);
    floatingToggle.focus();
  });
}
