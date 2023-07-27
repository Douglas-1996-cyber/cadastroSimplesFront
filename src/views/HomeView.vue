<template>
  <div class="home">
    <ListaComponent/>
    <div class="acoes">
      <router-view/>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src

import ListaComponent from '@/components/ListaComponent.vue';
export default {
  name: 'HomeView',
  components:{
    ListaComponent
  }

}
</script>
<style scoped>
.acoes{
  position: absolute;
  margin-top: 50px;
  top:500px;
  left: 30%;
  width: 50%;

}
</style>
