(function () {
    const btnNavClicked = document.querySelectorAll('#nav-side');
    const currentPath = window.location.pathname;

    btnNavClicked.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.firstElementChild.classList.add(
                "bg-borders-and-btn", 
                "text-black",
                "hover:bg-btn-hover!"
            )
        }
    })
})()