<template>
  <div>
    <Header />
    <main class="main-content bg-lightgrey">


      <Location urlPath="nieuws" />
      <RegioList :region="region" path="nieuws" />

      <!-- News Section-->
      <section class="news-archive sec-padding pt-0">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-xs-12 ">
              <div class="main-content main-height">

                <!--            News card start    -->

                <div v-if="pending === true" :class="pending ? 'spin' : ''" style="height: 300px;"></div>


                <div v-for="(item, i) in allNews" class="card other-news box-shadow border-radius-8 d-flex"
                  data-aos="fade-up" data-aos-delay="10" data-aos-once="true">
                  <div class="news-thumb"><img :src="backend + item.image" alt="" class="img-thumb"></div>
                  <div class="card-content">
                    <h3 class="card-heading">
                      <nuxt-link
                        :to="'/nieuws/' + item.state + '/' + item.city.replace(/\s+/g, '-').toLowerCase() + '/' + item.slug + '/' + item.id"
                        class="">
                        {{ item.title }}
                      </nuxt-link>
                    </h3>
                    <div class="meta">
                      <ul class="inline-list">
                        <li><span class="icon-clock"></span> {{ dateTime(item.created_at) }} in &nbsp;</li>
                        <li>
                          <nuxt-link to="">{{ item.state }}</nuxt-link>
                          ,&nbsp;
                        </li>
                        <li>Nederland</li>
                      </ul>
                    </div>
                    <div class="btn-group">
                      <a v-for="(tag, i) in item.tags.split(',')" v-show="tag.length !== 0"
                        :class="'button btn-more bg-blue border-radius-8 ' + tag" href="">{{ tag }}</a>
                    </div>
                  </div>
                </div>

                <!--                News card end-->

                <div class="load-more text-center offset-2 mobile-only">
                  <button class="button btn-tranparent">Bekijk alle artikelen</button>
                </div>

                <div class="card card-img">
                  <div :style="image" class="news-item box-shadow border-radius news-ad-sec min-height-100">
                    <div class="news-content">
                      <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                    </div>
                  </div>
                </div>


                <h2 class="sec-heading mt-30 color-black">Ander Nieuws</h2>

                <div v-for="(item, i) in moreNews" :key="i" class="card other-news box-shadow border-radius-8"
                  data-aos="fade-up" data-aos-delay="10" data-aos-once="true">

                  <div class="card-content">
                    <h3 class="card-heading">
                      <nuxt-link :to="'/nieuws/' + item.state + '/' + item.city + '/' + item.slug + '/' + item.id" class="">
                        {{ item.title }}
                      </nuxt-link>
                    </h3>
                    <div class="meta">
                      <ul class="inline-list">
                        <li><span class="icon-clock"></span> {{ dateTime(item.created_at) }} in &nbsp;</li>
                        <li><a href="">{{ item.state }}</a>,&nbsp;</li>
                        <li>Nederland</li>
                      </ul>
                    </div>
                    <div class="btn-group">
                      <a v-for="(tag, i) in item.tags.split(',')" v-show="tag.length !== 0"
                        :class="'button btn-more bg-blue border-radius-8 ' + tag" href="">{{ tag }}</a>
                    </div>
                  </div>

                </div>
                <div v-if="loadingMore === true" :class="loadingMore ? 'spin' : ''" style="height: 300px;"></div>


              </div>
            </div>

            <!-- Recent meldingen -->

            <div class="col-md-4 col-xs-12">
              <div class="sidebar">

                <h2 id="widget_title" class="sec-heading weight-500">Eerdere P2000-meldingen</h2>

                <div v-for="(item, i) in recentMeldingen">
                  <div class="card other-news box-shadow border-radius-8">
                    <div class="card-content">
                      <h3>

                        <img :src="`/_nuxt/assets/img/${item.dienst}.png`" class="news-icon" />

                        <nuxt-link
                          :to="'/' + item.provincie + '/' + item.stad_url + '/' + item.straat_url + '/' + item.categorie_url + '/' + item.id">
                          {{ item.categorie }}
                        </nuxt-link>
                      </h3>
                      <div class="meta">
                        <ul class="inline-list">
                          <span class="place-name" style="bottom: 33px;">{{ DateTimeUnix(item.timestamp) }}</span>

                        </ul>
                      </div>
                      <span class="place-name"> {{ item.straat }}</span> in <span class="place-title"
                        style="color: #669e97 !important;">{{ item.stad }} </span>,
                      <span class="place-name">
                        {{ item.provincie }}</span>
                      <div class="btn-group">
                        <a :class="'button btn-more bg-red border-radius-8 ' + item.dienst" href="">{{ item.dienst }}</a>

                      </div>
                    </div>
                  </div>

                  <div v-if="i % 2 === 1" class="card card-img">
                    <div :style="image" class="news-item box-shadow border-radius news-ad-sec min-height-100">
                      <div class="news-content">
                        <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                      </div>
                    </div>
                  </div>


                </div>


                <div class="card card-img square">
                  <div :style="image" class="news-item box-shadow border-radius news-ad-sec min-height-100">
                    <div class="news-content">
                      <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                    </div>
                  </div>
                </div>
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
  
<script setup>

const config = useRuntimeConfig();
const router = useRoute();
apiUrl = config.public.api;
backend = config.public.backend;
const { data } = await useAsyncData('seo', () => $fetch(`${apiUrl}/seo-data/Nieuws`))

useHead({
  title: `${data.value.title}  ${router.params.regio}`,
  meta: [
    { name: 'description', content: `${data.value.seo_meta}` },
    { name: 'keywords', content: `${data.value.seo_keywords}` }
  ],

  script: [{ children: `${data.value.structured_data}` }]
})

const {
  data: allNews,
  pending
} = await useAsyncData('filter_news', () => $fetch(`${apiUrl}/news/filter-news/${router.params.provincie}`));
const { data: recentMeldingen } = await useAsyncData('recent_meldingen', () => $fetch(`${apiUrl}/news/recent/meldingen`));

onMounted(() => {
  refreshNuxtData('filter_news');
})
</script>
  
  
<script>
import moment from 'moment';
import addImage from 'assets/img/add-img.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";

let apiUrl;
let backend;
export default {
  created() {
    const route = useRoute();
    this.region = route.params.provincie
  },
  data() {
    return {
      region: '',
      image: { backgroundImage: `url(${addImage})` },

      increment: 1,
      nextReq: null,
      moreNews: [],
      img: addImage,
      loadingMore: false,
    }
  },

  mounted() {
    AOS.init();
    this.getOtherNews();
    window.addEventListener('scroll', this.handleScroll);

    // this.fetchNews();
  },
  methods: {

    dateTime(value) {
      return moment(value).format('hh:mm');
    },
    DateTimeUnix(value) {
      return moment.unix(value, "MM-DD-YYYY").locale('nl').fromNow()
    },

    getOtherNews() {
      axios.get(`${apiUrl}/news/other/news/`)
        .then((response) => {
          response.data.map((item, i) => {
            this.increment = 2;
            this.moreNews.push(item)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getMoreOtherNews(page) {
      this.loadingMore = true;
      axios.get(`${apiUrl}/news/getMoreOtherNews/` + page)
        .then((response) => {
          this.nexReq = false;
          this.loadingMore = false;
          response.data.map((item, i) => {
            this.moreNews.push(item)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleScroll() {

      if ((Math.round(window.scrollY) + window.innerHeight) >= document.body.scrollHeight) {


        this.getMoreOtherNews(this.increment++);

      }

    },

  },
}
</script>