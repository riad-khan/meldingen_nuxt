<template>
    <div>

        <Head>
            <Title>{{ data.title }}</Title>
            <Meta name="description" :content="title" />
            <Style type="text/css" children="body { background-color: green; }" />
        </Head>
        <Header />
        <main class="main-content bg-lightgrey">
            <location urlPath="meldingen" />
            <RegioList :region="region" path="nieuws" />



            <section class="news-archive sec-padding pt-0">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-xs-12">
                            <div class="main-content">

                                <!--            News card start    -->
                                <div class="card other-news box-shadow border-radius-8 d-flex" v-for="item in allNews"
                                    :key="item.id">
                                    <div class="news-thumb">
                                        <img class="img-thumb" :src="img + item.image" alt="">
                                    </div>
                                    <div class="card-content">
                                        <h3 class="card-heading">
                                            <router-link
                                                :to="'/nieuws/'+item.regio_url+'/'+item.state+'/'+item.slug+'/'+item.id">
                                                {{item.title}}</router-link>
                                        </h3>
                                        <div class="meta">
                                            <ul class="inline-list">
                                                <li><span class="icon-clock"></span> {{dateTime(item.timestamp)}} in
                                                    &nbsp;</li>
                                                <li><a href="">{{item.regio}}</a>, </li>
                                                <li>Nederland</li>
                                            </ul>
                                        </div>
                                        <div class="btn-group">
                                            <a href="" class="button btn-more bg-blue border-radius-8">{{item.tags}}</a>
                                            <a href="" class="button btn-more bg-btngrey border-radius-8">Verkeer</a>
                                        </div>
                                    </div>
                                </div>

                                <!--                News card end-->

                                <div class="load-more text-center offset-2 mobile-only">
                                    <button class="button btn-tranparent">Bekijk alle artikelen</button>
                                </div>

                                <div class="card card-img">
                                    <div class="news-item box-shadow border-radius news-ad-sec min-height-100"
                                        :style="image">
                                        <div class="news-content">
                                            <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                                        </div>
                                    </div>
                                </div>
                                <h2 class="sec-heading mt-30 color-black">Ander Nieuws</h2>

                                <div class="card other-news box-shadow border-radius-8">
                                    <div class="card-content">
                                        <h3 class="text-limit-2"><a href="">Fietsster (20) zwaargewond bij ongeval met
                                                vrachtauto in Den Haag</a></h3>
                                        <div class="meta">
                                            <ul class="inline-list">
                                                <li><span class="icon-clock"></span> 16:40 in</li>
                                                <li><a href="">IJsselland</a>, </li>
                                                <li>Nederland</li>
                                            </ul>
                                        </div>
                                        <div class="btn-group">
                                            <a href="" class="button btn-more bg-red border-radius-8">Ambulance</a>
                                            <a href="" class="button btn-more bg-btngrey border-radius-8">Verkeer</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="load-more text-center offset-2 mobile-only">
                                    <button class="button btn-tranparent">Bekijk alle artikelen</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 col-xs-12">
                            <div class="sidebar">
                                <h2 class="sec-heading weight-500" id="widget_title">Eerdere P2000-meldingen</h2>
                                <div class="card other-news box-shadow border-radius-8">
                                    <div class="card-content">
                                        <h3 class="text-limit-2 d-flex align-item-center"><img class="ambulance"
                                                src="img/ambulance.svg" /><a href="">Brandweer met gepaste spoed </a>
                                        </h3>
                                        <div class="meta">
                                            <ul class="inline-list">
                                                <li><span class="icon-clock"></span> 16-03-2022 </li>
                                                <li>om 16:40</li>
                                            </ul>
                                        </div>
                                        <div class="btn-group">
                                            <a href="" class="button btn-more bg-red border-radius-8">Brandweer</a>
                                            <a href="" class="button btn-more bg-btngrey border-radius-8">Ongeval</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card other-news box-shadow border-radius-8">
                                    <div class="card-content">
                                        <h3 class="text-limit-2 d-flex align-item-center"><img class="ambulance"
                                                src="img/ambulance.svg" /><a href="">Brandweer met gepaste spoed </a>
                                        </h3>
                                        <div class="meta">
                                            <ul class="inline-list">
                                                <li><span class="icon-clock"></span> 16-03-2022 </li>
                                                <li>om 16:40</li>
                                            </ul>
                                        </div>
                                        <div class="btn-group">
                                            <a href="" class="button btn-more bg-red border-radius-8">Brandweer</a>
                                            <a href="" class="button btn-more bg-btngrey border-radius-8">Ongeval</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-img">
                                    <div class="news-item box-shadow border-radius news-ad-sec min-height-100"
                                        :style="image">
                                        <div class="news-content">
                                            <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="card other-news box-shadow border-radius-8">
                                    <div class="card-content">
                                        <h3 class="text-limit-2 d-flex align-item-center"><img class="ambulance"
                                                src="img/ambulance.svg" /><a href="">Brandweer met gepaste spoed </a>
                                        </h3>
                                        <div class="meta">
                                            <ul class="inline-list">
                                                <li><span class="icon-clock"></span> 16-03-2022 </li>
                                                <li>om 16:40</li>
                                            </ul>
                                        </div>
                                        <div class="btn-group">
                                            <a href="" class="button btn-more bg-red border-radius-8">Brandweer</a>
                                            <a href="" class="button btn-more bg-btngrey border-radius-8">Ongeval</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card other-news box-shadow border-radius-8">
                                    <div class="card-content">
                                        <h3 class="text-limit-2 d-flex align-item-center"><img class="ambulance"
                                                src="img/ambulance.svg" /><a href="">Brandweer met gepaste spoed </a>
                                        </h3>
                                        <div class="meta">
                                            <ul class="inline-list">
                                                <li><span class="icon-clock"></span> 16-03-2022 </li>
                                                <li>om 16:40</li>
                                            </ul>
                                        </div>
                                        <div class="btn-group">
                                            <a href="" class="button btn-more bg-red border-radius-8">Brandweer</a>
                                            <a href="" class="button btn-more bg-btngrey border-radius-8">Ongeval</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-img">
                                    <div class="news-item box-shadow border-radius news-ad-sec min-height-100"
                                        :style="image">
                                        <div class="news-content">
                                            <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="card other-news box-shadow border-radius-8">
                                    <div class="card-content">
                                        <h3 class="text-limit-2 d-flex align-item-center"><img class="ambulance"
                                                src="img/ambulance.svg" /><a href="">Brandweer met gepaste spoed </a>
                                        </h3>
                                        <div class="meta">
                                            <ul class="inline-list">
                                                <li><span class="icon-clock"></span> 16-03-2022 </li>
                                                <li>om 16:40</li>
                                            </ul>
                                        </div>
                                        <div class="btn-group">
                                            <a href="" class="button btn-more bg-red border-radius-8">Brandweer</a>
                                            <a href="" class="button btn-more bg-btngrey border-radius-8">Ongeval</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-img square">
                                    <div class="news-item box-shadow border-radius news-ad-sec min-height-100"
                                        :style="image">
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



        </main>
        <Footer />

    </div>
</template>
<script setup>

const config = useRuntimeConfig();
const router = useRoute();
let apiUrl = config.public.api;
let backend = config.public.backend;
const { data } = await useAsyncData('seo', () => $fetch(`${apiUrl}/seo-data/Nieuws`))
const news = await useAsyncData('news', () => $fetch(`${apiUrl}/news/filter-news/${router.params.regio}`));


const refresh = () => refreshNuxtData('news')
const allNews = news.data;
</script>

<script>
import moment from 'moment';
import addImage from 'assets/img/add-img.jpg'
export default {
    data() {
        return {
            image: { backgroundImage: `url(${addImage})` },
        }
    },
    created(){
        
    },
    methods: {
        dateTime(value) {
            return moment(value).format('hh:mm');
        },
        DateTimeUnix(value) {
            return moment.unix(value, "MM-DD-YYYY").locale('nl').fromNow()
        },
    }
}
</script>