<template>
  <div class="infoList">
    <div class="info__wrapper">
      <div class="info current--info">
        <h1 class="text name">{{ infos[0].name }}</h1>
        <h4 class="text location">{{ infos[0].location }}</h4>
        <p class="text description">{{ infos[0].description }}</p>
      </div>

      <div class="info next--info">
        <h1 class="text name">{{ infos[1].name }}</h1>
        <h4 class="text location">{{ infos[1].location }}</h4>
        <p class="text description">{{ infos[1].description }}</p>
      </div>

      <div class="info previous--info">
        <h1 class="text name">{{ infos[2].name }}</h1>
        <h4 class="text location">{{ infos[2].location }}</h4>
        <p class="text description">{{ infos[2].description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoList",
  data() {
    return {
      infos: [
        {
          name: "Highlands",
          location: "Scotland",
          description: "The mountains are calling",
        },
        {
          name: "Machu Pichu",
          location: "Peru",
          description: "Adventure is never far away",
        },
        {
          name: "Chamonix",
          location: "France",
          description: "Let your dreams come true",
        },
      ],
    };
  },
};
</script>

<style>
</style>