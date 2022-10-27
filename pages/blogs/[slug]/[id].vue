<template>
    <div>
        <Header />
        <main class="main-content bg-dark-white">
            <!-- / Step Section-->
            <section class="page-content details-page sec-padding">
              <div class="container">
                <div class="breadcrumbs desktop-only">
                  <ul class="inline-list">
                    <li><nuxt-link to="/">Home</nuxt-link><span class="right-angel">&gt;</span></li>
                    <li><nuxt-link to="/blogs">Blogs</nuxt-link><span class="right-angel">&gt;</span></li>
                    <li>
                      {{blogDetails.slug}}
                    </li>
                  </ul>
                </div>
                <div class="row with-sidebar">
                  <div class="col-md-12 pt-30 m-pt-0">
                    <div class="card card-overlay other-news box-shadow border-radius">
                      <div class="card-thumb">
                        <img class="desktop-only" :src="backend + blogDetails.images" alt="nieuws image">
                        <img class="mobile-only" :src="backend + blogDetails.images" alt="nieuws image">
        
                      </div>
                      <div class="card-content card-img-overlay">
                        <div class="btn-group">
                        </div>
                        <h1 class="text-limit-2 mt-10 m-mt-0 t-mt-0">{{blogDetails.blog_title}}</h1>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8 col-lg-9 col-xs-12">
                    <div class="content">
                      <div class="meta">
                        <div class="row d-flex align-items-center meta-group">
                          <div class="col-md-8 col-lg-6 col-xs-6">
                            <ul class="inline-list">
                              <li><span class="icon-clock"></span> Posted at {{DateTime(blogDetails.created_at)}} </li>
        
        
                            </ul>
        
                          </div>
        
                        </div>
                      </div>
                      <p><strong>{{blogDetails.description}}</strong></p>
                      <div v-html="blogDetails.content"></div>
        
                    </div>
                  </div>

                  <div class="col-md-4 col-lg-3 col-xs-12">
                    <div class="sidebar">
                      <h3 class="weight-500"> Andere berichten</h3>
                      <div id="news_list">
        
                        <div class="card mobile-col-2 other-news box-shadow border-radius-8" v-for="(item, i) in recents" :key="i">
                          <div class="card-thumb">
                            <img class="desktop-only" :src="backend + item.images" alt="blog image">
                            <img class="mobile-only" :src="backend + item.images" alt="blog image">
                          </div>
                          <div class="card-content">
        
                            <h2><router-link :to="'/blogs/'+ item.slug + '/' + item.id">{{item.blog_title.length > 25 ? item.blog_title.substr(0,25) + '...': item.blog_title}}</router-link></h2>
                            <div class="meta">
        
                              <p>{{item.description.substr(0,100) + '...'}}</p>
        
        
                            </div>
                            <div class="btn-group">
                            </div>
                          </div>
                        </div>
        
        
                      </div>
        
                    </div>
                  </div>


                </div>
                <div class="row pt-20">
                  <div class="col-md-12">
                    <div class="news-item box-shadow border-radius news-ad-sec" :style="image">
                      <div class="news-content">
                        <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
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
const route = useRoute();
apiUrl = config.public.api;
backend = config.public.backend;
const {data: blogDetails, pending} = await useAsyncData('get_blog_details', () => $fetch(`${apiUrl}/blogs/${route.params.id}`));
const {data: recents} = await useAsyncData('get_recent_blogs', () => $fetch(`${apiUrl}/blogs/recent-blogs`));
const {data: seo} = await useAsyncData('blogs_seo', () => $fetch(`${apiUrl}/seo-data/Blog`));
useHead({
  titleTemplate: `Blog - Meldingen.nl - ${blogDetails.value.blog_title}`,
  script: [{children: `${seo.value.structured_data}`}],
  meta: [
    {name: 'description', content: `${seo.value.seo_meta}`},
    {name: 'keywords', content: `${seo.value.seo_keywords}`}
  ],
})

onMounted(() => {
  refreshNuxtData('get_blog_details');
  refreshNuxtData('get_recent_blogs');
  refreshNuxtData('blog_details_seo');

})
</script>

<script>
let apiUrl;
let backend;
import addImage from 'assets/img/add-img.jpg';
import moment from 'moment';
export default{
    data(){
        return{
            image: {backgroundImage: `url(${addImage})`},
        }
    },
    methods:{
    DateTime(value){
      return moment(value).format('hh:mm')
    }
  }
}

</script>

<style scoped>

</style>