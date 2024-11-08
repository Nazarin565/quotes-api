<template>
  <button class="history-icon" @click="$emit('toogleHistoryMenu', !isHistoryOpen)">
    <HistoryIcon v-if="!isHistoryOpen" />
    <CloseIcon v-else />
  </button>
</template>

<script setup>
import HistoryIcon from '@/icons/HistoryIcon.vue';
import CloseIcon from '@/icons/CloseIcon.vue';

defineProps({
  isHistoryOpen: {
    type: Boolean,
    required: true,
  }
});
defineEmits(['toogleHistoryMenu']);
</script>

<style>
.history-icon {
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
  background: none;
  border: none;
  z-index: 20;
  transition-duration: 0.5s;
}

.history-icon:hover {
  transform: scale(1.05);
}
</style>
