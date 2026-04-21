document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const chatDialog = document.getElementById('chatDialog');
    const openChatBtn = document.getElementById('openChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendMessageBtn = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    // 打开聊天窗口
    openChatBtn.addEventListener('click', () => {
        chatDialog.classList.add('show');
        // 显示欢迎消息
        if (chatMessages.children.length === 0) {
            appendMessage('assistant', '你好！我是电池AI助手，很高兴为您服务。请问有什么可以帮助您的吗？');
        }
    });

    // 关闭聊天窗口
    closeChatBtn.addEventListener('click', () => {
        chatDialog.classList.remove('show');
    });

    // 发送消息
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // 显示用户消息
        appendMessage('user', message);
        
        // 清空输入框
        userInput.value = '';

        // 模拟AI回复
        appendMessage('assistant', '正在思考...', 'loading');
        
        // 模拟延迟回复
        setTimeout(() => {
            // 移除加载消息
            removeLoadingMessage();
            // 添加AI回复
            appendMessage('assistant', '这是一个示例回复。要实现真实的AI对话，需要连接到后端API。');
        }, 1000);
    }

    // 添加消息到聊天窗口
    function appendMessage(role, content, className = '') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role} ${className}`;
        
        const avatarSrc = role === 'assistant' ? 'ai助手头像.png' : '使用者头像.png';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="${avatarSrc}" alt="${role} avatar">
            </div>
            <div class="message-content-wrapper">
                <div class="message-content">
                    ${content}
                </div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 移除加载消息
    function removeLoadingMessage() {
        const loadingMessage = chatMessages.querySelector('.message.loading');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }

    // 添加拖拽功能
    const chatHeader = document.querySelector('.chat-header');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    chatHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        if (e.target === closeChatBtn || e.target.parentElement === closeChatBtn) {
            return;
        }
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === chatHeader || e.target.parentElement === chatHeader) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, chatDialog);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    // 发送消息事件监听
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // 回车发送消息
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 自动调整输入框高度
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}); 