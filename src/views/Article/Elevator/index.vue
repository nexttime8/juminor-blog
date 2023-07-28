<template>
  <div class="elevator">
    <ul>
      <li><a href="#section1">Section 1</a></li>
      <li><a href="#section2">Section 2</a></li>
      <li><a href="#section3">Section 3</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ElevatorComp",
}
</script>

<style scoped lang="css">
/* 电梯导航样式 */
/* #region */
.elevator {
  position: fixed;
  right: 20px;
  bottom: 5%;
  transform: translateY(-50%);
  background-color: #fdf6f6;
  padding: 10px;
  border-radius: 5px;
}

.elevator ul {
  list-style: none;
  padding: 0;
}

.elevator li {
  margin-bottom: 5px;
}

.elevator a {
  color: #333;
  text-decoration: none;
}
/* #endregion */
</style>
