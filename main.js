let currentSlide = 0;
let slides = [];

async function loadPosts() {
  try {
    const res = await fetch('posts.json');
    const posts = await res.json();
    const container = document.querySelector('.blog-container');

    posts.forEach((post, i) => {
      const div = document.createElement('div');
      div.className = 'slide';
      div.style.transform = `translateY(${i * 100}%)`;

      div.innerHTML = `
        <h2>${post.title}</h2>
        <div class="meta">${post.date} by ${post.author}</div>
        <p>${post.content}</p>
      `;
      container.appendChild(div);
      slides.push(div);
    });
  } catch (err) {
    document.querySelector('.blog-container').innerHTML =
      "<p>🚫 Failed to load blog posts.</p>";
    console.error('Error loading posts:', err);
  }
}

function changeSlide(direction) {
  if (
    (direction === 1 && currentSlide >= slides.length - 1) ||
    (direction === -1 && currentSlide <= 0)
  ) return;

  currentSlide += direction;
  slides.forEach((slide, i) => {
    slide.style.transform = `translateY(${(i - currentSlide) * 100}%)`;
  });
}

function setupSwipe() {
  let startY = null;

  window.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
  });

  window.addEventListener('touchend', e => {
    if (startY === null) return;
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) changeSlide(1);  // swipe up
      else changeSlide(-1);         // swipe down
    }
    startY = null;
  });

  // Optional: desktop scroll
  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) changeSlide(1);
    else changeSlide(-1);
  });
}

loadPosts().then(setupSwipe);               
