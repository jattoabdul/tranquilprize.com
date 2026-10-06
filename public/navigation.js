const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
if (button && nav) {
  button.hidden = false;
  nav.dataset.enhanced = 'true';
  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      close();
      button.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-header')) close();
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', close);
}
