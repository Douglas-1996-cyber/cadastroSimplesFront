<template>
  <div>
    <div class="listar">
        <form id="buscar">
            <input type="text" autocomplete="off" name="buscar" placeholder="Buscar" v-model="buscar"/>
            <span v-if="habilitarLixo"  id='excluirButton' 
            :disabled="!selecionados.length > 0" @click="verificarExcluirSelecionados">
            <i class="fa-solid fa-trash-can"></i></span> 
        </form> 
    

    
     <div class="listaProdutos" >
   
      <table class="tabelaProduto" cellpadding="2" width="100%">
        
      <thead>
        <tr>
          <th class="ordenar" @click="ordenar('nome')">
            Nome
            <span v-if="classeNome"
              ><i class="fa-solid fa-caret-down"></i
            ></span>
            <span v-else-if="!classeNome"
              ><i class="fa-solid fa-caret-up"></i
            ></span>
          </th>
          <th class="ordenar" @click="ordenar('preco')">
            Preço
            <span v-if="classePreco"
              ><i class="fa-solid fa-caret-down"></i
            ></span>
            <span v-else-if="!classePreco"
              ><i class="fa-solid fa-caret-up"></i
            ></span>
          </th>
          <th class="ordenar"  @click="ordenar('quantidade')">
            Quantidade
            <span v-if="classeQuantidade"
              ><i class="fa-solid fa-caret-down"></i
            ></span>
            <span v-else-if="!classeQuantidade"
              ><i class="fa-solid fa-caret-up"></i
            ></span>
          </th>
          <th>Ação</th>
          <th>Selecionar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos.data" v-bind:key="produto.id">
          <td>{{ produto.name }}</td>
          <td>R$ {{ produto.price }}</td>
          <td>{{ produto.amount }}</td>
          <td >
            <span v-if="!desativar" id="excluirButton" @click="verificarExclusao(produto)" style="margin-right:2px;" 
            :class="!desativar ? 'excluirIcone' : 'excluirIconeInvalido'"
            ><i class="fa-solid fa-trash-can"></i></span>
              <router-link v-if="!desativar" :to="`/alteracao/${produto.id}`"><i class="fa-solid fa-pencil"></i></router-link>
              
          </td>
          <td><input type="checkbox" :value="produto.id" v-model="selecionados" /></td>
        </tr>
      </tbody>
    </table>

    <div  class="lds-ring" v-if="this.loading"><div></div><div></div><div></div><div></div></div>  
     
    <div class="paginacao" v-if="produtos.last_page > 1">
         <span  v-for="l, key in produtos.links" :key="key"  @click="paginar(l)" >{{ l.label }}</span>
      </div>
  </div>
  
  </div>

  <AlertComponent ></AlertComponent>   
   

</div>
  </template>
  
  <script>
