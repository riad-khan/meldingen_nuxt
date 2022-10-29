<template>
 <section>
   <Header />
   <div class="container">
     <div class="row">
       <div class="col-md-12">

         <h1>Statistieken
           <select @change="(e)=>RegioChange(e)" name="datatablesSimple_length" placeholder="Nederland" id="regio"
                   class="sources">
             <option value="all" selected>Nederland</option>
             <option v-for="(item, i) in regios" v-bind:value="item.regio">{{item.regio}}</option>

           </select>
         </h1>
         <!-- Chart 1 -->
         <div class="col-lg-4">
           <div class="card other-news box-shadow border-radius-8">
             <div class="card-content">
               <strong>
                 <h4>Meldingen</h4>
               </strong>
               <p>Total of meldingen
                 <select name="datatablesSimple_length" ref="meldingen" @change="(e)=>changeMeldingenTime(e)">
                   <option v-for="i in 24" selected :key="i" v-bind:value="i">{{i}} uur</option>
                 </select>
               </p>
               <span id="mel_count">0</span> <span id="meldingen_parcentage">0%</span>

               <div ref="all_meldingen" class="">
                 <canvas id="myChart1" width="400" height="400"></canvas>
               </div>

             </div>

           </div>
         </div>
         <!--  Chart 2-->
         <div class="col-lg-4">
           <div class="card other-news box-shadow border-radius-8">
             <div class="card-content">
               <strong>
                 <h4>Ambulance Meldingen</h4>
               </strong>
               <p>Total of meldingen
                 <select name="datatablesSimple_length" ref="select_ambulance" @change="(e)=>selectTime(e)">
                   <option v-for="i in 24" selected :key="i" v-bind:value="i">{{i}} uur</option>
                 </select>
               </p>
               <span id="ambulance_count">2689</span> <span id="ambulance_parcentage">-2%</span>

               <div ref="ambulance_meldingen" class="">
                 <canvas id="myChart2" width="400" height="400"></canvas>
               </div>

             </div>

           </div>
         </div>

         <!--  Chart 3-->
         <div class="col-lg-4">
           <div class="card other-news box-shadow border-radius-8">
             <div class="card-content">
               <strong>
                 <h4>Brandweer Meldingen</h4>
               </strong>
               <p>Total of meldingen
                 <select name="datatablesSimple_length" ref="select_brandweer" @change="(e)=>selectBrandweerTime(e)">
                   <option v-for="i in 24" selected :key="i" v-bind:value="i">{{i}} uur</option>
                 </select>
               </p>
               <span id="brandweer_count">2689</span> <span id="brandweer_parcentage">-2%</span>

               <div ref="brandweer_meldingen" class="">
                 <canvas id="myChart3" width="400" height="400"></canvas>
               </div>

             </div>

           </div>
         </div>

         <!--  Chart 4-->

         <div class="col-md-12">

           <div class="col-md-4">
             <div class="card other-news box-shadow border-radius-8">
               <div class="card-content">
                 <strong>
                   <h4>Politie Meldingen</h4>
                 </strong>
                 <p>Total of meldingen
                   <select name="datatablesSimple_length" ref="select_politie" @change="(e)=>selectPolitieTime(e)">
                     <option v-for="i in 24" selected :key="i" v-bind:value="i">{{i}} uur</option>
                   </select>
                 </p>
                 <span id="politie_count">2689</span> <span id="politie_parcentage">-2%</span>

                 <div ref="politie_meldingen" class="">
                   <canvas id="myChart4" width="400" height="400"></canvas>
                 </div>

               </div>

             </div>
           </div>

           <div class="col-lg-8">
             <div class="card other-news box-shadow border-radius-8">
               <div class="card-content">
                 <strong>
                   <h4>
                    <span style="vertical-align: inherit;">
                      <span style="vertical-align: inherit;">Totaal aantal meldingen per provincie</span>
                    </span>
                   </h4>
                 </strong>
                 <p>
                  <span style="vertical-align: inherit;">
                    <span style="vertical-align: inherit;">Total of the message
                    </span>
                  </span>

                   <select name="datatablesSimple_length" ref="select_provincie" @change="(e)=>selectProvincieTime(e)">
                     <option v-for="i in 24" selected :key="i" v-bind:value="i">{{i}} uur</option>
                   </select>
                 </p>

                 <div style=" margin-bottom: 2px;" id="slider" class="loaded">
                   <div class="wrapper">
                     <div id="provincie_buttons_area" class="slides chart-btn" style="left: -660px;">


                       <button v-for="(item, i) in provincieCount" :key="i" :id="item.provincie"
                               @click="provincieSelect(item.provincie,i)"
                               :class="index === i ?'provienci button active':'provienci button'" :value="item.provincie"
                               style="margin-left: 2px;margin-top: 3px;">

                        <span style="vertical-align: inherit;" class="provincie_name"  >{{item.provincie}}
                          <span style="margin-left: 2px;display:block;span-size: 18px;" :id="'provincie'+i">{{item.total}}</span>
                        </span>



                       </button>


                     </div>
                   </div>
                   <a id="prev" class="control prev"></a>
                   <a id="next" class="control next"></a>
                   <div class="dots"><i data-id="0" class=""></i><i data-id="1" class=""></i><i data-id="2"
                                                                                                class=""></i><i data-id="3" class=""></i><i data-id="4" class="active"></i><i data-id="5"
                                                                                                                                                                              class=""></i><i data-id="6" class=""></i><i data-id="7" class=""></i><i data-id="8"
                                                                                                                                                                                                                                                      class=""></i><i data-id="9" class=""></i><i data-id="10" class=""></i><i data-id="11"
                                                                                                                                                                                                                                                                                                                               class=""></i></div>
                 </div><br>

                 <div style="height: 300px" ref="provincie_canvas" class="">
                   <canvas id="myChart5" style="display: block; box-sizing: border-box; height: 300px; width: 683px;"
                           width="683" height="300"></canvas>
                 </div>
               </div>

             </div>
           </div>

         </div>

       </div>
     </div>
   </div>
   <Footer />
 </section>
