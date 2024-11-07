<script>
import { onMounted, ref } from 'vue';
import AppLoader from './components/AppLoader.vue';
import HistoryList from './components/HistoryList.vue';
import GetQuoteButtons from './components/GetQuoteButtons.vue';
import SocialIcons from './components/SocialIcons.vue';
import QuoteComponent from './components/QuoteComponent.vue';
import HistoryMenuButton from './components/HistoryMenuButton.vue';

export default {
  components: {
    AppLoader,
    HistoryList,
    GetQuoteButtons,
    SocialIcons,
    QuoteComponent,
    HistoryMenuButton
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
      currentCategory,
      fetchError,
      historyOfQuotes,
      copyQuote,
      loader,
      succesfulCopiedMessage,
      isHistoryOpen,
    }
  },
}
</script>

<template>
  <div class="animated-background">
    <main class="content">
      <p v-if="succesfulCopiedMessage" class="success-message">Succesfully copied!</p>
      <HistoryMenuButton @toogleHistoryMenu="isHistoryOpen = !isHistoryOpen" />

      <SocialIcons :quote="quote" />

      <div class="content__quotes">
        <QuoteComponent :quote="quote" @copyQuote="copyQuote" />

        <AppLoader v-if="loader" />

        <GetQuoteButtons v-model="currentCategory" @getQuote="getQuote" :loader="loader" :fetchError="fetchError" />
      </div>

      <HistoryList :historyOfQuotes="historyOfQuotes" :isHistoryOpen="isHistoryOpen" @copyQuote="copyQuote" />
    </main>
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

.success-message {
  position: absolute;
  content: '';
  top: -50px;
  background-color: #cceecc;
  padding: 8px;
  z-index: 50
}
</style>
