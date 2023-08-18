<template>
    <div class="cadastro">
      <h1>Cadastro</h1>
      <!---
      <div class="formulario">
          <div class="form-group">
            <input type="text" autocomplete="off" name="nome" id="name"  v-model="name" required> 
            <span>Nome</span>
          </div>
          <div class="form-group">
            <input type="text" autocomplete="off" name="preco" id="price"  v-model="price" required @keypress="verificarCampoNumero($event)">
            <span>Preço</span>
          </div>
          <div class="form-group">
            <input type="number" autocomplete="off" name="quantidade" id="amount"  v-model="amount" required @keypress="verificarCampoNumero($event)">
            <span>Quantidade</span>
          </div>
          <div class="form-group">
            <button type="button" :class="btnSalvar ? 'salvar' : 'salvarInvalido'" :disabled="!btnSalvar" @click="salvar()">Salvar</button>
          </div>
          <div :class="!axiosErro ? 'respostaValida':'respostaInvalida'" v-if="resposta">{{resposta}}</div>
       </div>
       -->
       <formulario-component tipo="cadastro"/>
    </div>
    
  </template>
  
  <script>
   import ApiMixin from '@/mixins/ApiMixin'
   import FormularioComponent from "./FormularioComponent.vue";
   import { mapState,mapMutations } from 'vuex';

  export default {
  components: { FormularioComponent },
    name: 'CadastroComponent',
    mixins:[ApiMixin],
    methods:{
      ...mapMutations({
        setIdProduto:'setIdProduto',     
        }),
    },
    computed:{
        ...mapState({
          idProduto:state => state.idProduto
        })

      },
     
   
   }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

 .cadastro{
  width: 100%;
  position: absolute;
 }

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  