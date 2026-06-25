const tabs = document.querySelectorAll(".skill-tab");
const panels = document.querySelectorAll(".skill-panel");

document.body.classList.add("can-reveal");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.panel;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === target);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const projectMedia = {
  niyati: {
    title: "Niyati Engine",
    github: "https://github.com/gokul3011-c/Niyati-Engine",
    images: [{ src: "assets/projects/ne.jpg", alt: "Niyati Engine project preview" }],
  },
  byb: {
    title: "Balance Your Bucks",
    github: "https://github.com/gokul3011-c/Balance-Your-Bucks-Real-Time-Project",
    images: [
      { src: "assets/projects/byb.png", alt: "Balance Your Bucks dashboard preview" },
      { src: "assets/projects/byb-1.png", alt: "Balance Your Bucks feature preview" },
    ],
  },
  samraksha: {
    title: "Samraksha",
    github: "https://github.com/Abhinavprog/SAMRAKSHA",
    images: [
      { src: "assets/projects/s-1.jpg", alt: "Samraksha welcome dashboard preview" },
      { src: "assets/projects/s-2.jpg", alt: "Samraksha portal selection preview" },
    ],
  },
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("projectModalTitle");
const modalGallery = document.querySelector(".project-modal-gallery");
const modalGithub = document.querySelector(".project-modal-github");
const mediaButtons = document.querySelectorAll(".project-media-btn");
let lastFocusedElement = null;

function openProjectModal(projectKey) {
  const project = projectMedia[projectKey];
  if (!project || !modal) return;

  lastFocusedElement = document.activeElement;
  modalTitle.textContent = project.title;
  modalGithub.href = project.github;
  modalGallery.classList.toggle("single", project.images.length === 1);
  modalGallery.innerHTML = project.images
    .map(
      (image) =>
        `<img src="${image.src}" alt="${image.alt}" loading="lazy" />`
    )
    .join("");

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalGithub.focus();
}

function closeProjectModal() {
  if (!modal) return;

  modal.hidden = true;
  document.body.classList.remove("modal-open");
  modalGallery.innerHTML = "";

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

mediaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProjectModal(button.dataset.project);
  });
});

modal?.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    closeProjectModal();
  }
});
