<template>
  <div class="quotes" :class="quote.quote && 'quotes-visible'">
    <h3 @click="$emit('copyQuote', quote.quote)" class="quote" title="copy this quote"> {{ quote.quote }}</h3>
    <p class="author">-{{ quote.author }}</p>
    <p>Category: {{ quote.category }}</p>
  </div>
</template>

<script setup>
defineProps({
  quote: {
    type: Object,
    required: true,
  }
});
defineEmits(['copyQuote']);
</script>

<style scoped>
.quotes {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  opacity: 1;
  opacity: 0;
  pointer-events: none;
}

.quotes-visible {
  transition: opacity 1s ease;
  opacity: 1;
  pointer-events: all;
}

.quote {
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  transition-duration: 1s;
}

.quote:hover {
  text-decoration: underline;
  cursor: pointer;
  transform: scale(1.01);
}

.author {
  font-size: 20px;
  font-style: italic;
}
</style>
