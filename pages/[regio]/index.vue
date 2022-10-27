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
@keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}
.acard {
    animation-duration: 0.2s;
    animation-fill-mode: both;
    animation-name: fadeInUp;
}
.meldingen .acard:nth-child(1n) {
    animation-delay: 0.05s;
}
.meldingen .acard:nth-child(2n) {
    animation-delay: 0.1s;
}
.meldingen .acard:nth-child(3n) {
    animation-delay: 0.15s;
}
.meldingen .acard:nth-child(4n) {
    animation-delay: 0.2s;
}
.meldingen .acard:nth-child(5n) {
    animation-delay: 0.25s;
}
.meldingen .acard:nth-child(6n) {
    animation-delay: 0.3s;
}
.meldingen .acard:nth-child(7n) {
    animation-delay: 0.35s;
}
.meldingen .acard:nth-child(8n) {
    animation-delay: 0.4s;
}
.meldingen .acard:nth-child(9n) {
    animation-delay: 0.45s;
}
.meldingen .acard:nth-child(10n) {
    animation-delay: 0.5s;
}
.meldingen .acard:nth-child(11n) {
    animation-delay: 0.55s;
}
.meldingen .acard:nth-child(12n) {
    animation-delay: 0.6s;
}
.meldingen .acard:nth-child(13n) {
    animation-delay: 0.65s;
}
.meldingen .acard:nth-child(14n) {
    animation-delay: 0.7s;
}
.meldingen .acard:nth-child(15n) {
    animation-delay: 0.75s;
}
.meldingen .acard:nth-child(16n) {
    animation-delay: 0.8s;
}
.meldingen .acard:nth-child(17n) {
    animation-delay: 0.85s;
}
.meldingen .acard:nth-child(18n) {
    animation-delay: 0.9s;
}
.meldingen .acard:nth-child(19n) {
    animation-delay: 0.95s;
}
.meldingen .acard:nth-child(20n) {
    animation-delay: 1s;
}
</style>