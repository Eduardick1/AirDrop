//==========TABS-SLIDER==============================================================================

const pagesNav = document.querySelectorAll(".page-nav-arrow");
const pageLinks = document.querySelectorAll(".page-link");

const ACTIVE_CLASS = "active";

function scrollToPageLink(indexToScroll) {
  pageLinks[indexToScroll].scrollIntoView({
    block: "nearest",
    inline: "center",
    behavior: "smooth",
  });
  if (pageLinks[indexToScroll].classList.contains(ACTIVE_CLASS)) return;
  pageLinks.forEach((pageLink) => pageLink.classList.remove(ACTIVE_CLASS));
  pageLinks[indexToScroll].classList.add(ACTIVE_CLASS);
}

function getNextIndex(direction, array) {
  for (const [index, element] of array.entries()) {
    if (element.classList.contains(ACTIVE_CLASS)) {
      switch (direction) {
        case "right": {
          return index >= array.length - 1 ? 0 : index + 1;
        }
        case "left": {
          return index <= 0 ? array.length - 1 : index - 1;
        }
      }
    }
  }
}

pagesNav.forEach((button) => {
  button.addEventListener("click", (e) =>
    scrollToPageLink(getNextIndex(e.target.dataset.direction, pageLinks))
  );
});

pageLinks.forEach((link, index) =>
  link.addEventListener("click", () => scrollToPageLink(index))
);

//==========ARTICLES-SLIDER==========================================================================

const articleNavBtns = document.querySelectorAll(".articles-slider__nav_arrow");

const articleContentsContainer = document.querySelector(
  ".articles-slider__content__wrapper"
);
const articleImagesContainer = document.querySelector(
  ".articles-slider-images__wrapper"
);

let totalArticles = Math.max(
  articleContentsContainer.childElementCount,
  articleImagesContainer.childElementCount
);
let currentArticle = 1;

document.querySelector(".articles-slider__nav_amount-total").innerText =
  totalArticles;
document
  .querySelector(".articles-slider")
  .style.setProperty("--number-slides", totalArticles);

function renderCurrentSlide() {
  document.querySelector(".articles-slider__nav_amount-current").innerText =
    currentArticle;
  articleNavBtns.forEach((btn) => {
    switch (btn.dataset.direction) {
      case "right": {
        btn.disabled = currentArticle >= totalArticles ? true : false;
        break;
      }
      case "left": {
        btn.disabled = currentArticle <= 1 ? true : false;
        break;
      }
      default:
        break;
    }
  });
}
function swipeSlides() {
  let quotient = 100 / totalArticles;
  [articleImagesContainer, articleContentsContainer].forEach(
    (article) =>
      (article.style.transform = `translate3d(-${
        currentArticle * quotient - quotient
      }%, 0, 0)`)
  );
}
swipeSlides();
renderCurrentSlide();

articleNavBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    switch (e.target.dataset.direction) {
      case "right": {
        if (currentArticle >= totalArticles) return;
        currentArticle += 1;
        break;
      }
      case "left": {
        if (currentArticle <= 1) return;
        currentArticle -= 1;
        break;
      }
      default:
        break;
    }
    swipeSlides();
    renderCurrentSlide();
  })
);

//===================================================================================================