</template>

<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
const {data: regios, pending} = await useAsyncData('fetch_Regios', () => $fetch(`${apiUrl}/news/fetch/regios`));
onMounted(() => {
  refreshNuxtData('fetch_Regios');
})

</script>

<script>
let apiUrl;
let backend;
import Chart from 'chart.js/auto/auto.mjs';
import axios from 'axios';




export default {
  name: "Statistics.vue",
  components: {},
  data() {
    return {
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      provincie: [],
      provincieCount: [],
      isLoading: false,
      defaultProvincie: 'Drenthe',
      index: 0,
      config1: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            }
          }
        }
      },
      config2: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            }
          }
        }
      },
      config3: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            }
          }
        }
      },
      config4: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            }
          }
        }
      },
      config5: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          animation: {
            duration: 1,

          },
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            },

          }
        }
      },

    }
  },



  computed: {
    provinCount() {
      return this.provincieCount;
    }
  },
  mounted() {


     this.RegioChange('all');

  },
  methods: {
    RegioChange(e) {
      let regio;
      if (e === 'all') {
        regio = 'all'
      } else {
        regio = e.target.value;
      }
      const defaultMeldingenTime = this.$refs.meldingen.value;
      const defaultAmbulanceTime = this.$refs.select_ambulance.value;
      const defaultBrandweer = this.$refs.select_brandweer.value;
      const defaultPolitie = this.$refs.select_politie.value;
      const provincieValue = this.$refs.select_provincie.value;

      const btn = document.getElementsByClassName('provienci button active');
      console.log(btn)
      this.fetchMeldingenChartData(defaultMeldingenTime, regio);
      this.fetchAmbulanceMeldingen(defaultAmbulanceTime, regio);
      this.fetchBrandweerMeldingen(defaultBrandweer, regio);
      this.fetchPolitieMeldingen(defaultPolitie, regio);
      this.fetchProvincie();
      this.fetchProvincieMeldingen(provincieValue, this.defaultProvincie)
    },

    fetchProvincie() {
      axios.get(`${apiUrl}/charts/provincie`)
          .then((response) => {
            this.provincie = response.data
          })
          .catch(error => {
            console.log(error.response.data);
          })
    },
    //meldingen Chart

    meldingenChartRender() {
      if (this.myChart1 != null) {
        this.myChart1.destroy();
      }
      this.myChart1 = new Chart(
          document.getElementById('myChart1'),
          this.config1
      );

    },
    changeMeldingenTime(e) {
      const regio = document.getElementById('regio').value;
      const hour = e.target.value;
      this.fetchMeldingenChartData(hour, regio);
    },
    fetchMeldingenChartData(hour, regio) {
     this.$refs.all_meldingen.classList.value = "spin";
      axios.get(`${apiUrl}/charts/meldingen/${hour}/${regio}`)
          .then((response) => {
            this.config1.data.labels = [];
            this.config1.data.datasets[0].data = [];
            for (let i = 0; i < response.data.charts.length; i++) {
              this.config1.data.labels.push((response.data.charts[i].time.length == 1 ? '0' : '') + response.data.charts[i].time);
              this.config1.data.datasets[0].data.push(response.data.charts[i].calculated);
            }

            this.meldingenChartRender();

            this.$refs.all_meldingen.classList.value = "";;
            document.getElementById('mel_count').innerText = response.data.count;
            document.getElementById('meldingen_parcentage').innerHTML = response.data.parcent + '%';
          })
          .catch(error => {
            console.log(error.response);
          })
    },

    //Ambulance Charts

    AmbulanceChartRender() {
      if (this.myChart2 != null) {
        this.myChart2.destroy();
      }
      this.myChart2 = new Chart(
          document.getElementById('myChart2'),
          this.config2
      );

    },

    selectTime(e) {
      const regio = document.getElementById('regio').value;
      const hour = e.target.value;
      this.fetchAmbulanceMeldingen(hour, regio);
    },
    fetchAmbulanceMeldingen(hour, regio) {


      this.$refs.ambulance_meldingen.classList.value = "spin";
      axios.get(`${apiUrl}/charts/ambulance/${hour}/${regio}`)
          .then((response) => {
            this.config2.data.labels = [];
            this.config2.data.datasets[0].data = [];
            for (let i = 0; i < response.data.charts.length; i++) {
              this.config2.data.labels.push((response.data.charts[i].time.length == 1 ? '0' : '') + response.data.charts[i].time);
              this.config2.data.datasets[0].data.push(response.data.charts[i].calculated);
            }
            this.AmbulanceChartRender();
            this.$refs.ambulance_meldingen.classList.value = "";
            document.getElementById('ambulance_count').innerText = response.data.count;
            document.getElementById('ambulance_parcentage').innerHTML = response.data.parcent + '%';
          })
    },

    //Brandweer Charts

    BrandweerChartRender() {
      if (this.myChart3 != null) {
        this.myChart3.destroy();
      }
      this.myChart3 = new Chart(
          document.getElementById('myChart3'),
          this.config3
      );
    },

    selectBrandweerTime(e) {
      const regio = document.getElementById('regio').value;
      const hour = e.target.value;
      this.fetchBrandweerMeldingen(hour, regio);
    },
    fetchBrandweerMeldingen(hour, regio) {
      this.$refs.brandweer_meldingen.classList.value = "spin"
      axios.get(`${apiUrl}/charts/brandweer/${hour}/${regio}`)
          .then((response) => {
            this.config3.data.labels = [];
            this.config3.data.datasets[0].data = [];
            for (let i = 0; i < response.data.charts.length; i++) {
              this.config3.data.labels.push((response.data.charts[i].time.length == 1 ? '0' : '') + response.data.charts[i].time);
              this.config3.data.datasets[0].data.push(response.data.charts[i].calculated);
            }
            this.BrandweerChartRender();
            this.$refs.brandweer_meldingen.classList.value = ""
            document.getElementById('brandweer_count').innerText = response.data.count;
            document.getElementById('brandweer_parcentage').innerHTML = response.data.parcent + '%';
          })
    },

    //politie charts

    PolitieChartRender() {
      if (this.myChart4 != null) {
        this.myChart4.destroy();
      }
      this.myChart4 = new Chart(
          document.getElementById('myChart4'),
          this.config4
      );
    },

    selectPolitieTime(e) {
      const regio = document.getElementById('regio').value;
      const hour = e.target.value;
      this.fetchPolitieMeldingen(hour, regio);
    },
    fetchPolitieMeldingen(hour, regio) {
      this.$refs.politie_meldingen.classList.value = "spin";
      axios.get(`${apiUrl}/charts/politie/${hour}/${regio}`)
          .then((response) => {
            this.config4.data.labels = [];
            this.config4.data.datasets[0].data = [];
            for (let i = 0; i < response.data.charts.length; i++) {
              this.config4.data.labels.push((response.data.charts[i].time.length == 1 ? '0' : '') + response.data.charts[i].time);
              this.config4.data.datasets[0].data.push(response.data.charts[i].calculated);
            }
            this.PolitieChartRender();
            this.$refs.politie_meldingen.classList.value = "";
            document.getElementById('politie_count').innerText = response.data.count;
            document.getElementById('politie_parcentage').innerHTML = response.data.parcent + '%';
          })
    },
    //provincie charts

    provincieSelect(provincie, i) {
      this.index = i;
      const selectedValue = this.$refs.select_provincie.value;


    this.fetchProvincieMeldingen(selectedValue, provincie);


    },

    selectProvincieTime(e) {
      const hour = e.target.value;
      const btn = document.getElementsByClassName('provienci button active');
     this.fetchProvincieMeldingen(hour, btn[0].value)


    },
    provincieChartRender() {
      if (this.myChart5 != null) {
        this.myChart5.destroy();
      }
      this.myChart5 = new Chart(
          document.getElementById('myChart5'),
          this.config5
      );
    },



    fetchProvincieMeldingen(hour, provincie) {
      this.$refs.provincie_canvas.classList.value = "spin";
      axios.get(`${apiUrl}/charts/prov/${hour}/${provincie}`)
          .then((response) => {

            this.config5.data.labels = [];
            this.config5.data.datasets[0].data = [];
            for (let i = 0; i < response.data.chart.length; i++) {
              this.config5.data.labels.push((response.data.chart[i].time.length == 1 ? '0' : '') + response.data.chart[i].time);
              this.config5.data.datasets[0].data.push(response.data.chart[i].calculated);
            }


            this.provincieChartRender();
            this.$refs.provincie_canvas.classList.value = "";

            this.provincieCount = response.data.hoursData;

          })

    }




  }
}
</script>

<style scoped>

</style>