import ApiMixin from '@/mixins/ApiMixin'
import AlertComponent from './AlertComponent.vue';

  export default {
    name: 'ListaComponent',
   mixins:[ApiMixin],
   components:{
    AlertComponent
   },
   data:()=>({
    
    resposta:false,
    ordemNome: "crescente",
    ordemPreco: "crescente",
    ordemQuantidade: "crescente",
    classeNome: true,
    classePreco: true,
    classeQuantidade: true,
    habilitarLixo: false
   
   }),
   methods:{

    ordenar(tipo) {
      if (tipo == "nome") {
        if (this.ordemNome == "crescente") {
          this.produtos.data.sort((proximo, atual) => {
            let resultado = atual.name.localeCompare(proximo.name); //-1 indica que a string de referencia vem antes  da string do parametro
            //1 indica que a string de referencia vem depois  da string do parametro
            //0 se os valores forem iguais
            return resultado;
          });
          this.ordemNome = "decrescente";
          this.classeNome = false;

        
        } else if (this.ordemNome == "decrescente") {
          this.produtos.data.sort((proximo, atual) => {
            let resultado = proximo.name.localeCompare(atual.name); //-1 indica que a string de referencia vem antes  da string do parametro
            //1 indica que a string de referencia vem depois  da string do parametro
            //0 se os valores forem iguais
            return resultado;
          });
          this.ordemNome = "crescente";
          this.classeNome = true;
          
        }
      } 
      
      else if (tipo == "preco") {
        if (this.ordemPreco == "crescente") {
          this.produtos.data.sort((proximo, atual) => {
            if (atual.price < proximo.price) {
              return 1;
            } else if (atual.price > proximo.price) {
              return -1;
            } else {
              return 0;
            }
          });
          this.ordemPreco = "decrescente";
          this.classePreco = false;
        } else if (this.ordemPreco == "decrescente") {
          this.produtos.data.sort((proximo, atual) => {
            if (proximo.price < atual.price) {
              return 1;
            } else if (proximo.price > atual.price) {
              return -1;
            } else {
              return 0;
            }
          });
          this.ordemPreco = "crescente";
          this.classePreco = true;
        }
      } else {
        if (this.ordemQuantidade == "crescente") {
          this.produtos.data.sort((proximo, atual) => {
            if (atual.amount < proximo.amount) {
              return 1;
            } else if (atual.amount > proximo.amount) {
              return -1;
            } else {
              return 0;
            }
          });
          this.ordemQuantidade = "decrescente";
          this.classeQuantidade = false;
        } else if (this.ordemQuantidade == "decrescente") {
          this.produtos.data.sort((proximo, atual) => {
            if (proximo.amount < atual.amount) {
              return 1;
            } else if (proximo.amount > atual.amount) {
              return -1;
            } else {
              return 0;
            }
          });
          this.ordemQuantidade = "crescente";
          this.classeQuantidade = true;
        }
      }
    },
  

   },
    created(){
      this.montarProdutos()
     
    },

    watch:{
     
      buscar(){
        this.montarProdutos(this.buscar)
      },
      selecionados(){
      
        if(this.selecionados.length >= 1){
          this.desativar = true
          this.habilitarLixo = true
        }else{
          this.desativar = false
          this.habilitarLixo = false
        }
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
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
     height: 8%;
     align-items: center;
     justify-content: center;
     box-shadow:  0px 1px 2px 0px;
     border-radius: 5px;
     margin: 5px;
  }
  .alerta button{
    width: 100px;
    margin: 5px;
  }
  .alerta button:hover{
    cursor: pointer;
  }
  .listar {
  margin-top: 50px;
  position: absolute;
  left: 20%;
  width: 70%;
  top:10%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}
.listaProdutos{
  position: absolute;
  left: 0%;
  top: 10%;
  width: 100%;
}
.tabelaProduto {
  position: relative;
  font-size: 20px;
}
.paginacao{
  position: relative;
  margin-top: 10px;
  left: 50%;
  width: 10%;
}
.paginacao span{
  margin: 5px;
}
.paginacao span:hover{
  cursor: pointer;
  color: blue;
}
#buscar{
  position: absolute;
  left: 20%;
  bottom:100%;
  width: 50%;
  margin-bottom:20px ;
 }
#buscar input{
   padding: 10px;
   font-size:larger;
   border-right:none;
   border-top: none;
   border-left: none;
   border-width: 1px;
   outline: 0;
   width: 50vh;
 }
 #buscar input:focus{
  border-color: #292bcf;
 }
  
.ativado {
  color: blue;
}
 .ordenar {
  cursor: pointer;
}
.fechar {
  position: absolute;
  left: 95%;
  background-color: rgb(40, 133, 240);
  padding: 2px 10px 5px 10px;
  border-radius: 50px;
  font-size: 20px;
}
.fechar:hover {
  cursor: pointer;
}


tr {
  text-align: left;
}

tr:nth-child(even) {
  background-color: rgb(214, 214, 214);
}

.fa-pencil:hover {
  cursor: pointer;
  color: blue;
}
.acao {
  width: 10%;
}
a {
  color: black;
}
.excluir {
  position: absolute;
  top: 30%;
  left: 30%;
  background-color: rgb(174, 187, 199);
  z-index: 10;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 15px 0px rgb(174, 187, 199);
}

.alterar {
  position: absolute;
  top: 30%;
  left: 30%;
  background-color: rgb(174, 187, 199);
  z-index: 10;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 15px 0px rgb(174, 187, 199);
}
.opcoes a {
  margin: 10px;
}





 #buscar #buscarButton {
   font-size: larger;
   background-color: #34d4ca;
   border-color: #34d4ca;
   color: aliceblue;
   border-radius:0 10px 10px 0px ;
   padding: 0px 10px 0px 10px;
   border:none;
   height: 26px;
   box-shadow: 2px 1px 2px 0px rgb(174, 187, 199);
 }
 #buscar #excluirButton {
   font-size: 25px;
   color:  #000000;
   margin-left: 10px;
   position: relative;
   left: 10%;
 }


 #buscar input{
   font-size:larger;
   border-right:none;
   border-top: none;
   border-left: none;
   border-width: 1px;
   width: 50%;
 }
 #buscar #excluirButton:hover{
    cursor: pointer;
    color:  #d4343e;
 }


 #buscar #buscarButton:hover{
    cursor: pointer;
 }
 #buscar #buscarButton:active{
  box-shadow: 2px 1px 0px 0px rgb(174, 187, 199);
 }
 #buscar input:focus{
  box-shadow: 0 0 0 0;
    outline: 0;
 }
 .excluirIcone:hover{
  cursor: pointer;
   color:  #d4343e;
}


.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #8d8c8c;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #9b9b9b transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}



  </style>
  