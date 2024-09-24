const fetchPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    const contentDiv = document.getElementById('content');
    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
      contentDiv.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

fetchPosts();
