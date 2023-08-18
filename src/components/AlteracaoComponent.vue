<template>
  <div class="alteracao">
    <h1>Alteração</h1>
      <!---
    <div class="formulario">
        <div class="form-group">
          <input type="text" autocomplete="off" name="nome" id="name"  v-model="produto.name" required> 
          <span>Nome</span>
        </div>
        <div class="form-group">
          <input type="text" autocomplete="off" name="preco" id="price"  v-model="produto.price" required @keypress="verificarCampoNumero($event)">
          <span>Preço</span>
        </div>
        <div class="form-group">
          <input type="number" autocomplete="off" name="quantidade" id="amount"  v-model="produto.amount" required @keypress="verificarCampoNumero($event)">
          <span>Quantidade</span>
        </div>
        <div class="form-group">
          <button type="button" :class="btnSalvar ? 'salvar' : 'salvarInvalido'" :disabled="!btnSalvar"  @click="salvarAlteracao">Alterar</button>
         {{resposta}}
        </div>
     </div>
        -->
        <formulario-component tipo="alteracao"/>
  </div>
</template>
  
  <script>
  import ApiMixin from '@/mixins/ApiMixin'

  import { mapMutations} from 'vuex';
  import FormularioComponent from './FormularioComponent.vue'
  export default {
    name: 'AlteracaoComponent',
    mixins:[ApiMixin],
    components: { FormularioComponent },
    data:()=>({
      price:'',
      amount:'',
      name:'',
      resposta:'',
      btnSalvar:false,
      inicioPf: false
   
    }),
    methods:{
      ...mapMutations({
          setIdProduto:'setIdProduto' 
        }),

    
    },
    created(){
      this.setIdProduto(this.$route.params.id)
    },
    updated(){

       if(this.produto.price !="" && this.produto.amount !="" && this.produto.name!=""){
         this.btnSalvar = true
      }else{
        this.btnSalvar = false
      }

    },
      watch:{
      $route(to){
        if(to.params.id !=undefined){
        this.setIdProduto(to.params.id)
        }
      },
     }
      
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .formulario{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
     width: 100%;
   
  }
  .form-group{
    margin-bottom: 2rem;
    position: relative;
  }

 input{
   padding: 10px;
   font-size:larger;
   border-right:none;
   border-top: none;
   border-left: none;
   border-width: 1px;
   outline: 0;
   width: 50vh;
 
 }
 input:focus{
  border-color: #292bcf;
 }

 .cadastro{
  width: 100%;
 }
 .formulario span{
  position: absolute;
  left:5px;
  top:16px;
  pointer-events: none;
  transition: 0.5s;
  opacity: .5;
 }
 .formulario input:focus + span,
 .formulario input:valid + span
 {
 transform: translateY(-40px);
 font-size: 14px;
 opacity: 1;
 } 
 /* Chrome e outros */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.salvar{
  background-color: #42b983;
  color: aliceblue;
  width: 50vh;
  border-color: #42b983;
  border-radius: 5px;
  font-size: large;
}
.salvar:hover{
  background-color: rgb(83, 206, 150);
  cursor: pointer;
}
.salvarInvalido{
  background-color: #757776;
  color: aliceblue;
  width: 50vh;
  border-color: #949695;
  border-radius: 5px;
  font-size: large;
}
.salvarInvalido:hover{
  background-color: rgb(104, 105, 105);
  cursor: not-allowed;
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
  

  