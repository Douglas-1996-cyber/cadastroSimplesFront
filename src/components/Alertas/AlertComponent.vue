<template>
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
</template>
<script>
import ApiMixin from '@/mixins/ApiMixin'
  export default {
    name: 'AlertComponent',
    mixins:[ApiMixin],
  }
</script>