import axios from "axios";
export default{
    data:()=>({
        urlBase: "https://apicadastrosimples-fb77b399cf41.herokuapp.com/api/produto",
        produtos:{},
        produto:{},
        urlPaginacao:'page=1',
        buscar:''
      }),
      methods:{
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
          console.log('asd')
        url = this.urlBase +'?'+this.urlPaginacao
        }
        console.log(busca)
        console.log(url)
        axios
          .get(url)
          .then((res) => {
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
       },
       consultarID(id){
        console.log(id)
        axios.get(this.urlBase+'/'+id)
        .then(response=>{
        this.produto = response.data
        console.log(this.produto)
        }) 
       .catch( erros=>{console.log(erros)})
       }
    }
}