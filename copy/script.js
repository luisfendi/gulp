console.log('lolofd dl')

window.addEventListener('scroll', () => {
  console.log('scroll')
})


const btn = document.querySelector('.button');
btn.addEventListener('click', () => {
  scrollTo({top: 0})
})