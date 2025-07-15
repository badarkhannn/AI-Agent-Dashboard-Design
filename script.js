// Theme Toggle Functionality
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        themeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Toggle dark theme
        if (button.textContent.includes('Dark')) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeButtons[1].classList.add('active');
    themeButtons[0].classList.remove('active');
}

// Navigation Item Functionality
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Add click animation
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);
    });
});

// Agent Avatar Selection
const avatars = document.querySelectorAll('.avatar');
let selectedAvatar = null;

avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
        // Remove selection from previously selected avatar
        if (selectedAvatar) {
            selectedAvatar.style.border = 'none';
            selectedAvatar.style.transform = 'scale(1)';
        }
        
        // Add selection to clicked avatar
        avatar.style.border = '3px solid #007aff';
        avatar.style.transform = 'scale(1.1)';
        selectedAvatar = avatar;
        
        // Add click animation
        avatar.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            avatar.style.animation = '';
        }, 300);
    });
});

// Chat Input Functionality
const chatInput = document.querySelector('.input-container input');
const sendButton = document.querySelector('.send-btn');
const chatMessages = document.querySelector('.chat-messages');
const refreshButton = document.querySelector('.refresh-btn');

// Send message function
function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === '') return;
    
    // Create user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<span>${messageText}</span>`;
    
    // Add to chat
    chatMessages.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate AI response after a delay
    setTimeout(() => {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <span>I understand your question about "${messageText}". Let me help you with that. This is a simulated response to demonstrate the chat functionality.</span>
        `;
        
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Send button click
sendButton.addEventListener('click', sendMessage);

// Enter key press
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Refresh button functionality
refreshButton.addEventListener('click', () => {
    refreshButton.style.transform = 'rotate(360deg)';
    refreshButton.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
        refreshButton.style.transform = 'rotate(0deg)';
    }, 500);
    
    // Clear chat messages except the initial ones
    const initialMessages = chatMessages.querySelectorAll('.message');
    const messagesToRemove = Array.from(initialMessages).slice(2); // Keep first 2 messages
    
    messagesToRemove.forEach(message => {
        message.remove();
    });
});

// Input focus effects
chatInput.addEventListener('focus', () => {
    chatInput.parentElement.style.borderColor = '#007aff';
    chatInput.parentElement.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
});

chatInput.addEventListener('blur', () => {
    chatInput.parentElement.style.borderColor = '#e5e5e7';
    chatInput.parentElement.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
});

// Welcome orb animation enhancement
const welcomeOrb = document.querySelector('.welcome-orb');
if (welcomeOrb) {
    welcomeOrb.addEventListener('mouseenter', () => {
        welcomeOrb.style.transform = 'scale(1.1) translateY(-10px)';
        welcomeOrb.style.transition = 'transform 0.3s ease';
    });
    
    welcomeOrb.addEventListener('mouseleave', () => {
        welcomeOrb.style.transform = 'scale(1) translateY(0px)';
    });
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1.1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1.1); }
    }
    
    .nav-item {
        transition: transform 0.15s ease;
    }
`;
document.head.appendChild(style);

// Auto-resize functionality for better UX
window.addEventListener('resize', () => {
    const container = document.querySelector('.container');
    if (window.innerWidth < 768) {
        container.style.margin = '10px';
    } else {
        container.style.margin = '20px';
    }
});

// Initialize chat with typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message ai-message typing';
    typingIndicator.innerHTML = `
        <div class="ai-avatar">🤖</div>
        <span>Typing...</span>
    `;
    typingIndicator.style.opacity = '0.7';
    
    return typingIndicator;
}

// Enhanced send message with typing indicator
const originalSendMessage = sendMessage;
sendMessage = function() {
    const messageText = chatInput.value.trim();
    if (messageText === '') return;
    
    // Create user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<span>${messageText}</span>`;
    
    // Add to chat
    chatMessages.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate AI response after a delay
    setTimeout(() => {
        // Remove typing indicator
        typingIndicator.remove();
        
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <span>I understand your question about "${messageText}". Let me help you with that. This is a simulated response to demonstrate the chat functionality.</span>
        `;
        
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
};

console.log('EQUILINK UI initialized successfully!');