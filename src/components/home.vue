<template>
  <div>
    <h1>hello {{ name }}</h1>
  </div>
</template>
<script>
export default {
  name: "Home",
  props: ["name"],
};
</script>