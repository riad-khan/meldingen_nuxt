<template>
  <div class="col-lg-4 col-md-4 col-sm-4">
    <div class="my-account">
      <div class="user-avatar bg-lightgrey-black">
        <div class="profile-pic-text-area">
          <img style="border-radius: 50%;" :src="userinfo.profile_pic">
        </div>                        <p>{{userinfo.name}}</p>
      </div>
      <div class="dashboard-menu">
        <ul>
          <li class=""><router-link to="/edit-profile">Edit profile</router-link></li>
          <li class=""><a >My favorite nieuws</a></li>
          <li class=""><router-link to="/my-reacties">My reacties</router-link></li>
          <li><a @click.prevent="logout" href="/user/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
</script>

<script>
let apiUrl;
let backend;
import axios from "axios";
import {isAuth} from '../middlewares/auth'

export default {
  name: "Dashboard-links",
  data(){
    return{
      userinfo:{}
    }
  },

  created() {
   if(typeof window !== "undefined"){
     const id = localStorage.getItem('id')
     axios.get(`${apiUrl}/user/user-info/${id}`,{
       headers: {
         "Content-type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem('token')}`
       }
     })
         .then((response)=>{
           this.userinfo = response.data[0];
         })
         .catch((error)=>{
           console.log(error)
         })
   }

  },
  methods:{
    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>