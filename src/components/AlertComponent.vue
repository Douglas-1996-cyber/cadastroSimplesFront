<template>

   <div class="alerta" v-if="visibilidade">
       <span>Tem certeza que deseja excluir o produto {{produtoItem.name}}?</span>
        <ul type="none">
          <li @click="excluir(produtoItem.id)"> <i class="fa-solid fa-check acao" id="confirm"></i></li>
          <li @click="$store.commit('setVisibilidade',false)"><i class="fa-solid fa-xmark acao" id="cancel"></i></li>
        </ul>
  </div>

  <div class="alerta" v-if="visibilidadeExclusoes">
    <span> Tem certeza que deseja excluir os produtos selecionados?</span>
        <ul type="none">
          <li @click="excluirSelecionados()"> <i class="fa-solid fa-check acao" id="confirm"></i></li>
          <li @click="$store.commit('setVisibilidadeExclusoes',false)"><i class="fa-solid fa-xmark acao" id="cancel"></i></li>
        </ul>
   
   </div>

   
</template>
<script>
import ApiMixin from '@/mixins/ApiMixin'
import { mapState } from 'vuex';
  export default {
    name: 'AlertComponent',
    mixins:[ApiMixin],
    methods:{
    },
    computed:{
      ...mapState({
        produtoItem: state => state.produtoItem,
        visibilidade: state=>state.visibilidade,
        visibilidadeExclusoes:state => state.visibilidadeExclusoes,
      })
    }
   
  }
</script>
<style scoped>
.alerta{
  display: flex;
     position: fixed;
     flex-flow: column nowrap;
     top: 30vh;
     left: 30vw;
     z-index: 10;
     background-color:aliceblue;
     padding: 2px;
     width: 30%;
     height: 100px;
     align-items: center;
     justify-content: space-between;
     box-shadow:  0px 1px 2px 0px;
     border-radius: 5px;
     font-size: 1.2rem;
  }
  .alerta ul{
    display: flex;
    width: 30%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

  }
  .alerta button{
    width: 25%;
    margin: 5px;
    font-size: 100%;
  }
  .acao:hover{
    cursor: pointer;
  }
  #confirm:hover{
    color: green;
  }
  #cancel:hover{
    color: red;
  }
</style>