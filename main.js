const titles = ["Game Developer", "Program Manager", "Consultant", "Founder", "Duck Collector"];
const typingSpeed = 100;   // ms per letter
const erasingSpeed = 50;   // ms per letter
const delayBetween = 1500; // pause before erasing
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const jobTitle = document.getElementById("job-title");

window.addEventListener('DOMContentLoaded', () => {
    const pageIntro = document.querySelector('.page-intro');
    // Add animate class after a short delay
    setTimeout(() => {
        pageIntro.classList.add('animate');
    }, 100); // 100ms to ensure DOM is ready
});

function typeEffect() {
  const currentTitle = titles[titleIndex];
  
  if (!isDeleting) {
    jobTitle.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetween);
      return;
    }
  } else {
    jobTitle.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
  }
  
  setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);


// Select all sections and nav links
const sections = document.querySelectorAll("main .content section");
const navLinks = document.querySelectorAll("aside ul li a");

// Highlight active link on scroll
window.addEventListener("scroll", () => {
  let current = "";

  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  // 🔥 If we're near the bottom, force "contact" active
  if (scrollPosition + windowHeight >= documentHeight - 100) {
    current = "contact";
  }

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


document.querySelectorAll('.card-container').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const mobileMenu = document.querySelector('.mobile-menu-modal');

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "";
});

// Close menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

document.querySelectorAll('.game-card[data-video]').forEach(card => {
    const video = card.querySelector('.hover-video');
    const img = card.querySelector('img');
    const videoSrc = card.dataset.video;

    card.addEventListener('mouseenter', () => {
        if (!video.src) {
            video.src = videoSrc; // lazy-load
            video.load();
        }
        img.style.visibility = 'hidden';
        video.style.display = 'block';
        video.play();
    });

    card.addEventListener('mouseleave', () => {
        video.pause();
        video.style.display = 'none';
        img.style.visibility = 'visible';
    });
});