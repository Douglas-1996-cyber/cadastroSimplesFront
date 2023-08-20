<template>

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
          <button type="button" :class="btnSalvar ? 'salvar' : 'salvarInvalido'" :disabled="!btnSalvar"
           @click="tipo == 'alteracao' ? alterar() : cadastrar()">Salvar</button>
        </div>
        <div v-if="$store.state.resposta.mensagem !=undefined" 
        :class="$store.state.resposta.statusCode == 201 || $store.state.resposta.statusCode == 200 ? 'respostaValida':'respostaInvalida'">
          {{$store.state.resposta.mensagem}}
        </div>
        
     </div>

 </template>
 <script>
   import ApiMixin from '@/mixins/ApiMixin';
   import { mapMutations,mapState } from 'vuex';
  import axios from "axios";
   export default {
     name: 'FormularioComponent',
     props:['tipo'],
     mixins:[ApiMixin],
     data:()=>({
      produtoCadastro:{},
      name:'',
      price:'',
      amount:'',
       erro:'',
      btnSalvar:false,
      resposta:'',
      inicioPf: false,
      }),
    
     methods:{
        ...mapMutations({
           setProduto:'setProduto',
           setResposta:'setResposta',
           setIdProduto:'setIdProduto' 
           
        }),
        
        alterar(){
        this.produtoCadastro.name = this.name
        this.produtoCadastro.price = this.price
        this.produtoCadastro.amount = this.amount
        this.setProduto(this.produtoCadastro)
        this.salvarAlteracao()  
        },
        
        cadastrar(){
        this.produtoCadastro.name = this.name
        this.produtoCadastro.price = this.price
        this.produtoCadastro.amount = this.amount
        this.setProduto(this.produtoCadastro)
        this.salvar()  
        },

      consultarID(){
        
      axios.get(this.urlBase+'/'+this.idProduto)
        .then(response=>{
           let prod = response.data 
           this.name = prod.name
           this.price = String(prod.price)
           this.amount = prod.amount
        }) 
       .catch( erros=>{
        console.log(erros)
        if(erros){
          location.replace('/')
        }
      })
       },


        verificarCampoNumero(e){
        if(!this.inicioPf){
         if(e.keyCode > 47 && e.keyCode < 58 || e.keyCode == 46){
           this.erro = 'Letra não é permitida'
         }else{
           e.preventDefault()
         } 
       }else{
         if(e.keyCode > 47 && e.keyCode < 58){
           this.erro = 'Letra não é permitida'
         }else{
           e.preventDefault()
         } 
       }
      }
     },
   watch:{
    price(){
        if(this.price.indexOf('.') != -1){
          this.inicioPf = true
        }
         if(this.price == ""){
          this.inicioPf = false
        }
      },
      idProduto(){
        if(this.idProduto != 0)  this.consultarID()
     
      }
   },
   computed:{
        ...mapState({
          urlBase:state =>state.urlBase,
          idProduto:state => state.idProduto
        }),

    

      },
   updated(){
       if(this.price !="" && this.amount !="" && this.name!=""){
         this.btnSalvar = true
      }else{
        this.btnSalvar = false
      }
      if(this.$store.state.resposta.mensagem !=undefined)
      setTimeout(() => {
        this.setResposta({})
        location.replace('/')
         }, "2500")
     
    },
    created(){
      if(this.idProduto != 0) this.consultarID()     
    }


   
    
   }
 </script>
 <style scoped>
 .respostaValida{
  background-color: #42b983;
  width: 50%;
  padding: 5px;
}
.respostaInvalida{
  background-color: #b94242;
  width: 50%;
  padding: 5px;
}
.formulario{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;  
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
   width: 30vw;
 
 }
 input:focus{
  border-color: #292bcf;
 }

 .cadastro{
  width: 100%;
  position: absolute;
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
  width: 30vw;
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
  width: 30vw;
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
  