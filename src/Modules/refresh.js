const reFresh = document.querySelector('#refresh');

const reFreshPage = (e) => {
  if (e.target.classList.contains('refresh')) {
    reFresh.setAttribute('animation', 'spin');
    window.location.reload();
    window.addEventListener('load', () => {
      reFresh.setTimeout(() => reFresh.classList.remove('animation'), 4500);
    });
  }
};
export default reFreshPage;