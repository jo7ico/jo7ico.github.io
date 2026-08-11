const THEME_STORAGE_KEY = "theme";
const TYPING_WORDS = ["websites", "music", "projects"];

function setTheme(theme) {
  const resolvedTheme = theme === "light" ? "light" : "dark";

  document.body.classList.toggle("light-mode", resolvedTheme === "light");
  document.body.setAttribute("data-theme", resolvedTheme);

  function changeImage() {
    const img = document.getElementById("macbookPro");
    if (img) {
      img.src =
        resolvedTheme === "light"
          ? "images/macbook-pro-black.png"
          : "images/macbook-pro-white.png";
    }
  }

  const toggle = document.querySelector('.switch input[type="checkbox"]');
  if (toggle) {
    toggle.checked = resolvedTheme === "light";
    changeImage();
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, resolvedTheme);
  } catch (error) {
    console.warn("Theme could not be saved:", error);
  }
}

function initTyping() {
  const typingElement = document.getElementById("typing");
  if (!typingElement) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  const typeLoop = () => {
    const currentWord = TYPING_WORDS[wordIndex];
    const text = currentWord.slice(0, charIndex);
    typingElement.textContent = text.length ? text : "\u00A0";

    if (isPaused) {
      window.setTimeout(typeLoop, 100);
      return;
    }

    if (!isDeleting) {
      charIndex += 1;
      if (charIndex > currentWord.length) {
        isPaused = true;
        window.setTimeout(() => {
          isDeleting = true;
          isPaused = false;
        }, 1200);
      }
    } else {
      charIndex -= 1;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % TYPING_WORDS.length;
      }
    }

    const speed = isDeleting ? 60 : 100;
    window.setTimeout(typeLoop, speed);
  };

  typeLoop();
}

function initTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    setTheme(savedTheme === "light" ? "light" : "dark");
  } catch (error) {
    setTheme("dark");
  }
}

function initHeaderShrink() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("shrink", window.scrollY > 50);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

window.toggleDarkMode = function () {
  const nextTheme = document.body.classList.contains("light-mode")
    ? "dark"
    : "light";
  setTheme(nextTheme);
};

document.addEventListener("DOMContentLoaded", () => {
  initTyping();
  initTheme();
  initHeaderShrink();
});
