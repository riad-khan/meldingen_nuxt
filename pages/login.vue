<template>
  <section>
    <Header/>
    <main class="main-content bg-lightgrey">

      <div v-if="isLoading === true" :class="isLoading ? 'spin':''" style="height: 300px;"></div>

      <div v-else class="page-content my-account login sec-padding" data-aos="fade-up" data-aos-delay="10"
           data-aos-once="true">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="my-acc-sec text-center">
                <h2>Log in op je account</h2>
                <div class="my-acc-form form-area contact-box box-shadow border-radius bg-white-gray text-left">
                  <form @submit.prevent="login">
                    <div class="form-group">
                      <input v-model="form.email" class="form-control" name="email" placeholder="E-mail adres"
                             required type="email">
                    </div>
                    <div class="form-group">
                      <input v-model="form.password" class="form-control" name="password" placeholder="Wachtwoord"
                             required type="password">
                    </div>

                    <div class="btn-group">
                      <button class="button btn-submit btn-full mt-10" type="submit">Inloggen</button>
                      <a class="button btn-submit btn-full" href="http://localhost:3000/auth/google"
                         target="_blank"> <img src="@/assets/img/google-icon.svg"/>
                        Sign in with Google
                      </a>

                      <a class="button btn-submit btn-full mt-10" href="http://localhost:3000/auth/facebook"
                         target="_blank"><img src="@/assets/img/facebook-icon.svg"/>
                        Sign in with Facebook
                      </a>
                    </div>
                  </form>
                  <div class="text-center mt-20">
                    <a href="">Wachtwoord vergeten?</a>
                  </div>
                </div>
                <div class="text-center mt-20">
                  <nuxt-link class="underline" to="/register">Nieuw account aanmaken</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
  </section>
</template>

<script>

import axios from "axios";
import jwtDecode from "jwt-decode";
import {useHead} from '@vueuse/head';
import {reactive} from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {isAuth} from '../middlewares/auth'

let apiUrl;
export default {
  setup() {
    const config = useRuntimeConfig();
    apiUrl = config.public.api;

    let siteData = reactive({
      title: 'Login',
      description: 'Login Form',
      keywords: ''
    });

    useHead({
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
      ],
      title: () => siteData.title,
      meta: [
        {name: 'description', content: () => siteData.description},
        {name: 'keywords', content: () => siteData.keywords},
        {
          property: "og:title",
          content: () => siteData.title,
        },
        {
          property: "og:description",
          content: () => siteData.description,
        },
        {
          property: "twitter:title",
          content: () => siteData.title,
        },
        {
          property: "twitter:description",
          content: () => siteData.description,
        },

      ]
    })
  },
  name: "login",
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      isLoading: false,

    }
  },


  created() {
    if (typeof window !== 'undefined') {
      if (isAuth()) {
        this.$router.push('/');
      }

      if (this.$route.query.token) {
        const {name, email, id} = jwtDecode(this.$route.query.token);
        localStorage.setItem('token', this.$route.query.token);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('id', id);
        const {$swal} = useNuxtApp()

        $swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          text: 'Logged In successful',
        })
        window.location.href = '/';
      }
    }

  },

  mounted() {
    AOS.init();
  },

  methods: {
    login() {
      this.isLoading = true;
      axios.post(`${apiUrl}/user/sign-in`, this.form)
          .then((response) => {
            this.isLoading = false
            const {name, id} = jwtDecode(response.data.access_token);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('name', name);
            localStorage.setItem('id', id);
            const {$swal} = useNuxtApp()
            $swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'success',
              text: 'Logged In successful',
            })
            this.$router.push('nieuws');
          })
          .catch((error) => {
            this.isLoading = false
            const {$swal} = useNuxtApp()
            $swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'error',
              text: error.response.data,
            })
          })
    }
  }
}
</script>

<style scoped>

</style>