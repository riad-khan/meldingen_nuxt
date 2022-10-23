<template>
    <div>

        <Head>
            <Title>112 Nieuws | Meldingen.nl</Title>
            <Meta name="description" :content="title" />
            <Style type="text/css" children="body { background-color: green; }" />
        </Head>
        <Header />
        <main class="main-content bg-lightgrey">
            <location urlPath="meldingen" />
            <RegioList :region="region" path="nieuws" />
            <section class="news-archive sec-padding pt-0 meldingen_div">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-xs-12">
                            <div class="main-content">

                              <div v-if="pending === true" style="height: 300px;" :class="pending ? 'spin':''"></div>
                                <div v-else class="card other-news box-shadow border-radius-8 d-flex" v-for="item in allNews"
                                    :key="item.id">
                                    <div class="news-thumb">
<!--                                        <img class="img-thumb" :src="img + item.image" alt="">-->
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
/* const { data } = await useAsyncData('seo', () => $fetch(`${apiUrl}/seo-data/Nieuws`)) */

const {data: allNews ,pending} =  await useLazyAsyncData('news', () => $fetch(`${apiUrl}/news/filter-news/${router.params.regio}`));

onMounted( () => {
  refreshNuxtData('news');
})
</script>

<script>
import moment from 'moment';
import addImage from 'assets/img/add-img.jpg'
export default {

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