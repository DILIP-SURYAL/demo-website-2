function locomotiveCode() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

locomotiveCode();

function cursorEffect() {
    var cursor = document.querySelector(".cursor")
    var pageContent = document.querySelector(".page1-content")

    pageContent.addEventListener("mousemove", (evt) => {
        gsap.to(cursor, {
            x: evt.x - 800,
            y: evt.y
        })
    })

    pageContent.addEventListener("mouseenter", () => {
        gsap.to(cursor, {scale: 1})
    })
    pageContent.addEventListener("mouseleave", () => {
        gsap.to(cursor, {scale: 0})
    })
}

cursorEffect();

gsap.from(".page2-upper h2", {
    y:90,
    opacity:0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
        trigger: ".page2",
        scroller: ".main",
        start: "top 40%",
        end: "top 41%",
        // markers: true,
        scrub: 3
    }
},"anim")
gsap.from(".para span", {
    y:100,
    opacity:0,
    stagger: 0.2,
    duration: 4,
    scrollTrigger: {
        trigger: ".page2",
        scroller: ".main",
        start: "top 35%",
        end: "top 36%",
        // markers: true,
        scrub: 3
    }
},"anim")
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});