(function () {
    const genreSelect = document.getElementById("genreSelect");
    const tagsContainer = document.getElementById("tagsContainer");
    const tagsInput = document.getElementById("tagsInput");
    const tagLive = document.getElementById("tagLive");

    let tags = [];

    function renderTags() {
        tagsContainer.innerHTML = "";

        tags.forEach((tag, index) => {
        const tagEl = document.createElement("span");
        tagEl.className =
            "flex items-center gap-2 bg-neutral-300 text-zinc-950 px-3 py-1 rounded-full text-sm font-semibold";

        tagEl.innerHTML += `<span>${tag}</span>`;
        tagEl.innerHTML += `
            <button 
                type="button" 
                arial-label="Remover ${tag}"
                onclick="${() => removeTag(index)}"
                class="w-5 h-5 pb-1 flex items-center justify-center text-zinc-950 text-lg"
            >&times;</button>`;

        tagsContainer.appendChild(tagEl);
        });

        tagsInput.value = tags.join(",");
    }

    function addTag(value) {
        if (!value) return;
        if (tags.includes(value)) return;

        tags.push(value);
        renderTags();

        // Accessibility
        tagLive.textContent = `Categoria ${value} adicionada`;
    }

    function removeTag(index) {
        const removed = tags.splice(index, 1);
        renderTags();

        // Accessibility
        tagLive.textContent = `Categoria ${removed} removida`;
    }

    genreSelect.addEventListener("change", () => {
        addTag(genreSelect.value);
        genreSelect.value = ""; // reset dropdown
    });
})();
