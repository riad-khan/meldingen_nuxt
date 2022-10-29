<template>
  <div>
    <Header />
    <main class="main-content bg-white">
      <section class="page-content contact-page my-account-page sec-padding ">

        <div class="container">
          <div class="content-box contact-form box-shadow border-radius-8">
            <div class="row">

            <DashboardLinks />

              <div class="col-lg-8 col-md-8 col-sm-8 sidebar-border">
                <div class="mac-content">


                  <div class="row">
                    <div class="col-md-6">
                      <div class="post-meta news">
                        <h3>
                          1                                        </h3>
                        <strong>Favorite nieuws</strong>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="post-meta comments">
                        <h3>
                          2                                        </h3>
                        <strong>Comments</strong>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>    <!-- / Step Section-->
    </main>
    <Footer />
  </div>
</template>

<script>

import {isAuth} from '../../middlewares/auth'
export default {
  name: "Dashboard.vue",

  created() {
    if(typeof window !== "undefined"){
      if(!isAuth()){
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>

</style>