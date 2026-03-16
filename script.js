// app.js

document.addEventListener('DOMContentLoaded', () => {

    // Init ScrollMagic Controller
    const controller = new ScrollMagic.Controller();

    // Select all story sections
    const storySections = document.querySelectorAll('.story-section');

    storySections.forEach((section) => {
        // Find the parallax background element within the section
        const parallaxBg = section.querySelector('.background-parallax');

        // Create a new GSAP tween for the parallax effect
        // The background moves from its top position to a higher position
        const parallaxTween = gsap.fromTo(parallaxBg, 
            { y: '-30%' }, // Start position (e.g., 30% above the top)
            { y: '30%', ease: 'none' } // End position (e.g., 30% below the top)
        );

        // Create a ScrollMagic scene
        new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 1, // Start the animation when the top of the section hits the bottom of the viewport
            duration: '100%' // The animation lasts for the full height of the section
        })
        .setTween(parallaxTween)
        .addTo(controller);
    });

});