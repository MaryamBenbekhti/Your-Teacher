document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Active Link Highlight
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 2. Scroll Reveal Effect
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-load');
    hiddenElements.forEach((el) => observer.observe(el));
});
// --- PRO FORM FEEDBACK ---
const proForm = document.getElementById('pro-contact-form');

if (proForm) {
    proForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Visual feedback on the button
        const btn = proForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'جاري الإرسال... <i class="fas fa-spinner fa-spin"></i>';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';

        // Simulate a network delay
        setTimeout(() => {
            btn.innerHTML = 'تم الإرسال بنجاح! ✓';
            btn.style.background = '#2E7D32'; // Green for success
            
            // Reset form
            proForm.reset();
            
            // Revert button after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = ''; 
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
            }, 3000);
        }, 1500);
    });
}