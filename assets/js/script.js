'use strict';

        // Navbar toggle in mobile
        document.querySelector('[data-nav-toggler]').addEventListener('click', function() {
            document.querySelector('[data-navbar]').classList.toggle('active');
        });
        
        

/**
 * Header scoll state
 */
// const $header= document.querySelector("[data-header]");
// window.addEventListener("scroll",()=> ){
// $header.classList[window.scroll > 50? 'add': "remove"]("active")
// })



        const $header = document.querySelector("[data-header]");
        window.addEventListener("scroll", () => {
            $header.classList[window.scrollY > 50 ? 'add' : 'remove']("active");
        });

// Add to favaite button toggle
const $toggleBtns = document.querySelectorAll("[data-toggle-btn]"); // querySelectorAll ব্যবহার করুন
$toggleBtns.forEach($toggleBtn => { // প্রতিটি উপাদানের জন্য লুপ করুন
    $toggleBtn.addEventListener('click', () => {
        $toggleBtn.classList.toggle("favicon"); // এখানে $toggleBtn ব্যবহার করুন
    });
});

