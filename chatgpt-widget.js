(function () {
    const SERVER_URL = 'https://k3smiayuwj.execute-api.us-east-2.amazonaws.com'; // You will replace this with your server URL after setting up the server.

    // Load chat widget styles
    const chatWidgetStyle = document.createElement('link');
    chatWidgetStyle.rel = 'stylesheet';
    chatWidgetStyle.href = 'chatgpt-widget.css';
    document.head.appendChild(chatWidgetStyle);

    // Create chat widget container
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chatgpt-widget-container';
    document.body.appendChild(chatWidgetContainer);

    // Load chat widget script
    const chatWidgetScript = document.createElement('script');
    chatWidgetScript.src = 'chatgpt-widget.js';
    chatWidgetContainer.appendChild(chatWidgetScript);

    // ChatGPT interaction
    async function sendMessageToChatGPT(message) {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        });
    
        const result = await response.json();
        return result.response.trim();
    }
        // Create chat area
    const chatArea = document.createElement('div');
    chatArea.id = 'chatgpt-chat-area';
    chatWidgetContainer.appendChild(chatArea);

    // Create input form
    const inputForm = document.createElement('form');
    inputForm.id = 'chatgpt-input-form';
    chatWidgetContainer.appendChild(inputForm);

    // Create input field
    const inputField = document.createElement('input');
    inputField.id = 'chatgpt-input-field';
    inputField.type = 'text';
    inputField.placeholder = 'Type your message here...';
    inputForm.appendChild(inputField);

    function appendMessage(text, sender) {
        const message = document.createElement('div');
        message.className = `chatgpt-message chatgpt-${sender}`;
        message.textContent = text;
        chatArea.appendChild(message);
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    inputForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const message = inputField.value;
        inputField.value = '';

        if (!message) return;

        appendMessage(message, 'user');

        const chatGPTResponse = await sendMessageToChatGPT(message);
        appendMessage(chatGPTResponse, 'chatgpt');
    });
