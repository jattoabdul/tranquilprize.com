// On the event day, mark the programme item that is happening now.
const items = document.querySelectorAll('.timeline li[data-start]');
const mark = () => {
  const now = Date.now();
  for (const item of items) {
    const live =
      now >= Date.parse(item.dataset.start) &&
      now < Date.parse(item.dataset.end);
    item.classList.toggle('is-now', live);
    let badge = item.querySelector('.now-badge');
    if (live && !badge) {
      badge = document.createElement('span');
      badge.className = 'now-badge';
      badge.textContent = 'Happening now';
      item.prepend(badge);
    } else if (!live && badge) {
      badge.remove();
    }
    if (live) item.setAttribute('aria-current', 'time');
    else item.removeAttribute('aria-current');
  }
};
if (items.length) {
  mark();
  setInterval(mark, 60000);
}
