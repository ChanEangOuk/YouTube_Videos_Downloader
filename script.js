document.getElementById('downloadBtn').addEventListener('click', function () {
  const videoUrl = document.getElementById('videoUrl').value.trim();
  const messageDiv = document.getElementById('message');

  if (!videoUrl) {
    messageDiv.textContent = 'Please enter a valid YouTube video URL.';
    messageDiv.style.color = 'red';
    messageDiv.style.display = 'block';
    return;
  }

  // Show processing message
  messageDiv.textContent = 'Processing your download...';
  messageDiv.style.color = 'blue';
  messageDiv.style.display = 'block';

  // Send the video URL to a backend API
  fetch('https://api.y2mate.is/en58/', { // Example API endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: videoUrl }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Extract the download link from the API response
        const downloadLink = data.result.filter((item) => item.k === '1080')[0]?.url || data.result[0].url;

        // Display the download link
        messageDiv.textContent = 'Download completed! Click the link below:';
        messageDiv.style.color = 'green';

        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = downloadLink;
        downloadAnchor.textContent = 'Click here to download';
        downloadAnchor.target = '_blank';
        downloadAnchor.style.display = 'block';
        downloadAnchor.style.marginTop = '10px';
        messageDiv.appendChild(downloadAnchor);
      } else {
        messageDiv.textContent = 'An error occurred while processing your request.';
        messageDiv.style.color = 'red';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      messageDiv.textContent = 'An error occurred while processing your request.';
      messageDiv.style.color = 'red';
    });
});