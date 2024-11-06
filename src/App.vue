<script>
import { ref } from 'vue';
import { categories } from './assets/constants';
import AppLoader from './components/AppLoader.vue';

export default {
  components: {
    AppLoader
  },
  setup() {
    const quote = ref({
      author: '',
      category: '',
      quote: '',
    })
    const currentCategory = ref('')
    const fetchError = ref('')
    const historyOfQuotes = ref([])
    const loader = ref(false);
    const succesfulCopiedMessage = ref(false)

    function getQuote() {
      loader.value = true
      fetchError.value = ''

      if (quote.value.quote) {
        historyOfQuotes.value.push({ ...quote.value })
      }

      quote.value = {
        author: '',
        category: '',
        quote: '',
      }

      fetch('https://api.api-ninjas.com/v1/quotes?category=' + currentCategory.value, {
        method: 'GET',
        headers: {
          'X-Api-Key': 'ji7i7KVCKObnhRMtB1LRmQ==AmyCMKLfmYJsYBLJ',
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Responce isn't ok");
          }
          return response.json();
        })
        .then(data => {
          quote.value = data[0];
        })
        .catch(error => {
          console.error('Error: ', error);
          fetchError.value = `Something went wrong. Please try again`;
        })
        .finally(() => loader.value = false);
    }

    function copyQuote() {
      navigator.clipboard.writeText(quote.value.quote)
        .then(() => {
          succesfulCopiedMessage.value = true
          setTimeout(() => { succesfulCopiedMessage.value = false }, 2000)
        })
    }

    return {
      quote,
      getQuote,
      category: currentCategory,
      fetchError,
      historyOfQuotes,
      copyQuote,
      categories,
      loader,
      succesfulCopiedMessage
    }
  },
}
</script>

<template>
  <div class="animated-background">
    <div class="content">
      <h2 v-if="!loader && !historyOfQuotes.length && !quote.quote" class="title">"Quotes from Great Minds:<br />
        Inspiration
        on Every Topic
        <br /> Just Try!
      </h2>

      <div class="quotes" :class="quote.quote && 'quotes-visible'">
        <p v-if="succesfulCopiedMessage" class="success-message">Succesfully copied!</p>
        <p @click="copyQuote" class="quote" title="copy this quote"> {{ quote.quote }}</p>
        <p class="author">-{{ quote.author }}</p>
        <p><strong>Category:</strong> {{ quote.category }}</p>
      </div>


      <AppLoader v-if="loader" />

      <div class="buttons">
        <div>
          <label for="selectCategory">Choose category of next quote: </label>
          <select v-model="category" id="selectCategory">
            <option value="">random</option>
            <option v-for="cat of categories" :key="cat" :value="cat">{{ cat }}
            </option>
          </select>
        </div>


        <button class="get-quote-button" @click="getQuote" :disabled="loader">
          Get Quote {{ category ? `about ${category}` : 'Random' }}
        </button>

        <p class="error" v-if="fetchError">{{ fetchError }}</p>
      </div>
    </div>

    <!-- <ul class="history" v-if="!!historyOfQuotes.length">
      <strong>History of quotes:</strong>
      <li v-for="item in historyOfQuotes" :key="item.quote" class="history__item">
        <p @click="copyQuote" class="quote"><strong>Quote:</strong> {{ item.quote }}</p>
        <p><strong>Author:</strong> {{ item.author }}</p>
        <p><strong>Category:</strong> {{ item.category }}</p>
      </li>
    </ul> -->
  </div>
</template>


<style>
@keyframes gentleFade {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animated-background {
  height: 100vh;
  width: 100%;
  background: linear-gradient(120deg, #f0f4f8, #e0e7eb, #f0f4f8, #e0e7eb);
  background-size: 400% 400%;
  animation: gentleFade 20s ease infinite;
  padding: 24px;
  display: flex;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 85%;
  margin: auto;
  width: 1000px;
  padding: 24px;
  border: solid 1px black;
}

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

.success-message {
  position: absolute;
  content: '';
  top: -40px;
  background-color: #cceecc;
  padding: 8px;
}

.quotes-visible {
  transition: opacity 1s ease;
  opacity: 1;
  pointer-events: all;
}

.title {
  text-align: center;
  font-size: 40px;
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
  transform: scale(1.02);
}

.author {
  font-size: 20px;
  font-style: italic;
}

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
  background-color: #e9e5e5;
}

.history {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  max-width: 600px;
  margin: 0 auto;
  padding: 8px;
  border: solid 1px black;
}

.history__item {
  margin-inline: 6px;
  padding: 8px;
  border: solid 1px black;
}
</style>
