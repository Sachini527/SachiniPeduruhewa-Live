// script.js

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
let contactForm = null;

document.addEventListener('DOMContentLoaded', function () {
    contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });

            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 0);
    }
});

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

window.onload = function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("u7mw3I-nEiJ39Jra3");
        console.log("EmailJS initialized successfully");
    } else {
        console.error("EmailJS SDK not loaded. Make sure to include it in your HTML head.");
    }
};

function handleFormSubmission(e) {
    e.preventDefault();

    if (typeof emailjs === 'undefined') {
        alert("Email service is not available. Please try again later.");
        return;
    }

    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const emailInput = form.querySelector('#email');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        emailInput.classList.add('invalid');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        return;
    } else {
        emailInput.classList.remove('invalid');
    }

    const now = new Date();
    const formatted = now.toLocaleString();
    form.querySelector('#time').value = formatted;

    emailjs.sendForm("service_okf85cs", "template_20edwbc", form)
        .then((response) => {
            console.log("Email sent", response.status, response.text);
            alert("Message sent successfully!");
            form.reset();
        })
        .catch((error) => {
            console.error("Failed to send email:", error);
            alert("Error sending message. Please try again.");
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
}

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.querySelector('.back-to-top');

    // Show button when scrolling down 300px from the top
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
});
