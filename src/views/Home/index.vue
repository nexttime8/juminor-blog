<template>
  <div class="container">
    <div class="app">
      <div class="cardList">
        <button
          class="cardList__btn btn btn--left"
          @click="swapCards('left')"
          ref="btnLeft"
        >
          <div class="icon">
            <svg>
              <use xlink:href="#arrow-left"></use>
            </svg>
          </div>
        </button>

        <div class="cards__wrapper" ref="cardsWrapper">
          <div class="card current--card" ref="currentCard">
            <div class="card__image">
              <img
                src="../../assets/cards/photo-1563722680966-fd2b17fc0ddf.jpg"
                alt=""
                ref="images"
              />
            </div>
          </div>

          <div class="card next--card">
            <div class="card__image">
              <img
                src="../../assets/cards/photo-1497106636505-e4fd6e16d74c.jpg"
                alt=""
                ref="images"
              />
            </div>
          </div>

          <div class="card previous--card">
            <div class="card__image">
              <img
                src="../../assets/cards/photo-1541961817716-44060761e345.jpg"
                alt=""
                ref="images"
              />
            </div>
          </div>
        </div>

        <button
          class="cardList__btn btn btn--right"
          @click="swapCards('right')"
          ref="btnRight"
        >
          <div class="icon">
            <svg>
              <use xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </button>
      </div>

      <div class="infoList">
        <div class="info__wrapper">
          <div class="info current--info" ref="currentInfo">
            <h1 class="text name" ref="cur">Highlands</h1>
            <h4 class="text location">Scotland</h4>
            <p class="text description">The mountains are calling</p>
          </div>

          <div class="info next--info" ref="nextInfo">
            <h1 class="text name">Machu Pichu</h1>
            <h4 class="text location">Peru</h4>
            <p class="text description">Adventure is never far away</p>
          </div>

          <div class="info previous--info" ref="previousInfo">
            <h1 class="text name">Chamonix</h1>
            <h4 class="text location">France</h4>
            <p class="text description">Let your dreams come true</p>
          </div>
        </div>
      </div>

      <div class="app__bg">
        <div class="app__bg__image current--image">
          <img
            src="../../assets/cards/photo-1563722680966-fd2b17fc0ddf.jpg"
            alt=""
            ref="images"
          />
        </div>
        <div class="app__bg__image next--image">
          <img
            src="../../assets/cards/photo-1497106636505-e4fd6e16d74c.jpg"
            alt=""
            ref="images"
          />
        </div>
        <div class="app__bg__image previous--image">
          <img
            src="../../assets/cards/photo-1541961817716-44060761e345.jpg"
            alt=""
            ref="images"
          />
        </div>
      </div>
    </div>

    <div class="loading__wrapper">
      <div class="loader--text">Loading...</div>
      <!-- 进度条 -->
      <div class="loader">
        <span ref="loaderSpan"></span>
      </div>
    </div>

    <svg class="icons" style="display: none">
      <symbol
        id="arrow-left"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <polyline
          points="328 112 184 256 328 400"
          style="
            fill: none;
            stroke: #fff;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 3rem;
          "
        />
      </symbol>
      <symbol
        id="arrow-right"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <polyline
          points="184 112 328 256 184 400"
          style="
            fill: none;
            stroke: #fff;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 3rem;
          "
        />
      </symbol>
    </svg>
  </div>
</template>

<script>
import { gsap } from "gsap";
import imagesLoaded from "imagesloaded";

