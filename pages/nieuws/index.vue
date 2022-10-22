<template>
  <div>
    <Header />

    <main class="main-content bg-lightgrey">


      <Location urlPath="nieuws" />

      <!-- News Section-->
      <section class="news-archive sec-padding pt-0">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-xs-12">
              <div class="main-content">

                <!--            News card start    -->


                <div data-aos="fade-up" data-aos-delay="10" data-aos-once="true"
                  class="card other-news box-shadow border-radius-8 d-flex aos-init aos-animate" v-for="(item,i) in news">
                  <div class="news-thumb"><img class="img-thumb"
                      src="https://admin.meldingen.nl/backoffice/news_imgs/Politie/254A3416.jpg" alt=""></div>
                  <div class="card-content">
                    <h3 class="card-heading"><a
                        href="/nieuws/Noord-Brabant/Waalwijk/waalwijk-vrouw-belemmert-aanhouding-van-vriend/849"
                        class="">Waalwijk - Vrouw belemmert aanhouding van vriend</a></h3>
                    <div class="meta">
                      <ul class="inline-list">
                        <li><span class="icon-clock"></span> 07:19 in &nbsp;</li>
                        <li><a href="">Noord-Brabant</a>, </li>
                        <li>Nederland</li>
                      </ul>
                    </div>
                    <div class="btn-group"><a href="" class="button btn-more bg-blue border-radius-8">Politie</a><a
                        href="" class="button btn-more bg-btngrey border-radius-8">Verkeer</a></div>
                  </div>
                </div>

                <!--                News card end-->






              </div>
            </div>

          </div>
        </div>

      </section>
      <!-- / Step Section-->
    </main>

    <Footer />
  </div>
</template>

<script>

import moment from 'moment';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { reactive } from 'vue'
import addImage from 'assets/img/add-img.jpg'
import Location from "../../components/Location";

let apiUrl;
export default {
  components: {Location},
  setup() {
    const config = useRuntimeConfig();
    apiUrl = config.public.api;
  },
  name: "index",
  data() {
    return {

      image: { backgroundImage: `url(${addImage})` },
      // storageUrl : process.env.VUE_APP_LARAVEL_URL,
      increment: 1,
      nextReq: null,
      moreNews: [],
      img: addImage,
      recentMeldingen: [],
      news: [],
      newsLoading: false
    }
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      this.newsLoading = true;
      axios.get(`${apiUrl}/news`)
        .then((response) => {
          this.newsLoading = false;
          this.news = response.data
        })
        .catch(error => {
          console.log(error)
        })

    },
    dateTime(value) {
      return moment(value).format('hh:mm');
    },
    DateTimeUnix(value) {
      return moment.unix(value, "MM-DD-YYYY").locale('nl').fromNow()
    },
  },

}
</script>

<style scoped>

</style>