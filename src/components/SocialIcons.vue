<template>
  <div class="social-icons">
    <a class="icon" :href='`https://www.facebook.com/sharer/sharer.php?u=${currentLocation}`' target="_blank"
      title="Send to Facebook">
      <FacebookIcon />
    </a>
    <a class="icon" :href="`https://twitter.com/intent/tweet?text=${quote.quote} -${quote.author}`" target="_blank"
      title="Send to Twitter">
      <TwitterIcon />
    </a>
    <a class="icon" :href="`https://t.me/share/url?url=${quote.quote} -${quote.author}`" target="_blank"
      title="Send to Telegram">
      <TelegramIcon />
    </a>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FacebookIcon from '@/icons/FacebookIcon.vue';
import TelegramIcon from '@/icons/TelegramIcon.vue';
import TwitterIcon from '@/icons/TwitterIcon.vue';

defineProps({
  quote: {
    type: Object,
    required: true,
  },
});

const currentLocation = ref(window.location.href);
</script>

<style scoped>
.social-icons {
  position: absolute;
  content: '';
  top: 24px;
  left: 24px;
  display: flex;
  gap: 8px;
}

.icon {
  color: black;
  transition-duration: 0.5s;
  padding: 4px;
}

.icon:hover {
  transform: scale(1.05);
}
</style>