export default {
  name: "HomeComp",
  components: {},
  methods: {
    init() {
      let tl = gsap.timeline();

      console.log(this.$refs.cardsWrapper.children);

      tl.to(this.$refs.cardsWrapper.children, {
        delay: 0.15,
        duration: 0.5,
        stagger: {
          ease: "power4.inOut",
          from: "right",
          amount: 0.1,
        },
        "--card-translateY-offset": "0%",
      })
        .to(
          document.querySelector(".current--info").querySelectorAll(".text"),
          {
            delay: 0.5,
            duration: 0.4,
            stagger: 0.1,
            opacity: 1,
            translateY: 0,
          }
        )
        .to(
          [
            document.querySelector(".btn--left"),
            document.querySelector(".btn--right"),
          ],
          {
            duration: 0.4,
            opacity: 1,
            pointerEvents: "all",
          },
          "-=0.4"
        );
    },
    waitForImages() {
      const images = [...document.querySelectorAll("img")];
      console.log(images);
      const totalImages = images.length;
      let loadedImages = 0;
      const loaderEl = document.querySelector(".loader span");

      gsap.set(this.$refs.cardsWrapper.children, {
        "--card-translateY-offset": "100vh",
      });
      gsap.set(
        document.querySelector(".current--info").querySelectorAll(".text"),
        {
          translateY: "2.5rem",
          opacity: 0,
        }
      );
      gsap.set(
        [
          document.querySelector(".btn--left"),
          document.querySelector(".btn--right"),
        ],
        {
          pointerEvents: "none",
          opacity: "0",
        }
      );

      images.forEach((image) => {
        imagesLoaded(image, (instance) => {
          if (instance.isComplete) {
            loadedImages++;
            let loadProgress = loadedImages / totalImages;

            gsap.to(loaderEl, {
              duration: 1,
              scaleX: loadProgress,
              backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
            });

            if (totalImages == loadedImages) {
              gsap
                .timeline()
                .to(".loading__wrapper", {
                  duration: 0.8,
                  opacity: 0,
                  pointerEvents: "none",
                })
                .call(() => this.init());
            }
          }
        });
      });
    },

    updateCard(e) {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const centerPosition = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
      };
      let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
      gsap.set(card, {
        "--current-card-rotation-offset": `${angle}deg`,
      });
      const currentInfoEl = document.querySelector(".current--info");
      gsap.set(currentInfoEl, {
        rotateY: `${angle}deg`,
      });
    },

    removeCardEvents(card) {
      card.removeEventListener("pointermove", this.updateCard);
    },
    initCardEvents() {
      document
        .querySelector(".current--card")
        .addEventListener("pointermove", this.updateCard);
      document
        .querySelector(".current--card")
        .addEventListener("pointerout", (e) => {
          this.resetCardTransforms(e);
        });
    },
    resetCardTransforms(e) {
      const card = e.currentTarget;
      const currentInfoEl = document.querySelector(".current--info");
      gsap.set(card, {
        "--current-card-rotation-offset": 0,
      });
      gsap.set(currentInfoEl, {
        rotateY: 0,
      });
    },

    swapInfosClass(direction) {
      const currentInfoEl = document.querySelector(".current--info");
      const previousInfoEl = document.querySelector(".previous--info");
      const nextInfoEl = document.querySelector(".next--info");
      currentInfoEl.classList.remove("current--info");
      previousInfoEl.classList.remove("previous--info");
      nextInfoEl.classList.remove("next--info");

      if (direction === "right") {
        currentInfoEl.classList.add("previous--info");
        nextInfoEl.classList.add("current--info");
        previousInfoEl.classList.add("next--info");
      } else if (direction === "left") {
        currentInfoEl.classList.add("next--info");
        nextInfoEl.classList.add("previous--info");
        previousInfoEl.classList.add("current--info");
      }
    },
    changeInfo(direction) {
      let currentInfoEl = document.querySelector(".current--info");
      let previousInfoEl = document.querySelector(".previous--info");
      let nextInfoEl = document.querySelector(".next--info");

      gsap
        .timeline()
        .to(
          [
            document.querySelector(".btn--left"),
            document.querySelector(".btn--right"),
          ],
          {
            duration: 0.2,
            opacity: 0.5,
            pointerEvents: "none",
          }
        )
        .to(
          currentInfoEl.querySelectorAll(".text"),
          {
            duration: 0.4,
            stagger: 0.1,
            translateY: "-7.5rem",
            opacity: 0,
          },
          "-="
        )
        .call(() => {
          this.swapInfosClass(direction);
        })
        .call(() => this.initCardEvents())
        .fromTo(
          direction === "right"
            ? nextInfoEl.querySelectorAll(".text")
            : previousInfoEl.querySelectorAll(".text"),
          {
            opacity: 0,
            translateY: "40px",
          },
          {
            duration: 0.4,
            stagger: 0.1,
            translateY: "0px",
            opacity: 1,
          }
        )
        .to(
          [
            document.querySelector(".btn--left"),
            document.querySelector(".btn--right"),
          ],
          {
            duration: 0.2,
            opacity: 1,
            pointerEvents: "all",
          }
        );
    },

    // 要用swapCards里面的参数
    swapCardsClass(direction) {
      const currentCardEl = document.querySelector(".current--card");
      const previousCardEl = document.querySelector(".previous--card");
      const nextCardEl = document.querySelector(".next--card");
      currentCardEl.classList.remove("current--card");
      previousCardEl.classList.remove("previous--card");
      nextCardEl.classList.remove("next--card");

      const currentBgImageEl = document.querySelector(".current--image");
      const previousBgImageEl = document.querySelector(".previous--image");
      const nextBgImageEl = document.querySelector(".next--image");
      currentBgImageEl.classList.remove("current--image");
      previousBgImageEl.classList.remove("previous--image");
      nextBgImageEl.classList.remove("next--image");

      currentCardEl.style.zIndex = "50";
      currentBgImageEl.style.zIndex = "-2";

      if (direction === "right") {
        previousCardEl.style.zIndex = "20";
        nextCardEl.style.zIndex = "30";

        nextBgImageEl.style.zIndex = "-1";

        currentCardEl.classList.add("previous--card");
        previousCardEl.classList.add("next--card");
        nextCardEl.classList.add("current--card");

        currentBgImageEl.classList.add("previous--image");
        previousBgImageEl.classList.add("next--image");
        nextBgImageEl.classList.add("current--image");
      } else if (direction === "left") {
        previousCardEl.style.zIndex = "30";
        nextCardEl.style.zIndex = "20";

        previousBgImageEl.style.zIndex = "-1";

        currentCardEl.classList.add("next--card");
        previousCardEl.classList.add("current--card");
        nextCardEl.classList.add("previous--card");

        currentBgImageEl.classList.add("next--image");
        previousBgImageEl.classList.add("current--image");
        nextBgImageEl.classList.add("previous--image");
      }
    },
    swapCards(direction) {
      this.changeInfo(direction);
      this.swapCardsClass(direction);

      this.removeCardEvents(document.querySelector(".current--card"));
    },
    handleSwapCards(direction) {
      // Here you can handle the card swap logic,
      // and also update the related components as needed.
      this.changeInfo(direction);
      this.swapCardsClass(direction);
      // ... other related logic ...
    },
  },
  mounted() {
    this.initCardEvents();
    this.waitForImages();
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap");

@media only screen and (max-width: 992px) {
  .cardList {
    &__btn {
      --btn-size: 70px !important;
      &.btn--left {
        left: 15% !important;
        top: -50px;
      }
      &.btn--right {
        right: 15% !important;
        top: -50px;
      }
    }
  }
  .infoList {
    margin-left: 30px;
  }
}

@media only screen and (max-width: 768px) {
  .cardList {
    &__btn {
      --btn-size: 80px !important;
      &.btn--left {
        left: 20% !important;
        top: -50px;
      }
      &.btn--right {
        right: 20% !important;
        top: -50px;
      }
    }
  }
  .infoList {
    margin-left: 30px;
  }
}

@media only screen and (max-width: 480px) {
  .cardList {
    &__btn {
      --btn-size: 80px !important;
      &.btn--left {
        left: 25% !important;
        top: -60px;
      }
      &.btn--right {
        right: 25% !important;
        top: -60px;
      }
    }
  }
  .infoList {
    margin-left: 40px;
  }
}

.container {
  width: 100%;
  height: 95.77%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.787);
  overflow: hidden;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  &:focus {
    outline: none;
    border: none;
  }
}

