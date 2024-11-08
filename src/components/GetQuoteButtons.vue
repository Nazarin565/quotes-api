<template>
  <div class="buttons">
    <div>
      <label for="selectCategory">Choose category of next quote: </label>
      <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" id="selectCategory">
        <option value="">random</option>
        <option v-for="cat of categories" :key="cat" :value="cat">{{ cat }}
        </option>
      </select>
    </div>


    <button class="get-quote-button" @click="$emit('getQuote')" :disabled="loader">
      Get Quote {{ modelValue ? `about ${modelValue}` : 'Random' }}
    </button>

    <p class="error" v-if="fetchError">{{ fetchError }}</p>
  </div>
</template>

<script setup>
import { categories } from '@/assets/constants';

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  loader: {
    type: Boolean,
    required: true,
  },
  fetchError: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue', 'getQuote']);
</script>

<style scoped>
.buttons {
  justify-self: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.error {
  color: red;
}

.get-quote-button {
  padding: 16px;
  background-color: #d0dfe8;
  border: 2px solid black;
  transition-duration: 0.5s;
  cursor: pointer;
}

.get-quote-button:hover {
  background-color: #f0f4f8;
}
</style>
