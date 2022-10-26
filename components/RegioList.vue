<template>
  <section class="news-overview-sec">
    <div class="container">
      <button id="news-btn" class="news-list-btn" @click="toggleRegio">Trending in <span
          class="primary-color">{{ region }}</span> <img alt=""
                                                         src="@/assets/img/icon-angle-down.svg"/></button>

      <div id="news-list" class="row bg-white border-radius">
        <div class="col-md-12">
          <h2 class="sec-heading">Kies je regio</h2>


        </div>


        <div v-for="(item, i) in regios" :key="i" class="col col-md-3">
          <div class="news-list">
            <ul>
              <li :class="region === item.regio ? 'active' : ''">
                <nuxt-link :to="`/${path}/${item.provincie_url}`">{{ item.regio }}</nuxt-link>
              </li>


            </ul>
          </div>
        </div>


      </div>
    </div>
  </section>


  <!--/ News Overview Section -->
</template>

<script>
import $ from 'jquery'

let apiUrl;
import axios from 'axios';

export default {
  setup() {
    const config = useRuntimeConfig();
    apiUrl = config.public.api;
  },
  name: "RegioList",
  props: ['region', 'path'],
  data() {
    return {
      regios: [],
      toggler: false,
    }
  },
  created() {
    axios.get(`${apiUrl}/news/fetch/regios`)
        .then((response) => {
          this.regios = response.data
        })
        .catch(error => {
          console.log(response.data);
        })
  },

  methods: {
    toggleRegio() {
      $("#news-list").slideToggle(500);
      $(this).toggleClass("angle-up");
      $("#widget_title").toggleClass("slideOpen", 500);
    },

  }
}
</script>

<style scoped>

</style>