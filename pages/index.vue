<template>
  <section>
    <Header/>
    <location urlPath="meldingen"/>
    <RegioList region="Nederland" path="meldingen"/>

    <div class="container">
      <div class="row">
        <div class="col-md-9">

<!--         <div v-if="loading" class="spin" style="height: 300px;"></div>-->


         <div  class="meldingen"  v-for="(item,i) in meldingens"  :key="i">

           <div class="news-item box-shadow border-radius acard" style="margin: 10px;">
             <img :src="`/_nuxt/assets/img/${item.dienst}.png`" class="news-icon"/>


             <div class="news-content">


               <h2>
                 <router-link
                     :to="'/'+item.provincie+'/'+item.stad_url+'/'+item.regio_url+'/'+item.categorie_url+'/'+item.id">
                   {{ item.categorie }}
                 </router-link>
               </h2>

               <p class="place">

                 <span class="place-name" style="bottom: 33px;">{{ DateTime(item.timestamp) }}</span>

                 <span  v-if="item.prio === 1"
                        class="place-name prio spoed"
                        style="">{{ prio["1"] }}
                </span>
                 <span v-if="item.prio === 2"
                       class="place-name prio Gepaste"
                       >{{ prio["2"] }}
                </span>
                 <span v-if="item.prio === 3"
                       class="place-name prio geen
"
                      >{{ prio["3"] }}
                </span>
                 <span v-if="item.prio === 4"
                       class="place-name prop grote"
                      >{{ prio["4"] }}
                </span>
               </p>

               <span class="place-name"> {{ item.straat }}</span> in <span class="place-title"
                                                                           style="color: #669e97 !important;">{{ item.stad }} </span>,
               <span class="place-name">
                <nuxt-link :to="`/${item.provincie}`">{{ item.provincie }}</nuxt-link></span>
             </div>

           </div>
           <div v-if="i % 7 === 5" class="card card-img">
             <div class="news-item box-shadow border-radius news-ad-sec min-height-100"
                  :style="image">
               <div class="news-content">
                 <h2 class="new-ad-heading"> Dit is een placeholder voor reclame</h2>
               </div>
             </div>
           </div>
         </div>


        


        </div>

      </div>


    </div>

    <Footer/>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;

const {data: melding, pending} = await useAsyncData('get_meldingen', () => $fetch(`${apiUrl}/meldingen/scroll-more/0`));
const {data: seo} = await useAsyncData('home_seo', () => $fetch(`${apiUrl}/seo-data/home`));

useHead({
  titleTemplate: ` ${seo.value.title}`,
  script: [{children: `${seo.value.structured_data}`}],
  meta: [
    {name: 'description', content: `${seo.value.seo_meta}`},
    {name: 'keywords', content: `${seo.value.seo_keywords}`}
  ],
})
meldingenArray = melding.value;
isLoading = pending;
onMounted(() => {
  refreshNuxtData('get_meldingen');
  refreshNuxtData('home_seo');

})

</script>

<script>
import moment from "moment/moment";
import axios from "axios";
import addImage from 'assets/img/add-img.jpg'

let apiUrl;
let backend;
let meldingenArray;
let isLoading;
export default {
  name: "index.vue",
  data() {
    return {
      image: {backgroundImage: `url(${addImage})`},
      prio: {
        1: 'Spoed',
        2: 'Gepaste spoed',
        3: 'Geen spoed',
        4: 'Grote ingreep'
      },

      nexReq: null,
      meldingens: [],
     loading:false,

      increment: 1,
    }
  },
  created() {
    this.loading = isLoading
    this.meldingens = meldingenArray;
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    DateTime(value) {
      return moment.unix(value, "MM-DD-YYYY").fromNow()
    },
    getMoreMeldingen(page) {
      this.loading = true;

      axios.get(`${apiUrl}/meldingen/scroll-more/` + page)
          .then((response) => {
            response.data.map((item, i) => {
              this.meldingens.push(item)
              this.loading = false;

            })

          })
          .catch(error => {
            console.log(error)
          })


    },
    handleScroll() {
      if ((Math.round(window.scrollY) + window.innerHeight) >= document.body.scrollHeight) {
        if (!this.nexReq) {
          this.getMoreMeldingen(this.increment++);

        }
      }

    }
  }
}
</script>

<style scoped>
.prio{

  color: white;
  bottom: 14px;
  font-size: 14px;
  padding: 3px 5px;
  border-radius:4px;
  text-align: center;
}
.spoed{
  background-color: #e05b59 !important;
}
.Gepaste{
  background-color: #deae00 !important;
}
.geen{
  background-color: #669e97 !important;
}
.grote{
  background-color: #deae00 !important;
}

</style>