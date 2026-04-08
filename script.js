/* ====================== sticky  navbar =====================*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active');
};




/*======================scroll sections active link =====================*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    })
    /* ====================== sticky  navbar =====================*/

    let header = document.querySelector('header');

    header.classList.toggle('sticky',window.scrollY > 100);

    /*====================== remove toggle icon and navbar when click navbar link (scroll) =====================*/
    menuIcon.classList.toggle('bx-x');
    menuIcon.classList.toggle('active');

}

 /*======================scroll reveal =====================*/

  ScrollReveal({ 
    // reset: true, 
    distance: '80px',
    duration: 2000,
    delay: 200
  });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .skills-category, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });  
        ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });  

/* ====================== Skills progress bar animation =====================*/
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 50;
        if (isVisible && bar.style.width === '') {
            const targetWidth = bar.getAttribute('data-width') + '%';
            bar.style.width = targetWidth;
        }
    });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', () => setTimeout(animateSkills, 400));

/* ====================== typed js =====================*/
const typed = new Typed('.multiple-text',{
    strings: [
        "a Junior Fullstack Developer",
        "a Motivated Software Developer",
        "an Aspiring AI Engineer"
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    startDelay: 300,
    loop: true,
    smartBackspace: true
})
