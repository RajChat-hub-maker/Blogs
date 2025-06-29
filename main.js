fetch('posts.json')
  .then(res => res.json())
  .then(posts => {
    const container = document.querySelector('.blog-container');
    container.innerHTML = '';

    posts.forEach(post => {
      const div = document.createElement('div');
      div.className = 'post';
      div.innerHTML = `
        <h2>${post.title}</h2>
        <div class="meta">Posted on ${post.date} by ${post.author}</div>
        <p>${post.content}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    document.querySelector('.blog-container').innerHTML =
      "<p>🚫 Failed to load blog posts.</p>";
    console.error('Error loading posts:', err);
  });           
