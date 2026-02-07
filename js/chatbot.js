document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('chatbot-toggle');
    const panel = document.getElementById('chatbot-panel');
    const form = document.getElementById('chatbot-input-form');
    const input = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');
    const sendBtn = document.getElementById('chatbot-send');

    let conversationHistory = [];
    let isOpen = false;

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function toggleChat() {
        isOpen = !isOpen;
        toggle.classList.toggle('active', isOpen);
        panel.classList.toggle('open', isOpen);
        if (isOpen) {
            input.focus();
        }
    }

    function addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = 'chatbot-message ' + sender;
        msg.innerHTML = escapeHtml(text);
        messagesContainer.appendChild(msg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'chatbot-typing';
        typing.id = 'chatbot-typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typing);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('chatbot-typing');
        if (typing) {
            typing.remove();
        }
    }

    async function sendMessage(text) {
        addMessage(text, 'user');
        conversationHistory.push({ role: 'user', content: text });

        // Keep only last 10 messages
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }

        input.value = '';
        sendBtn.disabled = true;
        showTyping();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: conversationHistory }),
            });

            hideTyping();

            if (!response.ok) {
                const errorData = await response.json().catch(function () { return {}; });
                throw new Error(errorData.error || 'Something went wrong');
            }

            const data = await response.json();
            const reply = data.message;

            addMessage(reply, 'bot');
            conversationHistory.push({ role: 'assistant', content: reply });
        } catch (error) {
            hideTyping();
            addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
        } finally {
            sendBtn.disabled = false;
            input.focus();
        }
    }

    // Event listeners
    toggle.addEventListener('click', toggleChat);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            sendMessage(text);
        }
    });

    // Escape key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) {
            toggleChat();
        }
    });
});
