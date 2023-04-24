const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
const responseDiv = document.getElementById('response');

sendBtn.addEventListener('click', async () => {
  const message = messageInput.value;
  if (!message) return;

  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message })
  });

  const responseText = await response.json();
  responseDiv.textContent = responseText;
});
