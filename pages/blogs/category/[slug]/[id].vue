<template>
    <section>
        <Header />
        <main class="main-content bg-lightgrey">
            <!-- / Step Section-->
            <section class="page-content details-page sec-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8">
                            <h1>{{ category[0].category_title }}</h1>

                            <p>{{ category[0].short_description }}</p>
                        </div>
                        <div class="col-md-4">
                            <img :src="backend + category[0].images">
                        </div>
                    </div>

                    <div style="margin-bottom: 35px;">
        
                        <div style="margin-left: 20px;">
                          Categories :
                          <router-link class="button mb-5 " :to="'/blogs'">All Blogs</router-link>
                          <router-link class="button" style="margin-left: 5px;" v-for="(item,i) in categories" :key="i" :to="'/blogs/category/'+item.slug + '/' + item.id">{{item.category_name}}</router-link>
              
                           </div>
              
              
                      </div>

                    <div class="row">
                        <div class="col-md-12">

                           

                            <div class="col-md-4" v-for="blog in blogs" :key="blog.id">
                                <div class="card other-news box-shadow border-radius-8">
                                    <div class="card-thumb">
                                        <img :src="backend + blog.images" alt="nieuws foto">

                                    </div>
                                    <div class="card-content">


                                        <h6 class="text-limit-2">
                                            <router-link :to="'/blogs/' + blog.slug + '/' + blog.id">{{ blog.blog_title }}
                                            </router-link>
                                        </h6>
                                        <p>{{ blog.description.substr(0, 100) + "..." }}</p>
                                        <div class="meta">
                                            <ul class="inline-list">
                                                <li><a href=""><span class="link___fXYli">Lees meer
                                                            <svg width="6" height="10" viewBox="0 0 6 10">
                                                                <path
                                                                    d="M.348 1.152a.522.522 0 00-.012.71L3.25 5 .336 8.139a.52.52 0 00.012.709l.804.804a.467.467 0 00.686-.028l3.824-4.248a.572.572 0 000-.752L1.838.376a.472.472 0 00-.686-.028l-.804.804z"
                                                                    fill="#FB4A3F" fill-rule="evenodd"></path>
                                                            </svg></span></a></li>






                                            </ul>
                                        </div>
                                        <div class="btn-group">
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
    </section>

</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();
let apiUrl;
let backend;
apiUrl = config.public.api;
backend = config.public.backend;

const { data: blogs, pending } = await useAsyncData('filter_blogs', () => $fetch(`${apiUrl}/blogs/filtered-blogs/${route.params.id}`));
const {data: categories} = await useLazyAsyncData('get_categories', () => $fetch(`${apiUrl}/blogs/category`));

categoryArray = categories.value


onMounted(() => {
  refreshNuxtData('filter_blogs');
  refreshNuxtData('get_categories');
  refreshNuxtData('blogs_seo');

})
</script>

<script>
let categoryArray;

export default{
    data(){
        return{
            categories:[],
        }
    },
    created(){
        this.categories = categoryArray
    },
    computed:{
       category(){
        const id  = this.$route.params.id;
        return this.categories.filter((item, i)=>{
            return item.id == id
        })
       }
    }
}


</script>

<style scoped>

</style>