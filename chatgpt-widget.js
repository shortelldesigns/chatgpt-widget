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
    // Add your chat widget implementation here, using the sendMessageToChatGPT function to interact with ChatGPT.
})();
