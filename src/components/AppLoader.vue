<template>
  <div class="loader"></div>
</template>

<script setup>
</script>

<style>
.loader {
  border: 8px solid rgba(0, 0, 0, 0.3);
  border-top: 8px solid #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