.app {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -5;
    filter: blur(8px);
    pointer-events: none;
    user-select: none;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      // background: #000;
      z-index: 1;
      opacity: 0.8;
    }

    &__image {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
        translateX(var(--image-translate-offset, 0));
      width: 180%;
      height: 180%;
      transition: transform 1000ms ease, opacity 1000ms ease;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &.current--image {
        opacity: 1;
        --image-translate-offset: 0;
      }
      &.previous--image,
      &.next--image {
        opacity: 0;
      }
      &.previous--image {
        --image-translate-offset: -25%;
      }
      &.next--image {
        --image-translate-offset: 25%;
      }
    }
  }
}

.cardList {
  position: absolute;
  width: calc(3 * var(--card-width));
  height: auto;

  &__btn {
    --btn-size: 60px;
    width: var(--btn-size);
    height: var(--btn-size);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;

    &.btn--left {
      left: 10%;
    }
    &.btn--right {
      right: 10%;
    }

    .icon {
      width: 100%;
      height: 100%;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .cards__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    perspective: 1000px;
  }
}

.card {
  --card-translateY-offset: 100vh;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateX(var(--card-translateX-offset))
    translateY(var(--card-translateY-offset))
    rotateY(var(--card-rotation-offset)) scale(var(--card-scale-offset));
  display: inline-block;
  width: var(--card-width);
  height: var(--card-height);
  transition: transform var(--card-transition-duration)
    var(--card-transition-easing);
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 1;
    transition: opacity var(--card-transition-duration)
      var(--card-transition-easing);
    opacity: calc(1 - var(--opacity));
  }

  &__image {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.current--card {
    --current-card-rotation-offset: 0;
    --card-translateX-offset: 0;
    --card-rotation-offset: var(--current-card-rotation-offset);
    --card-scale-offset: 1.2;
    --opacity: 0.8;
  }

  &.previous--card {
    --card-translateX-offset: calc(-1 * var(--card-width) * 1.1);
    --card-rotation-offset: 25deg;
  }

  &.next--card {
    --card-translateX-offset: calc(var(--card-width) * 1.1);
    --card-rotation-offset: -25deg;
  }

  &.previous--card,
  &.next--card {
    --card-scale-offset: 0.9;
    --opacity: 0.4;
  }
}

.infoList {
  position: absolute;
  width: calc(3 * var(--card-width));
  height: var(--card-height);
  pointer-events: none;

  .info__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    perspective: 1000px;
    transform-style: preserve-3d;
  }
}

