<template>
  <ul class="content__history" :class="isHistoryOpen && 'content__history-visibile'">
    <h2 class="history-title">History of quotes:</h2>
    <li v-for="item in historyOfQuotes" :key="item.quote" class="history__item">
      <h3 @click="$emit('copyQuote', item.quote)" class="quote"> {{ item.quote }} </h3>
      <p class="author"> {{ item.author }} </p>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  isHistoryOpen: {
    type: Boolean,
    required: true,
  },
  historyOfQuotes: {
    type: Object,
    required: true,
  }
});
defineEmits(['copyQuote'])
</script>

<style scoped>
.content__history {
  position: absolute;
  border-radius: 12px;
  inset: 0;
  z-index: 10;
  padding: 24px;
  background: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  overflow: auto;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.content__history-visibile {
  opacity: 1;
  pointer-events: all;
}

.history-title {
  font-size: 32px;
  font-weight: 500;
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

.history__item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px;
  gap: 4px;
  border: solid 1px black;
}
</style>
