<script>
import { ref } from 'vue';

export default {
  setup() {
    const quote = ref({
      author: '',
      category: '',
      quote: '',
    })
    const category = ref('')

    function getQuote() {
      quote.value = {
        author: '',
        category: '',
        quote: '',
      }
      fetch('https://api.api-ninjas.com/v1/quotes?category=' + category.value, {
        method: 'GET',
        headers: {
          'X-Api-Key': 'ji7i7KVCKObnhRMtB1LRmQ==AmyCMKLfmYJsYBLJ',
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Responce isn't ok");
          }
          return response.json();
        })
        .then(data => {
          quote.value = data;
        })
        .catch(error => {
          console.error('Error: ', error);
        });
    }

    return {
      quote,
      getQuote,
      category
    }
  },
}
</script>

<template>
  <div class="content">
    <p>{{ quote }}</p>

    <div class="select-field">
      <div>
        <label for="selectCategory">Choose category of quote: </label>
        <select v-model="category" id="selectCategory">
          <option value="">Random</option>
          <option value="age">Age</option>
          <option value="alone">Alone</option>
          <option value="amazing">Amazing</option>
        </select>
      </div>
      <p v-if="category">Обрана категорія: {{ category }}</p>
    </div>


    <button class="getQuote" @click="getQuote">Get Quote {{ category ? `with category ${category}` : 'Random'
      }}</button>
  </div>

</template>


<style>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: auto;
  max-width: 600px;
  vertical-align: auto;
  padding: 10px;
  border: solid 1px black;
}

.select-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
