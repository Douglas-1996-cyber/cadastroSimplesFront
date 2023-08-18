import { createStore } from 'vuex'

export default createStore({
  state: {
    visibilidade: false,
    produtoItem:{},
    produtosSelecionados:[],
    visibilidadeExclusoes:false,
    produto:{
      name:'',
      price:'',
      amount:'',
    },
    resposta:{},
    urlBase: "https://apicadastrosimples-fb77b399cf41.herokuapp.com/api/produto",
    idProduto : 0
  },
  getters: {
  },
  mutations: {
    setVisibilidade:(state,payload)=>{
    state.visibilidade = payload
    },

    setProdutoItem:(state,produto)=>{
      state.produtoItem = produto
    },
    
    setProdutosSelecionados:(state,produto)=>{
      state.produtosSelecionados = produto
    },
    setVisibilidadeExclusoes:(state,payload)=>{
      state.visibilidadeExclusoes = payload
    },
    setProduto:(state,produto)=>{
      state.produto = produto
    },
    setResposta:(state,payload)=>{
      state.resposta = payload 
    },
    setIdProduto:(state,payload)=>{
      state.idProduto = payload 
    }  


  },
  actions: {
  },
  modules: {
  }
})
