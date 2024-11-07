<script>
import { onMounted, ref } from 'vue';
import { categories } from './assets/constants';
import AppLoader from './components/AppLoader.vue';
import HistoryIcon from './icons/HistoryIcon.vue';
import CloseIcon from './icons/CloseIcon.vue';
import FacebookIcon from './icons/FacebookIcon.vue';
import TelegramIcon from './icons/TelegramIcon.vue';
import TwitterIcon from './icons/TwitterIcon.vue';

export default {
  components: {
    AppLoader,
    HistoryIcon,
    CloseIcon,
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
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
    const isHistoryOpen = ref(false);
    const currentLocation = ref(window.location.href)

    function getQuote() {
      loader.value = true
      fetchError.value = ''

      if (quote.value.quote) {
        historyOfQuotes.value.unshift({ ...quote.value })
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

    onMounted(() => getQuote())

    function copyQuote(text) {
      navigator.clipboard.writeText(text)
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
      succesfulCopiedMessage,
      isHistoryOpen,
      currentLocation,
    }
  },
}
</script>

<template>
  <div class="animated-background">
    <div class="content">
      <p v-if="succesfulCopiedMessage" class="success-message">Succesfully copied!</p>
      <button class="history-icon" @click="isHistoryOpen = !isHistoryOpen">
        <HistoryIcon v-if="!isHistoryOpen" />
        <CloseIcon v-else />
      </button>

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

      <div class="content__quotes">
        <h1 v-if="!loader && !historyOfQuotes.length && !quote.quote" class="title">"Quotes from Great Minds:<br />
          Inspiration
          on Every Topic
          <br /> Just Try!
        </h1>

        <div class="quotes" :class="quote.quote && 'quotes-visible'">
          <p @click="copyQuote(quote.quote)" class="quote" title="copy this quote"> {{ quote.quote }}</p>
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

      <ul class="content__history" :class="isHistoryOpen && 'content__history-visibile'">
        <h2 class="history-title">History of quotes:</h2>
        <li v-for="item in historyOfQuotes" :key="item.quote" class="history__item">
          <p @click="copyQuote(item.quote)" class="quote"> {{ item.quote }} </p>
          <p class="author"> {{ item.author }} </p>
        </li>
      </ul>
    </div>
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85%;
  margin: auto;
  width: 1000px;
  padding: 24px;
  border: solid 1px black;
  border-radius: 12px;
  background-color: #f0f4f8;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}

.content__quotes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

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
  top: -50px;
  background-color: #cceecc;
  padding: 8px;
  z-index: 50
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
  transform: scale(1.01);
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
  background-color: #f0f4f8;
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

.history-quote {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
}
</style>
