class NewYearGift2026 {
    constructor() {
        this.gift = document.querySelector('.premium-gift');
        this.message = document.querySelector('.premium-message');
        this.instruction = document.querySelector('.instruction');
        this.isOpened = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.addTouchSupport();
        this.setupAutoOpen();
        this.addLoadingAnimation();
    }
    
    setupEventListeners() {
        // Click event
        this.gift.addEventListener('click', () => this.openGift());
        
        // Keyboard support
        this.gift.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openGift();
            }
        });
        
        // Hover effects
        this.gift.addEventListener('mouseenter', () => {
            if (!this.isOpened) {
                this.gift.style.transform = 'scale(1.05) rotateY(10deg)';
            }
        });
        
        this.gift.addEventListener('mouseleave', () => {
            if (!this.isOpened) {
                this.gift.style.transform = 'scale(1)';
            }
        });
    }
    
    addTouchSupport() {
        // Touch feedback
        this.gift.addEventListener('touchstart', (e) => {
            if (!this.isOpened) {
                this.gift.style.transform = 'scale(0.95)';
            }
            e.preventDefault();
        }, { passive: false });
        
        this.gift.addEventListener('touchend', (e) => {
            if (!this.isOpened) {
                this.gift.style.transform = 'scale(1)';
                this.openGift();
            }
            e.preventDefault();
        }, { passive: false });
    }
    
    openGift() {
        if (this.isOpened) return;
        
        this.isOpened = true;
        
        // Add opened class for animation
        this.gift.classList.add('opened');
        
        // Play opening sound
        this.playSound();
        
        // Update instruction
        this.instruction.innerHTML = '<i class="fas fa-sparkles"></i> Your gift is opening...';
        this.instruction.style.animation = 'none';
        
        // Show message after delay
        setTimeout(() => {
            this.showMessage();
        }, 800);
    }
    
    showMessage() {
        // Show message with animation
        this.message.style.display = 'block';
        
        // Create premium confetti
        this.createPremiumConfetti();
        
        // Scroll to message on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                this.message.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300);
        }
        
        // Update instruction
        setTimeout(() => {
            this.instruction.innerHTML = '<i class="fas fa-gift"></i> Gift opened! Happy New Year!';
            this.instruction.style.color = '#4CAF50';
        }, 1000);
        
        // Disable gift interaction
        this.gift.style.pointerEvents = 'none';
        this.gift.style.cursor = 'default';
    }
    
    createPremiumConfetti() {
        const confettiCount = window.innerWidth < 768 ? 40 : 60;
        const colors = ['#FFD700', '#FF416C', '#4CAF50', '#8a2be2', '#00BCD4', '#FF9800'];
        const emojis = ['🎉', '🎊', '✨', '🌟', '💫', '🎁', '🥳'];
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                this.createConfettiPiece(colors, emojis, i);
            }, i * 30);
        }
    }
    
    createConfettiPiece(colors, emojis, index) {
        const confetti = document.createElement('div');
        const isEmoji = Math.random() > 0.4;
        
        if (isEmoji) {
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 25 + 20}px;
                z-index: 9999;
                top: -50px;
                left: ${Math.random() * 100}%;
                opacity: 0.9;
                filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));
                pointer-events: none;
            `;
        } else {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 15 + 10;
            const shape = Math.random() > 0.5 ? '50%' : '0';
            
            confetti.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${shape};
                z-index: 9999;
                top: -50px;
                left: ${Math.random() * 100}%;
                opacity: 0.9;
                box-shadow: 0 2px 10px ${color}40;
                pointer-events: none;
            `;
        }
        
        document.body.appendChild(confetti);
        
        // Animation
        const duration = Math.random() * 2500 + 1500;
        const xDistance = (Math.random() * 300 - 150) + 'px';
        
        const animation = confetti.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translate(${xDistance}, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
    
    playSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Magic sound effect
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log("Sound not supported");
        }
    }
    
    setupAutoOpen() {
        // Auto-open after 12 seconds
        setTimeout(() => {
            if (!this.isOpened) {
                this.instruction.innerHTML = '<i class="fas fa-magic"></i> Opening your special gift...';
                setTimeout(() => this.openGift(), 1500);
            }
        }, 12000);
    }
    
    addLoadingAnimation() {
        // Page load animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const app = new NewYearGift2026();
    
    // Make accessible via Enter key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !app.isOpened) {
            app.openGift();
        }
    });
});