.info {
  margin-bottom: calc(var(--card-height) / 8);
  margin-left: calc(var(--card-width) / 1.5);
  transform: translateZ(2rem);
  transition: transform var(--card-transition-duration)
    var(--card-transition-easing);
  .text {
    position: relative;
    font-family: "Montserrat";
    font-size: calc(var(--card-width) * var(--text-size-offset, 0.2));
    white-space: nowrap;
    color: #fff;
    width: fit-content;
  }

  .name,
  .location {
    text-transform: uppercase;
  }

  .location {
    font-weight: 800;
  }

  .location {
    --mg-left: 40px;
    --text-size-offset: 0.12;
    font-weight: 600;
    margin-left: var(--mg-left);
    margin-bottom: calc(var(--mg-left) / 2);
    padding-bottom: 0.8rem;
    &::before,
    &::after {
      content: "";
      position: absolute;
      background: #fff;
      left: 0%;
      transform: translate(calc(-1 * var(--mg-left)), -50%);
    }
    &::before {
      top: 50%;
      width: 20px;
      height: 5px;
    }
    &::after {
      bottom: 0;
      width: 60px;
      height: 2px;
    }
  }

  .description {
    --text-size-offset: 0.065;
    font-weight: 500;
  }

  &.current--info {
    opacity: 1;
    display: block;
  }
  &.previous--info,
  &.next--info {
    opacity: 0;
    display: none;
  }
}

.loading__wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;
  z-index: 200;
  .loader--text {
    color: #fff;
    font-family: "Montserrat";
    font-weight: 500;
    margin-bottom: 1.4rem;
  }
  .loader {
    position: relative;
    width: 12.5rem;
    height: 0.125rem;
    background: rgba(255, 255, 255, 0.25);
    span {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgb(255, 0, 0);
      transform: scaleX(0);
      transform-origin: left;
    }
  }
}

.support {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 10px;
  display: flex;
  a {
    margin: 0 10px;
    color: #fff;
    font-size: 1.8rem;
    backface-visibility: hidden;
    transition: all 150ms ease;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>