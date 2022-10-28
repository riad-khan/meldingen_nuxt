<template>
  <section>

    <Header/>
    <main class="main-content bg-dark-white">
      <section class="page-content details-page sec-padding">
        <div class="container">
          <div class="breadcrumbs desktop-only">
            <ul class="inline-list">
              <li><a href="/">Home</a><span class="right-angel">&gt;</span></li>
              <li>
                <nuxt-link to="/nieuws/">Nieuws</nuxt-link>
                <span class="right-angel">&gt;</span>
              </li>
              <li>
                <nuxt-link to="/nieuws/">{{ newsDetails.state }}</nuxt-link>
                <span class="right-angel">&gt;</span>
              </li>
              <li>
                {{ newsDetails.slug }}
              </li>
            </ul>
          </div>

          <div class="row with-sidebar">
            <div class="col-md-12 pt-30 m-pt-0">
              <div class="card card-overlay other-news box-shadow border-radius">
                <div class="card-thumb">
                  <img :src="backend + newsDetails.image" alt="nieuws image" class="desktop-only">
                  <img alt="nieuws image" class="mobile-only" :src="backend + newsDetails.image">

                </div>
                <div class="card-content card-img-overlay">
                  <div class="btn-group">
                  </div>
                  <h4 class="text-limit-2 mt-10 m-mt-0 t-mt-0" style="color:white">{{ newsDetails.title }}</h4>
                </div>
              </div>
            </div>

            <div class="col-md-8 col-lg-9 col-xs-12">

              <div class="content">
                <div class="meta">

                  <div class="row d-flex align-items-center meta-group">
                    <div class="col-md-8 col-lg-6 col-xs-6">

                      <ul class="inline-list">
                        <li><span class="icon-clock"></span> {{ dateTime(newsDetails.timestamp) }} in <span
                            style="color:red"> {{ newsDetails.city }}</span> , {{ newsDetails.state }}
                        </li>

                      </ul>
                      <span class="weblink">Bron: <a :href="newsDetails.post_url" rel="nofollow"
                                                     target="_blank">www.politie.nl</a></span>


                    </div>

                    <div class="col-md-4 col-lg-3 col-xs-6">
                      <div class="reacties d-flex align-items-center text-right">
                        <div class="heart-icon-area">


                          <!--                        <div class="heart-icon-area">-->
                          <!--                          <svg id="svg_unfill" data-id="265" onclick="my_fav(this)" class="svg unfill active"-->
                          <!--                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">-->
                          <!--                            <path stroke-width="2" fill="#FB4A3F"-->
                          <!--                                  d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 46pokFKiNH52ZK1W64wsWVH1Z2t2gueuTcj2xWWp3QCtAWGhC4m6WsQ7Sou6AtzEzrfTkoPy2ibAyA9vWsdsnRscRcX7bVy64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 46pokFKiNH52ZK1W64wsWVH1Z2t2gueuTcj2xWWp3QCtAWGhC4m6WsQ7Sou6AtzEzrfTkoPy2ibAyA9vWsdsnRscRcX7bVy.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z">-->
                          <!--                            </path>-->
                          <!--                          </svg>-->
                          <!--                          <svg id="svg_fill" data-id="265" onclick="my_dfav(this)" class="svg fill"-->
                          <!--                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">-->
                          <!--                            <path fill="#FB4A3F"-->
                          <!--                                  d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 46pokFKiNH52ZK1W64wsWVH1Z2t2gueuTcj2xWWp3QCtAWGhC4m6WsQ7Sou6AtzEzrfTkoPy2ibAyA9vWsdsnRscRcX7bVy.3-58.1 53-154.3-9.8-207.9z">-->
                          <!--                            </path>-->
                          <!--                          </svg>-->

                          <!--                        </div>-->


                        </div>
                        <button class="button btn-tranparent text-dark-white"><span class="icon-user-hear"></span>
                          {{ comments.length }} reacties
                        </button>

                      </div>
                    </div>

                  </div>

                </div>

                <p><strong>{{ newsDetails.description }}</strong></p>
                <div v-html="newsDetails.content"></div>

              </div>

              <!--   comment Section-->

              <div v-if="!auth" class="comment-sec t-mt-20">
                <h2 class="weight-500">Comment On Article</h2>
                <nuxt-link class="button btn-tranparent" to="/login">Sign up to comment</nuxt-link>
              </div>

              <div v-else class="comment-sec t-mt-20">
                <h2 class="weight-500">Reageer op dit artikel</h2>
                <div class="comment-form form-area">
                  <form id="commentForm" @submit.prevent="submitComments">
                    <input name="_token" type="hidden" value="mjWwykik7sWQ0ywZdBX33hbSoWuu6ghPSd4W8vs3">
                    <div class="form-group">
                    <textarea v-model="message" name="message" placeholder="Schrijf hier je bericht *"
                              required=""></textarea>
                    </div>


                    <button class="button btn-sumit btn-full mt-10" name="comment_submit"
                            style="background-color: #2B5882 !important;">Plaats mijn reactie
                    </button>
                  </form>
                  <div class="col-md-12">
                    <div class="form-group">
                      <p id="response" style="margin-top: 1rem"></p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="auth" class="comment-view">
                <div id="comment-area">
                  <div v-for="(item,i) in comments" class="single-comment mt-30">
                    <h2 class="weight-500 d-flex align-items-center">
                      <span class="user-name">{{ item.name }}</span>
                      <span class="comment-time alignright">{{ RelativeDate(item.posted_at) }}</span>
                    </h2>
                    <p>{{ item.comments }}</p>
                  </div>

                  <h1>comments</h1>
                </div>
                <div class="load-more  text-center">
                  <button class="button btn-tranparent btn-full" data-id="35" data-next="7" style="display: none;">Laad
                    meer reacties
                  </button>
                </div>


              </div>

            </div>

            <div class="col-md-4 col-lg-3 col-xs-12">
              <div class="sidebar">
                <h3 class="weight-500"> Ander Nieuws</h3>
                <div id="news_list">
                  <div v-for="(item, i) in recentNews" :key="i">

                    <div class="card mobile-col-2 other-news box-shadow border-radius-8">
                      <div class="card-thumb">
                        <img :src="backend + item.image" alt="nieuws image" class="desktop-only">
                        <img :src="backend + item.image" alt="nieuws image" class="mobile-only">
                      </div>
                      <div class="card-content">

                        <h6>
                          <nuxt-link
                              :to="'/nieuws/'+item.state+'/'+item.city.replace(/\s+/g, '-').toLowerCase()+'/'+item.slug+'/'+item.id"
                              class="">
                            {{ item.title }}
                          </nuxt-link>
                        </h6>
                        <div class="meta">
                          <ul class="inline-list">
                            <li><span class="icon-clock"></span> {{ dateTime(item.created_at) }} in &nbsp;</li>
                            <li style="color: darkcyan">{{ item.state }}</li>
                            <li>Nederland</li>
                          </ul>
                        </div>
                        <div class="btn-group">
                          <a v-for="(tag,i) in item.tags.split(',')" v-show="tag.length !==0 "
                             :class="'button btn-more bg-blue border-radius-8 '+ tag"
                             href="">{{ tag }}</a>
                        </div>
                      </div>


                    </div>
                    <div v-if="i % 6 === 3" class="card card-img">
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

          </div>

          <div class="row pt-20">
            <div class="col-md-12">
              <div :style="image" class="news-item box-shadow border-radius news-ad-sec">
                <div class="news-content">
                  <h2 class="new-ad-heading">Dit is een voor reclame</h2>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

    </main>


    <Footer/>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
