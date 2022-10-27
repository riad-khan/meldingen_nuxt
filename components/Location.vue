<template>
  <!--Location call to action section-->
  <section class="call-to-action">
    <div class="container">
      <div class="row d-flex align-items-center call-to-row box-shadow bg-white-gray">
        <div class="col-md-8 col-xs-7">
          <div class="location-search-form">
            <input v-model="search" name="placename" placeholder="Zoek op plaatsnaam" type="text"
                   @input="(e)=>searchRegion(e)"/>
          </div>
        </div>
        <div class="col-md-4 col-xs-5">

          <div class="call-to-link textright">
            <button class="button text-locator" @click.prevent="findMyLocation">

              <span :class="isLoading ? 'rolling-spin':'icon-search'"></span>
            </button>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-md-12">
          <div v-for="(item, i) in locations" v-show="isOpen" id="search_by_place_result"
               class="searchbar-area box-shadow">
            <router-link :to="urlPath == 'meldingen' ? `/${item.regio_url}`:`/${urlPath}/${item.provincie_url}`" class="d-block">{{ item.stad }}
              <span>{{ item.provincie }}
              </span></router-link>
          </div>
        </div>
      </div>

    </div>
  </section>
  <!--/ Location call to action section-->
</template>


<script>
import axios from "axios";

let apiUrl
export default {
  setup() {
    const config = useRuntimeConfig();
    apiUrl = config.public.api;
  },
  name: "Location",
  props: ['urlPath'],
  data() {
    return {
      isOpen: false,
      meldinges: [],
      search: '',
      isLoading: false,
    }
  },

  methods: {
    findMyLocation() {
      const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        axios.get(geoApi)
            .then((response) => {
              this.$router.push(`/${this.urlPath}/${response.data.city}`)
            })
            .catch((error) => {
              console.log(error.response.data)
            })
      };
      const error = () => {
        console.log('unable to find')
      };
      navigator.geolocation.getCurrentPosition(success, error)

    },
    searchRegion(e) {
      this.isLoading = true;

      axios.get(`${apiUrl}/meldingen/auto/search?search=${e.target.value}`)
          .then((res) => {
            this.meldinges = [];
            this.meldinges.push(res.data)
            this.isLoading = false;
          })
          .catch((error) => {
            console.log(error)
          })

      this.isOpen = true

      if (this.search === '') {
        this.meldinges = []
        this.isOpen = false
      }


    }
  },
  computed: {
    locations() {
      return this.meldinges[0]
    }
  }
}
</script>

<style scoped>

</style>