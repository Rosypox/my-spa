let pageURls = {
  about: "/index.html?about",
  contact: "index.html?contact",
  gallery: "index.html?gallery",
};

function OnStartUp() {
  popStateHandler();
}

OnStartUp();

document.querySelector("#about-link").addEventListener("click", (event) => {
  let StateObj = { page: "about" };
  document.title = "About";
  history.pushState(StateObj, "About", "?about");
  RenderAboutPage();
});

document.querySelector("#contact-link").addEventListener("click", (event) => {
  let StateObj = { page: "contact" };
  document.title = "Contact";
  history.pushState(StateObj, "Contact", "?contact");
  RenderContactPage();
});
document.querySelector("#gallery-link").addEventListener("click", (event) => {
  let StateObj = { page: "gallery" };
  document.title = "Gallery";
  history.pushState(StateObj, "Gallery", "?gallery");
  RenderGalleryPage();
});

function RenderAboutPage() {
  document.querySelector("main").innerHTML = `
    <h1 class='title'>About me</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}
function RenderContactPage() {
  document.querySelector("main").innerHTML = `
    <h1 class='title'>Contact me</h1>
    <form id="contact-form">
<label for="name">Name:</label>
<input type="text" id="name" name="name" required>
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>
<label for="message">Message:</label>
<textarea id="message" name="message" required></textarea>
 <div class="g-recaptcha" data-sitekey="6LcXKawqAAAAABgxoFzq284yIaj19K3uXdPDtP5B"></div>
<button type="submit">Send</button>
</form>`;
  loadRecaptchaScript();

  document
    .getElementById("contact-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      // Walidacja reCAPTCHA przed wysłaniem
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert("Please complete the CAPTCHA.");
        return;
      }

      // Jeśli reCAPTCHA jest zaliczone, możesz wysłać dane formularza (np. do PHP)
      alert("Form submitted!");
    });
}
function loadRecaptchaScript() {
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}
function RenderGalleryPage() {
  document.querySelector("main").innerHTML = `
      <h1 class='title'>Gallery</h1>
      <div class="gallery-grid" id="gallery-grid">
        <!-- Thumbnails will be added here -->
      </div>
    `;
  LoadGalleryImages();
}
function LoadGalleryImages() {
  const galleryGrid = document.getElementById("gallery-grid");

  // Example images (use real URLs for your images)
  const imageUrls = [
    "images/render2.png",
    "images/render3.png",
    "images/bmw render1.png",
    "images/render1.png",
    "images/GTm render 2.png",
    "images/dbd render.png",
    "images/bathroom render 2.png",
    "images/kitchen_render4.png",
    "images/dining room.png",
  ];
  imageUrls.forEach((url, index) => {
    const imgElement = document.createElement("img");
    imgElement.dataset.src = url;
    imgElement.classList.add("gallery-thumbnail");
    imgElement.setAttribute("alt", `Image ${index + 1}`);
    imgElement.style.opacity = 0; // initially invisible for lazy loading
    imgElement.addEventListener("click", () => openModal(url));
    galleryGrid.appendChild(imgElement);

    // Lazy loading with IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src; // Load the image
          image.onload = () => (image.style.opacity = 1); // Fade in when loaded
          observer.unobserve(image);
        }
      });
    });
    observer.observe(imgElement);
  });
}

// Modal functionality
function openModal(imageUrl) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <img src="${imageUrl}" alt="Expanded Image">
        </div>
      `;
  document.body.appendChild(modal);

  // Close modal when clicking on the close button or outside the image
  modal.querySelector(".close-btn").addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) modal.remove();
}

function popStateHandler() {
  let loc = window.location.href.toString().split(window.location.host)[1];

  if (loc === pageURls.contact) {
    RenderContactPage();
  }
  if (loc === pageURls.about) {
    RenderAboutPage();
  }
  if (loc === pageURls.gallery) {
    RenderGalleryPage();
  }
}
window.onpopstate = popStateHandler;

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
