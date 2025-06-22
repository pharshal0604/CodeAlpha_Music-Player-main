const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const gallery = document.getElementById("gallery");
const addImageBtn = document.getElementById("addImageBtn");
const imageInput = document.getElementById("imageInput");
const categorySelect = document.getElementById("categorySelect");
const filterSelect = document.getElementById("filterSelect");

let currentIndex = 0;
let galleryImages = []; // Array of objects { src, category }

function updateGallery() {
  const selectedFilter = filterSelect.value;
  gallery.innerHTML = "";

  galleryImages
    .filter(
      (img) => selectedFilter === "All" || img.category === selectedFilter
    )
    .forEach((imgObj, index) => {
      const card = document.createElement("div");
      card.className = "image-card";

      const img = document.createElement("img");
      img.src = imgObj.src;
      img.alt = `Gallery Image ${index + 1}`;
      img.className = "gallery-img";

      img.addEventListener("click", () => {
        lightbox.classList.remove("hidden");
        lightboxImg.src = imgObj.src;
        currentIndex = index;
      });

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        const actualIndex = galleryImages.findIndex(
          (g) => g.src === imgObj.src
        );
        galleryImages.splice(actualIndex, 1);
        updateGallery();
      });

      card.appendChild(img);
      card.appendChild(removeBtn);
      gallery.appendChild(card);
    });
}

addImageBtn.addEventListener("click", () => {
  if (categorySelect.value === "" || categorySelect.selectedIndex === 0) {
    alert("Please select a category before adding an image.");
    return;
  }
  imageInput.click();
});

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const selectedCategory = categorySelect.value;
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (event) {
      galleryImages.push({
        src: event.target.result,
        category: selectedCategory,
      });
      updateGallery();
    };
    reader.readAsDataURL(file);
  }
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

filterSelect.addEventListener("change", () => {
  updateGallery();
});

galleryImages = [
  { src: "image1.jpg", category: "Nature" },
  { src: "image2.jpg", category: "People" },
  { src: "image3.jpg", category: "Animals" },
];

updateGallery();
