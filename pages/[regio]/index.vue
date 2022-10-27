<template>
    <div>
        <Header />
        <location urlPath="meldingen" />
        <RegioList :region="region" path="meldingen" />

        <div class="container">
            <div class="row">
                <div class="col-md-9">
                   
                    

                   <div  class="meldingen">
                    <div v-for="(item,i) in meldingens" :key="i">
          
                        <div class="news-item box-shadow border-radius acard" 
                             style="margin: 10px;">
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
            
                              <span v-if="item.prio === 1"
                                    class="place-name"
                                    style="background-color: #e05b59;color: white;bottom: 14px;font-size: 14px;padding: 3px 5px;border-radius:4px">{{ prio["1"] }}
                            </span>
                              <span v-if="item.prio === 2"
                                    class="place-name"
                                    style="background-color: #deae00;color: white;bottom: 14px;font-size: 14px;padding: 3px 5px;border-radius:4px">{{ prio["2"] }}
                            </span>
                              <span v-if="item.prio === 3"
                                    class="place-name"
                                    style="background-color: #669e97;color: white;bottom: 14px;font-size: 14px;padding: 3px 5px;border-radius:4px">{{ prio["3"] }}
                            </span>
                              <span v-if="item.prio === 4"
                                    class="place-name"
                                    style="background-color: #deae00;color: white;bottom: 14px;font-size: 14px;padding: 3px 5px;border-radius:4px">{{ prio["4"] }}
                            </span>
                            </p>
            
                            <span class="place-name"> {{ item.straat }}</span> in <span class="place-title"
                                                                                        style="color: #669e97 !important;">{{ item.stad }} </span>,
                            <span class="place-name">
                            {{ item.provincie }}</span>
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
          
                    <div v-if="loading === true" :class="loading ? 'spin':''" style="height: 300px;"></div>


                </div>
            </div>
        </div>

        <Footer />
    </div>

</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;

const { data: melding, pending } = await useAsyncData('filter_meldingen', () => $fetch(`${apiUrl}/meldingen/filter-meldingen/${route.params.regio}/0`));
meldingenArray = melding;

onMounted(() => {
    refreshNuxtData('filter_meldingen');
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

export default {
    name: 'FilterMeldingen',
    data() {
        return {
            image: { backgroundImage: `url(${addImage})` },
            prio: {
                1: 'Spoed',
                2: 'Gepaste spoed',
                3: 'Geen spoed',
                4: 'Grote ingreep'
            },
            meldingens: [],
            increment: 1,
            region: '',
            isLoading: false,


        }
    },

    created() {
        const route = useRoute();
        this.region = route.params.regio
        this.meldingens = meldingenArray;
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
  
    methods: {
        DateTime(value) {
            return moment.unix(value, "MM-DD-YYYY").locale('nl').fromNow()
        },
        getMoreMeldingen(page) {
            const regio = this.$route.params.regio;
            this.isLoading = true;
            axios.get(`${apiUrl}/meldingen/filter-meldingen/` + regio + '/' + page)
                .then((response) => {
                    response.data.map((item, i) => {
                        this.meldingens.push(item)
                        this.isLoading = false;
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false;
                })

        },
        handleScroll() {
            if ((Math.round(window.scrollY) + window.innerHeight) >= document.body.scrollHeight) {
                
                    this.getMoreMeldingen(this.increment++);
                
            }

        }
    }
}
</script>
<style scoped>

</style>