/**
 * Wait for the entire HTML document to be fully loaded and parsed
 * before running any of the scripts to ensure all elements are available.
 */
document.addEventListener('DOMContentLoaded', () => {

    /*==================== MOBILE MENU LOGIC ====================*/
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Show the mobile menu when the hamburger icon is clicked
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Hide the mobile menu when the close icon ('X') is clicked
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Hide the mobile menu when any of the navigation links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });


    /*==================== HEADER SHADOW ON SCROLL ====================*/
       /*==================== SCROLL ANIMATION UP & DOWN ====================*/
    const scrollElements = document.querySelectorAll(
        'section, .experience__item, .work__card, .testimonial__card, .skill__item'
    );

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove class when scrolling up
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    scrollElements.forEach(el => {
        el.classList.add('reveal');
        scrollObserver.observe(el);
    });



    /*==================== THEME (DARK/LIGHT MODE) TOGGLE ====================*/
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Get the <html> element

    // Function to apply the selected theme and save it to localStorage
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Update the icon based on the theme
        if (theme === 'dark') {
            themeToggle.classList.replace('bx-moon', 'bx-sun');
        } else {
            themeToggle.classList.replace('bx-sun', 'bx-moon');
        }
    };

    // Check for a saved theme in localStorage when the page loads
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // Add a click event listener to the theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }


    /*==================== REVEAL ON SCROLL ANIMATION ====================*/
    const revealElements = document.querySelectorAll('section, .experience__item, .work__card, .testimonial__card, .skill__item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });


    /*==================== COPY TO CLIPBOARD FUNCTIONALITY ====================*/
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const idToCopy = e.currentTarget.dataset.copy;
            const textElement = document.getElementById(idToCopy);

            if (textElement) {
                navigator.clipboard.writeText(textElement.innerText).then(() => {
                    // Temporarily change the icon to a checkmark for user feedback
                    const originalIcon = e.currentTarget.innerHTML;
                    e.currentTarget.innerHTML = "<i class='bx bx-check' style='color: #10B981;'></i>";

                    // Revert the icon back after 1.5 seconds
                    setTimeout(() => {
                        e.currentTarget.innerHTML = originalIcon;
                    }, 1500);

                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    });

});