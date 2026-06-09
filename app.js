const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const productGrid = document.querySelector("#product-grid");
const wanderingsGrid = document.querySelector("#wanderings-grid");
const socialLinks = document.querySelector("#social-links");
const videoGrid = document.querySelector("#video-grid");
const contactForm = document.querySelector("#contact-form");
const dialog = document.querySelector("#story-dialog");
const closeDialog = document.querySelector(".dialog-close");

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

function renderProducts() {
  productGrid.innerHTML = window.siteContent.products
    .map(
      (product) => `
        <article class="product-card">
          <p class="meta">${product.status}</p>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
        </article>
      `
    )
    .join("");
}

function renderWanderings() {
  wanderingsGrid.innerHTML = window.siteContent.wanderings
    .map(
      (post, index) => `
        <button class="catalog-card" type="button" data-index="${index}">
          <img src="${post.image}" alt="">
          <span>${post.location}</span>
          <strong>${post.title}</strong>
        </button>
      `
    )
    .join("");

  wanderingsGrid.querySelectorAll(".catalog-card").forEach((card) => {
    card.addEventListener("click", () => {
      const post = window.siteContent.wanderings[Number(card.dataset.index)];
      document.querySelector("#story-image").src = post.image;
      document.querySelector("#story-image").alt = post.title;
      document.querySelector("#story-meta").textContent = post.location;
      document.querySelector("#story-title").textContent = post.title;
      document.querySelector("#story-text").textContent = post.text;
      dialog.showModal();
    });
  });
}

function renderSocials() {
  socialLinks.innerHTML = window.siteContent.socials
    .map(
      (social) => `
        <a href="${social.url}" aria-label="${social.label}">
          <span>${social.icon}</span>
          ${social.label}
        </a>
      `
    )
    .join("");
}

function renderVideos() {
  videoGrid.innerHTML = window.siteContent.videos
    .map((video) => {
      const media = video.embedUrl
        ? `<iframe src="${video.embedUrl}" title="${video.title}" allowfullscreen></iframe>`
        : `<div class="video-placeholder">${video.label}</div>`;

      return `
        <article class="video-card">
          ${media}
          <h4>${video.title}</h4>
          <p>${video.description}</p>
        </article>
      `;
    })
    .join("");
}

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Website message from ${formData.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`
  );
  window.location.href = `mailto:${window.siteContent.contactEmail}?subject=${subject}&body=${body}`;
});

renderProducts();
renderWanderings();
renderSocials();
renderVideos();
