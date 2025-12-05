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

    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleSidebar");
    const toggleIcon = document.getElementById("toggleIcon");

    toggleBtn.addEventListener("click", () => {
        const isClosed = sidebar.classList.contains("-translate-x-full");

        if (isClosed) {
            // abrir
            sidebar.classList.remove("-translate-x-full");
            toggleIcon.style.transform = "rotate(90deg)"; // vira X
        } else {
            // fechar
            sidebar.classList.add("-translate-x-full");
            toggleIcon.style.transform = "rotate(0deg)";
        }
    });
})()