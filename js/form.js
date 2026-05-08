// Dogma Cables contact form.
// Sends via Formspree if configured, falls back to mailto otherwise.

const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // erstat med rigtig ID fra formspree.io
const FALLBACK_EMAIL = 'hansmlauridsen@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (FORMSPREE_ID && FORMSPREE_ID !== 'YOUR_FORMSPREE_ID') {
      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData,
        });
        if (response.ok) {
          status.className = 'form-status success';
          status.textContent = 'Tak. Beskeden er sendt. Hans melder tilbage hurtigst muligt.';
          form.reset();
        } else {
          throw new Error('formspree error');
        }
      } catch (err) {
        openMailto(name, email, message);
      }
    } else {
      openMailto(name, email, message);
    }
  });
});

function openMailto(name, email, message) {
  const subject = `Henvendelse fra ${name || 'kunde'} via dogmacables.dk`;
  const body = `Navn: ${name}\nEmail: ${email}\n\n${message}`;
  const url = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;

  const status = document.querySelector('.form-status');
  if (status) {
    status.className = 'form-status success';
    status.textContent = 'Din mail-klient åbnes nu. Tryk Send for at afsende beskeden til Hans.';
  }
}
