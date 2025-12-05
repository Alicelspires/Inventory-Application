let imgCover = document.querySelector('#cover')
let showImg = document.querySelector("#img-file")

imgCover.addEventListener("change", () => {
    const file = imgCover.files[0];
    let imgURL;

    if(file) {
        imgURL = URL.createObjectURL(file);
    } 
    
    showImg.src = imgURL;
})