const route = useRoute();
const {
  data: newsDetails,
  pending
} = await useAsyncData('news_details', () => $fetch(`${apiUrl}/news/${route.params.id}`))
const {data: seo} = await useAsyncData('news_seo', () => $fetch(`${apiUrl}/seo-data/Nieuws`));
const {data: recentNews} = await useLazyAsyncData('recent_news', () => $fetch(`${apiUrl}/news/recent/news`))

onMounted(() => {
  refreshNuxtData('news_details');
  refreshNuxtData('news_seo');
  refreshNuxtData('recent_news');

})
const title = route.params.slug.replaceAll("-", " ");
const state = route.params.state.replaceAll("-", " ");

useHead({
  titleTemplate: `Meldingen News Details - ${state} - ${title}`,
  // script: [{ children: `${seo.value.structured_data}` }],
  // meta: [
  //   { name: 'description', content: `${seo.value.seo_meta}` }
  // ],
})
</script>

<script>
import {isAuth} from "../../../../../middlewares/auth";
import axios from "axios";

let apiUrl;
let backend;
let token;
import addImage from 'assets/img/add-img.jpg';
import moment from 'moment';

export default {
  name: "[id]",
  data() {
    return {
      image: {backgroundImage: `url(${addImage})`},
      auth: null,
      comments: [],

    }
  },
  created() {
    if (typeof window !== 'undefined') {
      this.auth = isAuth();
      token = localStorage.getItem('token');
      this.getComments(this.$route.params.id)
    }


  },


  methods: {
    dateTime(value) {
      return moment(value).format('hh:mm');
    },
    RelativeDate(value) {
      return moment(value).format('MMMM Do YYYY, h:mm:ss a');
    },
    getComments(id) {
      axios.get(`${apiUrl}/comments/get-comments/${id}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then((response) => {
            this.comments = response.data
          })
          .catch((error) => {
            console.log(error.response)
          })
    },
    submitComments() {
      const data = {
        news_id: this.$route.params.id,
        comments: this.message,
      }
      axios.post(`${apiUrl}/comments/insert-comments`, data, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
          .then((response) => {
            const {$swal} = useNuxtApp()

            $swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'success',
              text: 'Comments created.Waiting for Approval',
            })

            this.message = '';
          })
          .catch(error => {
            console.log(error.response)
          })
    },

  }
}
</script>

<style scoped>
.btn-tranparent {
  color: white;
}
</style>