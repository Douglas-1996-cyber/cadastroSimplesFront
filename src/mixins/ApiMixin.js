import axios from "axios";
import { mapMutations,mapState } from "vuex";
export default{
    data:()=>({
        
        produtos:{},
        produto:{},
        urlPaginacao:'page=1',
        buscar:'',
        loading:true,
        desativar:false,
        selecionados:[],
      }),
      computed:{
        ...mapState({
          produtosSelecionados:state => state.produtosSelecionados,
          produtoStore:state => state.produto,
          urlBase:state => state.urlBase,
          idProduto:state => state.idProduto
        })

      },
 
      methods:{
        ...mapMutations({
          setVisibilidade: 'setVisibilidade',
          setProdutoItem:'setProdutoItem',
          setVisibilidadeExclusoes:'setVisibilidadeExclusoes',
          setProdutosSelecionados:'setProdutosSelecionados',
          setProdutoStore:'setProduto',
          setResposta:'setResposta',
          setIdProduto:'setIdProduto'
         }),

        verificarExcluirSelecionados(){
          this.setVisibilidadeExclusoes(true)
          this.desativar=true
          this.setProdutosSelecionados(this.selecionados)
          console.log(this.produtosSelecionados)
        },

        verificarExclusao(produto){
         this.setProdutoItem(produto)
         this.setVisibilidade(true)
        },

        excluir(id){
             this.setVisibilidade(false)
         axios
            .delete(this.urlBase + "/" + id)
            .then((response) => {
              location.replace('/')
              console.log(response);
            })
            .catch((erros) => {
              console.log(erros);
            });
            this.setProdutoItem({})
            this.buscar=''
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
              this.selecionados = [];
              this.setProdutosSelecionados(this.selecionados)
              this.setVisibilidadeExclusoes(false)
              this.desativar=false
              this.buscar=''
              location.replace('/')
              console.log(response);
            })
            .catch((erros) => {
              console.log(erros);
            });
        },

      paginar(l){
        if(l.url != null){
        this.urlPaginacao = l.url.split('?')[1]
        console.log(this.urlPaginacao)
        if(this.buscar!=''){
          this.montarProdutos(this.buscar)
        }else{
        this.montarProdutos()
        }
      }
      },

    montarProdutos(busca){
        let url
        if(busca !=undefined){
          url = this.urlBase +'?'+this.urlPaginacao+'&search='+busca
          this.buscar=busca
        }else{

        url = this.urlBase +'?'+this.urlPaginacao
        }
        axios
          .get(url)
          .then((res) => {
            this.loading = false
            this.produtos = res.data;
            this.produtos.links[0].label = "Anterior"
             this.produtos.links[this.produtos.links.length - 1].label = "Proximo"
            console.log(res.data);
          })
          .catch(() => {
            (erros) => {
              console.log(erros);
            };
          });
        
      },

      
      salvar(){
        let resposta = {
         mensagem:'',
         statusCode:''
        }
        let data = {
         name :this.produtoStore.name,
         price :this.produtoStore.price,
         amount :this.produtoStore.amount,
        }
         let config = {
           headers:{
             'Content-Type':'application/x-www-form-urlencoded',
             'Accept':'application/json'
           }
         }   
         axios.post(this.urlBase,data,config)
              .then(response=>{
               resposta.mensagem = 'Cadastro realizado com sucesso'
               resposta.statusCode = response.status
               this.setResposta(resposta)
             })
              .catch( erros=>{
                 console.log(erros)
                 resposta.mensagem = 'Um erro aconteceu ao processar as informações'
                 resposta.statusCode = 401
                 this.setResposta(resposta)
             })  
             this.setProdutoStore({})
       }, 

       salvarAlteracao(){
    
        let resposta = {
          mensagem:'',
          statusCode:''
         }
         let data = {
          name :this.produtoStore.name,
          price :this.produtoStore.price,
          amount :this.produtoStore.amount,
         _method:'patch'
        }
         const config = {
           headers:{
             'Content-Type':'multipart/form-data',
             'Accept':'application/json'
           }
         }
 
         axios.post(this.urlBase+'/'+this.idProduto,data,config)
              .then(response=>{
                resposta.mensagem = 'Alteração realizada com sucesso'
                resposta.statusCode = response.status
                console.log( resposta.statusCode)
                this.setResposta(resposta)
        
              })
              .catch( erros=>{
                console.log(erros)
                resposta.mensagem = 'Um erro aconteceu ao processar as informações'
                resposta.statusCode = 401
                this.setResposta(resposta)
             })
             this.setProdutoStore({})
             this.setIdProduto(0)
         
       },
     
    }
}