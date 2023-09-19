<template>
  <div class="cardList">
    <button class="cardList__btn btn btn--left" @click="swapCards('left')">
      <div class="icon">
        <svg>
          <use xlink:href="#arrow-left"></use>
        </svg>
      </div>
    </button>

    <div class="cards__wrapper" ref="cardsContainerEl">
      <div class="card current--card">
        <div class="card__image">
          <img
            src="@/assets/cards/photo-1541961817716-44060761e345.jpg"
            alt=""
          />
        </div>
      </div>

      <div class="card next--card">
        <div class="card__image">
          <img
            src="@/assets/cards/photo-1497106636505-e4fd6e16d74c.jpg"
            alt=""
          />
        </div>
      </div>

      <div class="card previous--card">
        <div class="card__image">
          <img
            src="@/assets/cards/photo-1563722680966-fd2b17fc0ddf.jpg"
            alt=""
          />
        </div>
      </div>
    </div>

    <button class="cardList__btn btn btn--right" @click="swapCards('right')">
      <div class="icon">
        <svg>
          <use xlink:href="#arrow-right"></use>
        </svg>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "CardList",
};
</script>

<style>
</style>