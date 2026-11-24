document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Typing Effect
    const textArray = ["Full Stack Developer", "Report Specialist", "IT Officer", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    const typingElement = document.querySelector(".typing-text");

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typingElement.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    setTimeout(type, newTextDelay + 250);

    // 2. Scroll Reveal Animations
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3. Active Nav Link Highlighting
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach((li) => {
            li.classList.remove("active");
            if (li.getAttribute("href") === `#${current}`) {
                li.classList.add("active");
            }
        });
    });
        // 4. Handle Contact Form Submission (AJAX) & Redirect to Home
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the page from reloading or going to Formspree
            
            // Get the Formspree URL from the form's action attribute
            const formAction = contactForm.getAttribute('action');
            const formData = new FormData(contactForm);
            
            // Change button text to show loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Send the data to Formspree in the background
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // 1. Show success message
                    alert("Message sent successfully! I will get back to you soon.");
                    
                    // 2. Clear the form
                    contactForm.reset();
                    
                    // 3. Smoothly scroll back to the Home page
                    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                    
                    // 4. Update the URL back to #home (without jumping)
                    history.pushState(null, null, '#home');
                } else {
                    alert("Oops! There was a problem sending your message. Please try again.");
                }
            })
            .catch(error => {
                alert("Oops! There was a network error. Please try again.");
            })
            .finally(() => {
                // Restore button text
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});