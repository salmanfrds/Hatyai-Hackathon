// const contentful = require('contentful');

const client = contentful.createClient({
    space: 'kzt2iaz9tgv2', // Replace with your Space ID
    accessToken: 'H_kuBTR262UFDP6goSKU3ZAITEfc7yWOEyrua0Eldvc', // Replace with your Access Token
});


client.getEntries({ content_type: 'careerAdvice' })
  .then(response => {
    const items = response.items;
    const contentDiv = document.getElementById('content');
// const contentful = require('contentful');

const client = contentful.createClient({
    space: 'kzt2iaz9tgv2', // Replace with your Space ID
    accessToken: 'H_kuBTR262UFDP6goSKU3ZAITEfc7yWOEyrua0Eldvc', // Replace with your Access Token
});

client.getEntries({ content_type: 'careerAdvice' })
  .then(response => {
    const items = response.items;
    const contentDiv = document.getElementById('content');

    items.forEach(item => {
      const image = item.fields.images;
      const imageHtml = image ? `<img src="${image.fields.file.url}" alt="${image.fields.title}">` : '';

      contentDiv.innerHTML += `
      
      <div class="w-full lg:w-2/3 lg:pr-8 p-4">
  <article class="bg-white rounded-lg shadow-lg p-6 mb-8">
    <h2 class="text-xl font-bold mb-2">${item.fields.title}</h2>
    <p class="text-gray-700 mb-4">${item.fields.descriptionAlt.substring(0, 100)}</p>
    <div>
      ${imageHtml}
    </div>
  </article>
</div>

      
      `;
    });
  })
  .catch(console.error);
    items.forEach(item => {
      contentDiv.innerHTML += `
      
        <h2>${item.fields.title}</h2>
        <div>
          ${item.fields.images.map(image => `<img src="${image.fields.file.url}" alt="${image.fields.title}">`).join('')}
        <p>${entry.fields.descriptionAlt}</p>

        </div>
      `;
    });
  })
  .catch(console.error);

  client.getEntries({ content_type: 'careerAdvice' })
  .then((response) => {
    const recentPostsContainer = document.querySelector('.recent-posts');
    response.items.forEach((post) => {
      const postLink = document.createElement('a');
      postLink.href = `/blog/${post.fields.slug}`;
      postLink.textContent = post.fields.title;
      postLink.className = 'text-blue-500 hover:underline';
      recentPostsContainer.appendChild(postLink);
    });
  })
  .catch(console.error);