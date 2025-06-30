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
        <footer>
    &copy; 2025 <strong>SalesAutoMate™</strong> |
    <a href="https://www.salesautomate.site" target="_blank" title="Visit site">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007acc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    </a>
  </footer>
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
  const total = slides.length;
  currentSlide = (currentSlide + direction + total) % total;
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
            
