<template>
  <div class="error-label">
    <font-awesome-icon :icon="['fas', 'exclamation-triangle']" pull="left" class="text-danger" />
    <h6 class="subtitle is-6 text-danger">{{errorMessage}}</h6>
  </div>
</template>

<script>
export default {
  name: "ErrorLable",
  props: {
    errorMessage: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-danger {
  color: red;
}
</style>
