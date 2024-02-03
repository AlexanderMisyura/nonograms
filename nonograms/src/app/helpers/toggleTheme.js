export default function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  document.querySelectorAll('.button').forEach((btn) => {
    btn.classList.toggle('is-white');
    btn.classList.toggle('is-dark');
  });
}
