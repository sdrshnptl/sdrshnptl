// ===== MAIN JAVASCRIPT FUNCTIONALITY =====

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const typedTextElement = document.getElementById('typed-text');
const profileImg = document.getElementById('profile-img');

// ===== NAVIGATION FUNCTIONALITY =====

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== TYPING ANIMATION =====
const typingTexts = [
    'Full-Stack Developer',
    'Software Engineer',
    'Tech Enthusiast',
    'Problem Solver',
    'Code Artist'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// ===== EMAIL COPY FUNCTIONALITY =====
function copyEmail() {
    const email = 'hello@sudarshanpatil.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        // Modern approach using Clipboard API
        navigator.clipboard.writeText(email).then(() => {
            showCopyNotification('Email copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            fallbackCopyEmail(email);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyEmail(email);
    }
}

function fallbackCopyEmail(email) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification('Email copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy email: ', err);
        showCopyNotification('Please copy manually: ' + email);
    }
    
    document.body.removeChild(textArea);
}

function showCopyNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #22c55e;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        z-index: 9999;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .blog-card, .timeline-item, .about-text, .about-skills');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== PROFILE IMAGE ENHANCEMENT =====
if (profileImg) {
    // Add loading state
    profileImg.addEventListener('load', () => {
        profileImg.style.opacity = '1';
    });
    
    // Add error handling for profile image
    profileImg.addEventListener('error', () => {
        profileImg.src = `https://ui-avatars.com/api/?name=Sudarshan+Patil&size=300&background=1e3a8a&color=ffffff&bold=true`;
    });
}

// ===== SKILLS ANIMATION =====
function animateSkills() {
    const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== STATS COUNTER ANIMATION =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 50);
    });
}

// ===== CALENDAR INTEGRATION ENHANCEMENT =====
function initializeCalendar() {
    const calendarIframe = document.querySelector('.calendar-embed iframe');
    const fallbackButton = document.querySelector('.calendar-fallback .btn');
    
    if (calendarIframe) {
        // Add loading state
        const loadingIndicator = document.createElement('div');
        loadingIndicator.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 300px;
                background: #f8fafc;
                border-radius: 10px;
                color: #666;
                font-size: 1.1rem;
            ">
                <i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>
                Loading calendar...
            </div>
        `;
        
        calendarIframe.parentNode.insertBefore(loadingIndicator, calendarIframe);
        
        calendarIframe.addEventListener('load', () => {
            loadingIndicator.remove();
            calendarIframe.style.display = 'block';
        });
        
        // Error handling
        calendarIframe.addEventListener('error', () => {
            loadingIndicator.innerHTML = `
                <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 300px;
                    background: #f8fafc;
                    border-radius: 10px;
                    color: #666;
                    text-align: center;
                    padding: 2rem;
                ">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem; color: #f59e0b;"></i>
                    <p>Calendar temporarily unavailable</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Please use the direct link below</p>
                </div>
            `;
        });
    }
}

// ===== SOCIAL LINKS TRACKING =====
function trackSocialClick(platform) {
    // Analytics tracking can be added here
    console.log(`User clicked on ${platform} link`);
    
    // You can integrate with Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            'social_platform': platform,
            'event_category': 'engagement'
        });
    }
}

// Add click tracking to social links
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link, .hero-social a, .footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.href.includes('github') ? 'GitHub' :
                           link.href.includes('linkedin') ? 'LinkedIn' :
                           link.href.includes('twitter') ? 'Twitter' :
                           link.href.includes('instagram') ? 'Instagram' :
                           link.href.includes('mailto') ? 'Email' : 'Unknown';
            
            trackSocialClick(platform);
        });
    });
});

// ===== THEME DETECTION =====
function detectUserPreference() {
    // Detect if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode-preferred');
    }
    
    // Listen for changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode-preferred');
        } else {
            document.body.classList.remove('dark-mode-preferred');
        }
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add lazy loading
        img.loading = 'lazy';
        
        // Add error handling
        img.addEventListener('error', () => {
            this.style.opacity = '0.5';
            console.warn('Failed to load image:', this.src);
        });
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.copy-btn, .project-card, .social-link');
    
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #1e3a8a;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    
    // Optional: Send error to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.toString(),
            'fatal': false
        });
    }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sudarshan Patil\'s website loaded successfully!');
    
    // Initialize all features
    initializeCalendar();
    detectUserPreference();
    optimizeImages();
    enhanceAccessibility();
    
    // Animate elements after a short delay
    setTimeout(() => {
        animateSkills();
    }, 1000);
    
    // Initialize stats animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
});

// ===== CONTACT FORM VALIDATION (if form is added later) =====
function validateContactForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

// ===== GITHUB API INTEGRATION (Optional enhancement) =====
async function fetchGitHubStats() {
    try {
        const response = await fetch('https://api.github.com/users/sdrshnptl');
        const data = await response.json();
        
        // Update stats with real GitHub data
        const repoCount = data.public_repos;
        const followersCount = data.followers;
        
        // This can be used to dynamically update stats
        console.log('GitHub Stats:', { repos: repoCount, followers: followersCount });
        
    } catch (error) {
        console.warn('Failed to fetch GitHub stats:', error);
    }
}

// ===== EXPORT FUNCTIONS FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        copyEmail,
        validateContactForm,
        trackSocialClick
    };
}
