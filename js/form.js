// Dogma Cables contact form.
// Sends via FormSubmit (no account needed). The owning inbox confirms
// once via the verification email FormSubmit delivers on the first
// submit; after that every submission lands in that inbox directly.
// Falls back to mailto if the network request fails.

const CONTACT_EMAIL = 'contact@dogmacables.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    const lang = document.documentElement.dataset.lang || 'en';
    const t = (en, da) => (lang === 'da' ? da : en);

    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    formData.append('_subject', `Inquiry from ${name || 'a customer'} — Dogma Cables`);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success !== 'false') {
        status.className = 'form-status success';
        status.textContent = t(
          "Thanks. Your message has been sent. We'll get back to you soon.",
          'Tak. Din besked er sendt. Vi vender tilbage til dig snarest.'
        );
        form.reset();
      } else {
        throw new Error('formsubmit error');
      }
    } catch (err) {
      openMailto(name, email, message, t);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});

function openMailto(name, email, message, t) {
  const subject = `Inquiry from ${name || 'a customer'} via Dogma Cables`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;

  const status = document.querySelector('.form-status');
  if (status) {
    status.className = 'form-status success';
    status.textContent = t(
      'Your mail client is opening. Press Send to deliver the message.',
      'Din mail-klient åbner. Tryk Send for at levere beskeden.'
    );
  }
}
