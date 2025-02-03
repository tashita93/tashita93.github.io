const isHomePage = (url) => url.pathname === "/";
const isProjectPage = (url) => url.pathname.startsWith("/projects/");

const determineTransitionType = (fromURL, toURL) => {
  if (isHomePage(fromURL) && isProjectPage(toURL)) {
    return "fancier";
  }
  return "unknown";
};

window.addEventListener("pageswap", async (e) => {
  if (e.viewTransition) {
    console.log("first");
    const fromURL = new URL(e.activation.from.url);
    const toURL = new URL(e.activation.entry.url);
    const transitionType = determineTransitionType(fromURL, toURL);

    if (window.navigation) {
      e.viewTransition.types.add(transitionType);
    } else {
      localStorage.setItem("transitionType", transitionType);
    }
  }
});

window.addEventListener("pagereveal", async (e) => {
  if (!navigation.activation.from) {
    return;
  }
  if (e.viewTransition) {
    console.log("second");
    if (window.navigation) {
      const fromURL = new URL(navigation.activation.from.url);
      const toURL = new URL(navigation.activation.entry.url);
      const transitionType = determineTransitionType(fromURL, toURL);
      e.viewTransition.types.add(transitionType);
    } else {
      const transitionType = localStorage.getItem("transitionType");
      e.viewTransition.types.add(transitionType);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const burgerMenu = document.getElementById("burger-menu");

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    burgerMenu.classList.toggle("open");
    document.body.classList.toggle("overflow-hidden");
  });
});
