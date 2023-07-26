<template>
  <div>
    <div class="listar">
      <form id="buscar">
          <input type="text" autocomplete="off" name="buscar" placeholder="Buscar" v-model="buscar"/>
          <span v-if="habilitarLixo"  id='excluirButton' 
          :disabled="!produtosSelecionados.length > 0" @click="verificarExcluirSelecionados">
     <i class="fa-solid fa-trash-can"></i></span> 
      </form>
     
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
            <span v-if="!desativar" id="excluirButton" @click="VerificarExclusao(produto)" style="margin-right:2px;" 
            :class="!desativar ? 'excluirIcone' : 'excluirIconeInvalido'"
            ><i class="fa-solid fa-trash-can"></i></span>
              <router-link v-if="!desativar" :to="`/alteracao/${produto.id}`"><i class="fa-solid fa-pencil"></i></router-link>
              
          </td>
          <td><input type="checkbox" :value="produto.id" v-model="produtosSelecionados" /></td>
        </tr>
      </tbody>
    </table>
   <div class="alerta" :style="visibilidade">
    Tem certeza que deseja excluir o produto {{ nomeProduto }}?
    <span>
    <button type="button" @click="excluir(idProduto)">Sim</button>
    <button type="button" @click="visibilidade ='display:none'">Não</button>
    </span>
   </div>     
   <div class="alerta" :style="visibilidadeExclusao">
    Tem certeza que deseja excluir os produtos selecionado?
    <span>
    <button type="button" @click="excluirSelecionados">Sim</button>
    <button type="button" @click="visibilidadeExclusao ='display:none', desativar=false, produtosSelecionados=[]">Não</button>
    </span>
   </div>     
  </div>
  <div class="paginacao">
           <span v-for="l, key in produtos.links" :key="key"  @click="paginar(l)" >{{ l.label }}</span>
      </div>
</div>
  </template>
  
  <script>
import ApiMixin from '@/mixins/ApiMixin'
import axios from 'axios'
  export default {
    name: 'ListaComponent',
   mixins:[ApiMixin],
   data:()=>({
    nomeProduto:'',
    idProduto:'',
    visibilidade:'display:none',
    resposta:false,
    produtosSelecionados:[],
    visibilidadeExclusao:"display:none",
    desativar:false,
    ordemNome: "crescente",
    ordemPreco: "crescente",
    ordemQuantidade: "crescente",
    classeNome: true,
    classePreco: true,
    classeQuantidade: true,
    buscar:'', 
    habilitarLixo: false
   
   }),
   methods:{
    teste(l){
   console.log(l)
    },
    verificarExcluirSelecionados(){
      this.visibilidadeExclusao = 'display:flex'
      this.desativar=true
    },
    VerificarExclusao(produto){
      this.visibilidade = 'display:flex'
      this.nomeProduto = produto.name
      this.idProduto = produto.id  
    },
    excluir(id){
      this.visibilidade='display:none',
     axios
        .delete(this.urlBase + "/" + id)
        .then((response) => {
          this.montarProdutos();
          console.log(response);
        })
        .catch((erros) => {
          console.log(erros);
        });
        this.buscar=''
        this.$router.push('/')
    },
    excluirSelecionados(){
      let ids = "";
      let idsExluir = "";
      for (let cont = 0; cont < this.produtosSelecionados.length; cont++) {
        ids += this.produtosSelecionados[cont];
        if (ids.length != 0) {
          ids += ";";
        }
      }
      idsExluir = ids.substring(0, ids.length - 1);
      axios
        .delete(this.urlBase + "/destroyRecords/" +idsExluir)
        .then((response) => {
          this.montarProdutos();
          this.produtosSelecionados = [];
          console.log(response);
        })
        .catch((erros) => {
          console.log(erros);
        });
        this.visibilidadeExclusao="display:none"
        this.desativar=false
        this.buscar=''
        this.$router.push('/')
    },
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
      produtosSelecionados(){
      
        if(this.produtosSelecionados.length >= 1){
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
  .alerta{
     position: fixed;
    flex-flow: column nowrap;
     top: 30vh;
     left: 30vw;
     z-index: 10;
     background-color:aliceblue;
     padding: 2px;
     width: 30%;
     align-items: center;
     box-shadow:  0px 1px 2px 0px;
     border-radius: 5px;
  }
  .alerta button{
    width: 100px;
    margin: 5px;
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

.listar {
  margin-top: 50px;
  position: relative;
  left: 20%;
  width: 70%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}

.formulario {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}
  .tabelaProduto {
  position: absolute;
  left: 0%;
  top: 20%;
  font-size: 20px;
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

.paginacao{
  position: absolute;
  top: 50%;
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
  bottom: 0%;
  left: 20%;
  margin-bottom: 20px ;
  width: 50%;
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



  </style>
  