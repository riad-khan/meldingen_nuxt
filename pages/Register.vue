<template>
  <section>
    <Header/>
    <main class="main-content bg-lightgrey">
      <div v-if="isLoading === true" :class="isLoading ? 'spin':''" style="height: 300px;"></div>
      <div v-else class="page-content my-account register sec-padding" data-aos="fade-up" data-aos-delay="10"
           data-aos-once="true">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="my-acc-sec text-center">
                <h2>Nieuw account aanmaken</h2>
                <div class="my-acc-form form-area contact-box box-shadow border-radius bg-white-gray text-left">
                  <form @submit.prevent="signUp">
                    <div class="form-group">
                      <input v-model="formData.name" class="form-control" name="name" placeholder="Voornaam" required
                             type="text">
                    </div>
                    <div class="form-group">
                      <input v-model="formData.email" class="form-control" name="email" placeholder="E-mailadres" required
                             type="email">
                    </div>
                    <div class="form-group">
                      <input v-model="formData.password" class="form-control" name="password" placeholder="Wachtwoord" required
                             type="password">
                    </div>
                    <div class="btn-group">
                      <button class="button btn-submit btn-full mt-10 mb-0" type="submit">Maak account aan</button>
                    </div>
                  </form>
                </div>
                <div class="text-center mt-20">
                  <nuxt-link class="underline" to="/login">Naar inloggen</nuxt-link>
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
import AOS from 'aos';
import 'aos/dist/aos.css';
import {isAuth} from '../middlewares/auth'

let apiUrl;

export default {
  setup() {
    const config = useRuntimeConfig();
    apiUrl = config.public.api;
  },
  name: "Register",
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
      },
      isLoading: false,
    }
  },

  mounted() {
    AOS.init();
  },

  methods: {
    signUp() {
      this.isLoading = true;
      axios.post(`${apiUrl}/user/sign-up`, this.formData)
          .then((response) => {
            this.isLoading = false;
            const {$swal} = useNuxtApp()
            $swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'success',
              text: response.data,
            })
            const router = useRouter();
            router.push({path: "/login"});
          })
          .catch((error) => {
            this.$swal({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'error',
              text: error.response.data,
            });
          })
    }
  }
}
</script>

<style scoped>

</style>