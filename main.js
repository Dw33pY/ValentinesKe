/* PREMIUM CAROUSEL */
class PremiumCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.dot');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.currentIndex = 0;
    this.interval = null;
    this.intervalTime = 5000;
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    // Initialize first slide
    this.showSlide(this.currentIndex);
    
    // Start auto-rotation
    this.startAutoRotate();
    
    // Add event listeners
    this.prevBtn?.addEventListener('click', () => {
      this.stopAutoRotate();
      this.prevSlide();
      this.startAutoRotate();
    });
    
    this.nextBtn?.addEventListener('click', () => {
      this.stopAutoRotate();
      this.nextSlide();
      this.startAutoRotate();
    });
    
    // Add dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.stopAutoRotate();
        this.showSlide(index);
        this.startAutoRotate();
      });
    });
    
    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel?.addEventListener('mouseenter', () => this.stopAutoRotate());
    carousel?.addEventListener('mouseleave', () => this.startAutoRotate());
  }
  
  showSlide(index) {
    // Hide all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
    });
    
    // Remove active from all dots
    this.dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    this.currentIndex = (index + this.slides.length) % this.slides.length;
    this.slides[this.currentIndex].classList.add('active');
    this.slides[this.currentIndex].style.opacity = '1';
    
    // Activate corresponding dot
    if (this.dots[this.currentIndex]) {
      this.dots[this.currentIndex].classList.add('active');
    }
  }
  
  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }
  
  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }
  
  startAutoRotate() {
    this.stopAutoRotate();
    this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
  }
  
  stopAutoRotate() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}


/* PREMIUM NAVIGATION - Enhanced with WhatsApp link support */
class PremiumNavigation {
  constructor() {
    this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    this.mainNav = document.querySelector('.main-nav');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.navbar = document.querySelector('.premium-navbar');
    
    this.init();
  }
  
  init() {
    // Mobile menu toggle
    this.mobileMenuBtn?.addEventListener('click', () => {
      this.mainNav.classList.toggle('active');
      const icon = this.mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
    
    // Close mobile menu when clicking a link (except WhatsApp links)
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Don't close menu immediately for WhatsApp links on mobile
        if (link.href.includes('whatsapp') && window.innerWidth <= 768) {
          // Keep menu open for a moment so user knows where they clicked
          setTimeout(() => {
            this.closeMobileMenu();
          }, 100);
        } else {
          this.closeMobileMenu();
        }
      });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        this.navbar.querySelector('.nav-container').style.padding = '0.8rem 2rem';
      } else {
        this.navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
        this.navbar.querySelector('.nav-container').style.padding = '1.2rem 2rem';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.mainNav.contains(e.target) && 
          !this.mobileMenuBtn.contains(e.target) &&
          this.mainNav.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }
  
  closeMobileMenu() {
    this.mainNav?.classList.remove('active');
    const icon = this.mobileMenuBtn?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
}
/* CATALOGUE FILTER */
class CatalogueFilter {
  constructor() {
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.products = document.querySelectorAll('.product');
    
    this.init();
  }
  
  init() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        this.filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.dataset.filter;
        
        // Filter products
        this.filterProducts(filter);
      });
    });
  }
  
  filterProducts(filter) {
    this.products.forEach(product => {
      const category = product.dataset.category;
      
      if (filter === 'all' || category === filter) {
        product.style.display = 'block';
        setTimeout(() => {
          product.style.opacity = '1';
          product.style.transform = 'translateY(0)';
        }, 10);
      } else {
        product.style.opacity = '0';
        product.style.transform = 'translateY(20px)';
        setTimeout(() => {
          product.style.display = 'none';
        }, 300);
      }
    });
  }
}

/* SMOOTH SCROLL */
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

/* BACK TO TOP */
class BackToTop {
  constructor() {
    this.button = document.getElementById('backToTop');
    
    this.init();
  }
  
  init() {
    if (!this.button) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        this.button.style.display = 'flex';
        setTimeout(() => {
          this.button.style.opacity = '1';
        }, 10);
      } else {
        this.button.style.opacity = '0';
        setTimeout(() => {
          this.button.style.display = 'none';
        }, 300);
      }
    });
    
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* REVEAL ANIMATION */
class RevealAnimation {
  constructor() {
    this.reveals = document.querySelectorAll('.reveal');
    
    this.init();
  }
  
  init() {
    // Initial check
    this.checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', () => this.checkVisibility());
    
    // Check on resize
    window.addEventListener('resize', () => this.checkVisibility());
  }
  
  checkVisibility() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    this.reveals.forEach(element => {
      const revealTop = element.getBoundingClientRect().top;
      
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        // Optional: remove active class when out of view
        // element.classList.remove('active');
      }
    });
  }
}

/* PREMIUM HOVER EFFECTS */
class PremiumHoverEffects {
  constructor() {
    this.init();
  }
  
  init() {
    // Add hover effects to products
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
      product.addEventListener('mouseenter', () => {
        product.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      product.addEventListener('mouseleave', () => {
        product.style.transform = 'translateY(0) scale(1)';
      });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn, .btn-inquire');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
    });
  }
}

/* PAGE TRANSITIONS */
class PageTransitions {
  constructor() {
    this.init();
  }
  
  init() {
    // Prevent flash of unstyled content
    document.body.style.opacity = '0';
    
    window.addEventListener('DOMContentLoaded', () => {
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '1';
    });
    
    // Smooth page transitions for internal links
    document.querySelectorAll('a[href^="/"], a[href^="."]').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.target === '_blank' || link.hasAttribute('download')) return;
        
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          e.preventDefault();
          
          document.body.style.opacity = '0';
          
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });
    });
  }
}

/* INITIALIZE EVERYTHING */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  const carousel = new PremiumCarousel();
  const navigation = new PremiumNavigation();
  const smoothScroll = new SmoothScroll();
  const backToTop = new BackToTop();
  const revealAnimation = new RevealAnimation();
  const hoverEffects = new PremiumHoverEffects();
  const pageTransitions = new PageTransitions();
  
  // Initialize catalogue filter only on catalogue page
  if (document.querySelector('.category-filter')) {
    const catalogueFilter = new CatalogueFilter();
  }
  
  // Add loading animation to images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });
  
  // Add parallax effect to parallax sections
  window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.premium-parallax');
    if (parallax) {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      parallax.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
  });
  
  // Add keyboard navigation for carousel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      carousel.stopAutoRotate();
      carousel.prevSlide();
      carousel.startAutoRotate();
    } else if (e.key === 'ArrowRight') {
      carousel.stopAutoRotate();
      carousel.nextSlide();
      carousel.startAutoRotate();
    }
  });
  
  console.log('🎁 Valentine\'s KE Premium Website Initialized');
});

/* ERROR HANDLING */
window.addEventListener('error', function(e) {
  console.error('Website Error:', e.error);
  return true;
});
