window.addEventListener("pagereveal", async (e) => {
  if (!navigation.activation.from) {
    return;
  }
  if (e.viewTransition) {
    const fromURL = new URL(navigation.activation.from.url);
    const toURL = new URL(navigation.activation.entry.url);
    //   if (isHomePage(fromURL) && isProjectPage(toURL)) {
    // const projectElement =
    // }
    //   }
    // );
  }
});
window.addEventListener("pageswap", async (e) => {
  if (e.viewTransition) {
    const transitionType = determineTransitionType(
      e.activation.from,
      e.activation.entry
    );
    console.log(`pageSwap: ${transitionType}`);
    e.viewTransition.types.add(transitionType);
    // Persist transitionType for browsers that don't have the Navigation API
    if (!window.navigation) {
      localStorage.setItem("transitionType", transitionType);
    }
  }
});
window.addEventListener("pagereveal", async (e) => {
  if (e.viewTransition) {
    // using the NavigationActivationInformation
    let transitionType;
    if (!window.navigation) {
      transitionType = localStorage.getItem("transitionType");
    } else {
      transitionType = determineTransitionType(
        navigation.activation.from,
        navigation.activation.entry
      );
    }
    console.log(`pageReveal: ${transitionType}`);
    e.viewTransition.types.add(transitionType);
  }
});
const determineTransitionType = (oldNavigationEntry, newNavigationEntry) => {
  if (!oldNavigationEntry || !newNavigationEntry) {
    return "unknown";
  }
  const currentURL = new URL(oldNavigationEntry.url);
  const destinationURL = new URL(newNavigationEntry.url);
  // Check if navigating from / to /projects/*
  if (
    currentURL.pathname === "/" &&
    destinationURL.pathname.startsWith("/projects/")
  ) {
    return "fancier";
  } else if (
    currentURL.pathname.startsWith("/projects/") &&
    destinationURL.pathname === "/"
  ) {
    return "fancier";
  }
  const currentPageParam = currentURL.searchParams.get("page");
  const destinationPageParam = destinationURL.searchParams.get("page");
  if (destinationPageParam === "next") {
    return "forwards";
  } else if (destinationPageParam === "prev") {
    return "backwards";
  } else {
    const currentSlashCount = (currentURL.pathname.match(/\//g) || []).length;
    const destinationSlashCount = (destinationURL.pathname.match(/\//g) || [])
      .length;
    if (currentSlashCount > destinationSlashCount) {
      return "backwards";
    } else if (currentSlashCount < destinationSlashCount) {
      return "forwards";
    } else {
      return "unknown";
    }
  }
};
