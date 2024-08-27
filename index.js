document.addEventListener("DOMContentLoaded", function () {
  const featuresCarousel = document.querySelector(
    "#app-features .carousel-inner"
  );
  const proposalCarousel = document.querySelector("#proposal .carousel-inner");
  const carousels = document.querySelectorAll(".carousel");
  let currentIndexFeatures = 0;
  let currentIndexProposal = 0;

  const proposals = [
    {
      title: "1. Implement AI-Powered Chatbot for Claims Assistance",
      details: [
        "Develop an intelligent chatbot to guide users through the claims process",
        "Provide 24/7 instant responses to common claims queries",
        "Offer personalized claim status updates and next-step recommendations",
        "Enable document upload and verification through the chatbot interface",
      ],
    },
    {
      title: "2. Enhance User Authentication and Access",
      details: [
        "Implement a 'remember me' option for quicker access",
        "Simplify the password reset procedure",
        "Introduce login attempt throttling and intelligent CAPTCHA to prevent brute force attacks",
      ],
    },

    {
      title: "3. Optimize Information Architecture",
      details: [
        "Reorganize the menu structure for more intuitive navigation",
        "Implement a search function for quick access to specific features",
        "Redesign the homepage with a focus on the most commonly used features",
      ],
    },
    {
      title: "4. Expand Language Support",
      details: [
        "Add Simplified Chinese as a language option alongside English and Traditional Chinese",
        "Ensure all app content and features are fully translated and localized",
      ],
    },

    {
      title: "5. Implement Robust Offline Functionality",
      details: [
        "Develop a local data caching system for seamless offline access to key policy information",
        "Create an offline mode that allows users to view their insurance details without an internet connection",
        "Develop a notification system to inform users about the app's online/offline status",
      ],
    },
  ];

  // Populate proposal carousel
  proposals.forEach((proposal) => {
    const div = document.createElement("div");
    div.className = "proposal-item";
    div.innerHTML = `
                <h3>${proposal.title}</h3>
                <ul>
                    ${proposal.details
                      .map((detail) => `<li>${detail}</li>`)
                      .join("")}
                </ul>
            `;
    proposalCarousel.appendChild(div);
  });

  function updateCarousel(carousel, index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  carousels.forEach((carousel) => {
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");
    const inner = carousel.querySelector(".carousel-inner");
    const items = inner.children;
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";
    carousel.appendChild(dotsContainer);
    let currentIndex = 0;

    // Create dots
    for (let i = 0; i < items.length; i++) {
      const dot = document.createElement("div");
      dot.className = "carousel-dot";
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel(inner, currentIndex);
      updateDots();
    }

    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      goToSlide(currentIndex);
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      goToSlide(currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });
  });

  // Image modal functionality
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("expandedImg");
  const closeBtn = document.getElementsByClassName("close")[0];

  document.querySelectorAll(".expandable").forEach((img) => {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    };
  });

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
