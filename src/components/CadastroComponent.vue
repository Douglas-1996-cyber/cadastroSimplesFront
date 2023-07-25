<template>
    <div class="cadastro">
      <h1>Cadastro</h1>
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
            {{ resposta }}
          </div>
       </div>
    </div>
  </template>
  
  <script>
   import axios from "axios";
   import ApiMixin from '@/mixins/ApiMixin'
  export default {
    name: 'CadastroComponent',
    mixins:[ApiMixin],
    data:()=>({
    price:'',
    amount:'',
    name:'',
    erro:'',
    btnSalvar:false,
    resposta:'',
    inicioPf: false
    }),
    methods:{
      salvar(){
        if(this.name == "" || this.price == "" || this.amount ==""){
          this.resposta = "Todos os campos devem ser preenchidos"
        }
       let data = {
        name :this.name,
        price :this.price,
        amount :this.amount,
       }
        let config = {
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Accept':'application/json'
          }
        }
       
        axios.post(this.urlBase,data,config)
             .then(response=>{
              console.log(response.status)
              this.resposta = "Produto cadastro com sucesso"
            })
             .catch( erros=>{
              console.log(erros)
              
                this.resposta = "Produto não cadastrado! "+erros.message
            })
          
         this.name=""
         this.price=""
         this.amount=""
      }, 
    },
    updated(){
       if(this.price !="" && this.amount !="" && this.name!=""){
         this.btnSalvar = true
      }else{
        this.btnSalvar = false
      }

      if(this.resposta !=''){
        setTimeout(() => {
        location.reload()
         }, "200")
      }
    },
    watch:{
      price(){
        console.log(this.price.indexOf('.'))
        if(this.price.indexOf('.') != -1){
          this.inicioPf = true
          console.log('valor encontrado')
        }
         if(this.price == ""){
          this.inicioPf = false
        }
      },
      $route(to,from){
        console.log(from+"sadasdasd"+to)
    }
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
  