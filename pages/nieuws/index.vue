<template>
  <div>
    <Header />

   <main class="main-content bg-lightgrey">


      <Location urlPath="nieuws" />
      <RegioList region="Nederland" path="nieuws" />

      <!-- News Section-->
      <section class="news-archive sec-padding pt-0">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-xs-12 ">
              <div class="main-content main-height">

                <!--            News card start    -->

                <div v-if="newsLoading === true" style="height: 300px;" :class="newsLoading ? 'spin':''"></div>


                <div data-aos="fade-up" data-aos-delay="10" data-aos-once="true"
                  class="card other-news box-shadow border-radius-8 d-flex" v-for="(item,i) in news">
                  <div class="news-thumb"><img class="img-thumb" :src="backend + item.image" alt=""></div>
                  <div class="card-content">
                    <h3 class="card-heading">
                      <nuxt-link :to="'/nieuws/'+item.state+'/'+item.city+'/'+item.slug+'/'+item.id" class="">
                        {{item.title}}</nuxt-link>
                    </h3>
                    <div class="meta">
                      <ul class="inline-list">
                        <li><span class="icon-clock"></span> {{dateTime(item.created_at)}} in &nbsp;</li>
                        <li><a href="">{{item.state}}</a>,&nbsp; </li>
                        <li>Nederland</li>
                      </ul>
                    </div>
                    <div class="btn-group">
                      <a href="" v-for="(tag,i) in item.tags.split(',')" :class="'button btn-more bg-blue border-radius-8 '+ tag"
                        v-show="tag.length !==0 ">{{tag}}</a>
                    </div>
                  </div>
                </div>

                <!--                News card end-->

                <div class="load-more text-center offset-2 mobile-only">
                  <button class="button btn-tranparent">Bekijk alle artikelen</button>
                </div>

                <div class="card card-img">
                  <div class="news-item box-shadow border-radius news-ad-sec min-height-100" :style="image">
                    <div class="news-content">
                      <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                    </div>
                  </div>
                </div>


                <h2 class="sec-heading mt-30 color-black">Ander Nieuws</h2>

                <div data-aos="fade-up" data-aos-delay="10" data-aos-once="true"
                  class="card other-news box-shadow border-radius-8" v-for="(item, i) in moreNews" :key="i">

                  <div class="card-content">
                    <h3 class="card-heading">
                      <nuxt-link :to="'/nieuws/'+item.state+'/'+item.city+'/'+item.slug+'/'+item.id" class="">
                        {{item.title}}</nuxt-link>
                    </h3>
                    <div class="meta">
                      <ul class="inline-list">
                        <li><span class="icon-clock"></span> {{dateTime(item.created_at)}} in &nbsp;</li>
                        <li><a href="">{{item.state}}</a>,&nbsp; </li>
                        <li>Nederland</li>
                      </ul>
                    </div>
                    <div class="btn-group">
                      <a href="" v-for="(tag,i) in item.tags.split(',')" :class="'button btn-more bg-blue border-radius-8 '+ tag"
                        v-show="tag.length !==0 ">{{tag}}</a>
                    </div>
                  </div>

                </div>
                <div v-if="loadingMore === true" style="height: 300px;" :class="loadingMore ? 'spin':''"></div>


               




              </div>
            </div>

             <!-- Recent meldingen -->

            <div class="col-md-4 col-xs-12">
              <div class="sidebar">
                
              <h2 class="sec-heading weight-500" id="widget_title">Eerdere P2000-meldingen</h2>
  
              <div v-for="(item,i) in recentMeldingen">
                <div class="card other-news box-shadow border-radius-8">
                  <div class="card-content">
                    <h3>
                      
                      <img class="news-icon" :src="`/_nuxt/assets/img/${item.dienst}.png`"/>

                      <nuxt-link
                        :to="'/'+item.provincie+'/'+item.stad_url+'/'+item.straat_url+'/'+item.categorie_url+'/'+item.id">
                        {{item.categorie}}</nuxt-link>
                    </h3>
                    <div class="meta">
                      <ul class="inline-list">
                        <span class="place-name" style="bottom: 33px;">{{DateTimeUnix(item.timestamp)}}</span>
                       
                      </ul>
                    </div>
                    <div class="btn-group">
                      <a href="" :class="'button btn-more bg-red border-radius-8 '+item.dienst">{{item.dienst}}</a>
                      
                    </div>
                  </div>
                </div>
              
                <div class="card card-img" v-if="i % 2 === 1">
                  <div class="news-item box-shadow border-radius news-ad-sec min-height-100" :style="image">
                    <div class="news-content">
                      <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                    </div>
                  </div>
                </div>
               
              
              
  
              </div>
  
  
                <div class="card card-img square">
                  <div class="news-item box-shadow border-radius news-ad-sec min-height-100" :style="image">
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

const test  = await useAsyncData('seo', () => $fetch('http://localhost:4000/api/seo-data/Nieuws'))
const config = useRuntimeConfig();
    apiUrl = config.public.api;
    backend = config.public.backend;
   
    let siteData = reactive({
      title: 'Meldingen.nl',
      description: '',
      keywords:''
    });
</script>

<script>

import moment from 'moment';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { reactive } from 'vue'
import { useHead } from '@vueuse/head';
import addImage from 'assets/img/add-img.jpg'
import Location from "../../components/Location";
let apiUrl;
let backend;
let seo;



export default {
 
  components: { Location },
 
  name: "index",
  data() {
    return {

      image: { backgroundImage: `url(${addImage})` },
     
      increment: 1,
      nextReq: null,
      moreNews: [],
      backend: backend,
      img: addImage,
      recentMeldingen: [],
      news: [],
      newsLoading: false,
      loadingMore: false,
      increment: 1,
      nextReq: null,
      moreNews: [],
      recentMeldingen: [],
    }
  },
  mounted() {
    this.getOtherNews();
    window.addEventListener('scroll', this.handleScroll);
    AOS.init();
    this.fetchNews();

    axios.get(`${apiUrl}/news/recent/meldingen`)
      .then((response)=>{
       this.recentMeldingen = response.data
      })
      .catch(error =>{
        console.log(error);
      })

   

  },
  methods: {
   async fetchNews() {
      this.newsLoading = true;
       const response = await axios.get(`${apiUrl}/news`)
        this.news = response.data;
        this.newsLoading = false;
    },
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

<style scoped>

</style>