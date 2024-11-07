<template>
  <button class="history-icon" @click="$emit('toogleHistoryMenu', !isHistoryOpen)">
    <HistoryIcon v-if="!isHistoryOpen" />
    <CloseIcon v-else />
  </button>
</template>

<script>
import HistoryIcon from '@/icons/HistoryIcon.vue';
import CloseIcon from '@/icons/CloseIcon.vue';

export default {
  name: 'HistoryMenuButton',
  components: {
    HistoryIcon,
    CloseIcon
  },
  props: {
    isHistoryOpen: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['toogleHistoryMenu']
}
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
