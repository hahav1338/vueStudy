<template>
  <div id="app">
    <div class = "panelCommon">
          <panel panelName="我是顶级panel"></panel>
          <div class="secondPanel">
           </div>
                 <panel panelName="上面的panel"></panel>
                    <div class="otherPanel">左边的panel</div>
                    <div class="otherPanel">右边的panel</div>
                  <panel panelName="下面的panel"></panel>
                   <div class="otherPanel">中间的html</div>

    </div>
    <div class="functional_block_one">
            <input v-model:value="count">
             <functional_block functionalBlockName="搜索框示例">

             </functional_block>
             <tableList></tableList>
    </div>




  </div>

</template>

<script>
import store from './vuex/store';
import firstcomponent from './component/firstComponent.vue';
import btn_add from './component/btn_add.vue';
import selector from './component/selector.vue';
import panel from './component/panel.vue';
import functional_block  from './component/functional_block.vue';
import tableList  from './component/tableList.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: store.state.count++
    }
  },
  computed: {
      count:function() {
  	    return store.state.count++
      }
    },
   components: { firstcomponent,btn_add,selector,panel,functional_block,tableList}
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 0;
  padding:0;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  margin:0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


.panelCommon{
    width:100%;
    height:280px;
    background:#fff;
}
.otherPanel{
    width:150px;
    height:100px;
    display:inline-block;
}
.secondPanel {
    height:15px;
}
.functional_block_one {
    over_flow:hidden;
    margin_top:10px;
}
</style>
