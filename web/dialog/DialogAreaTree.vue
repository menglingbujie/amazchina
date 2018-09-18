<template>
<el-dialog :modal="false" class="dialog tree" :visible.sync="isShowAreaTreeDialog"
  :before-close="handleClose" :title="treeTitle">
  <div class="panel tree">
    <el-tree class="expand-tree"
    v-if="isLoadingTree"
    :data="treeList"
    node-key="id"
    :highlight-current="true"
    :props="defaultProps"
    :render-content="renderContent"
    @node-click="handleNodeClick"></el-tree>
  </div>
</el-dialog>
</template>
<script>
import TreeItem from '../components/TreeItem.vue';
import _ from "lodash";
const MAX_TREE_LEVEL=6;
export default {
  props:{
    mode:{ // tree操作模式
      type:String,
      default:"readonly"
    },
    level: { // 显示操作的层级
      tyoe: Number,
      default: MAX_TREE_LEVEL,
    }
  },
  data(){
    return {
      non_maxexpandId: 100,//新增节点开始id(不更改)
      isLoadingTree: false,//是否加载节点树
      treeList:[],
      treeAllList:[],
      defaultProps: {//节点树数据
        children: 'sub',
        label: 'alias'
      },
      state:this.$store.state.interactive,
    }
  },
  components:{TreeItem},
  watch: {
    level(val,oldval) {
      if(val!=oldval) {
        this.treeList = _.cloneDeep(this.treeAllList);
        this.displayTreeList(this.treeList);
      }
    },
  },
  created(){
    this.fetchAreaTree();
  },
  computed:{
    treeTitle(){
      return this.state.treeTitle||"";
    },
    isShowAreaTreeDialog(){
      return this.state.isShowAreaTreeDialog;
    }
  },
  methods:{
    fetchAreaTree(){
      this.$store.dispatch("fetchAreaTree").then((resp)=>{
        this.treeAllList = _.cloneDeep(resp);
        this.treeList = resp;
        this.isLoadingTree = true;
      })
    },
    renderContent(h,{node,data,store}){//加载节点
      let that = this;
      return h(TreeItem, {
        props: {
          data: data,
          node: node,
          store: store,
          maxexpandId: that.non_maxexpandId,
          mode:that.mode,
        },
        on: {
          nodeAdd: ((d,n,s) => that.handleAdd(d,n,s)),//增加节点增加按钮
          // nodeDel: ((d,n,s) => that.handleDelete(d,n,s)),
          nodeClick: (d,n,s) => that.handleNodeClick(d,n,s),//点击节点
          nodeEditDone:(d,n,s)=>that.handleNodeEditDone(d,n,s)
        }
      });
    },
    showError(err){
      if(_.isObject(err)) {
        this.$message.error(_.values(err)[0]);
      }else {
        this.$message.error(err);
      }
    },
    handleNodeEditDone(d,n,s){
      // console.log("==handleNodeEditDone=",d, n)
      if(!d.id) {
        // 没有id通知后台增加节点
        this.$store.dispatch("createSubTree",{pid:n.parent.data.id,alias:d.alias}).then((resp)=>{
          this.$message.success(this.i18n("customer['Successful']"));
          let subs = n.parent.data.sub;
          subs.splice(subs.length-1, 1, resp);
        }).catch((err)=>{
          this.showError(err);
          n.parent.data.sub.pop();
        });
        return;
      }

      // 有id通知后台修改节点
      this.$store.dispatch("updateTree",{id:d.id,alias:d.alias}).then((resp)=>{
        this.$message.success(this.i18n("customer['Success']"));
      }).catch((err)=>{
        this.showError(err);
      })
    },
    getTreePathName(n){
      if(!n.parent||!n.label){
        return "";
      }
      return this.getTreePathName(n.parent)+"-"+n.label;
    },
    handleNodeClick(d,n,s){//点击节点
      d.isEdit=false;
      // console.log(s,"==handleNodeClick 1=")
      // console.log(d,"==handleNodeClick 2=")
      // console.log(n,"==handleNodeClick 3=")
      d.pathname=this.getTreePathName(n).replace(/^\-/,'');
      this.$emit("onTreeItemSelect",d);
    },
    handleAdd(d,n,s){//增加节点
      // console.log(n,"===add node==",d)
      if(n.level >=MAX_TREE_LEVEL){
        this.$message.error(this.i18n('common["Max node level"]').format(MAX_TREE_LEVEL),)
        return false;
      }
      if(!d.sub) {
        this.$set(d, "sub", []);
      }
      d.sub.push(_.assign({alias:this.i18n('commom["New node"]')},{isEdit: true}));
      //展开节点
      if(!n.expanded){
        n.expanded = true;
      }
    },
    handleDelete(d,n,s){//删除节点
      // console.log(s,d,n)
      let that = this;
      //有子级不删除
      if(d.sub && d.sub.length !== 0){
        this.$message.error("此节点有子级，不可删除！")
        return false;
      }else{
        //新增节点直接删除，否则要询问是否删除
        let delNode = () => {
          let list = n.parent.data.sub || n.parent.data,//节点同级数据
            _index = 99999;//要删除的index
          /*if(!n.parent.data.sub){//删除顶级节点，无sub
            list = n.parent.data
          }*/
          list.map((c,i) => {
            if(d.id == c.id){
              _index = i;
            }
          })
          let k = list.splice(_index,1);
          //console.log(_index,k)
          this.$message.success("删除成功！")
        }
        let isDel = () => {
          that.$confirm("是否删除此节点？","提示",{
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            delNode()
          }).catch(() => {
            return false;
          })
        }
        //判断是否新增
        d.id > this.non_maxexpandId ? delNode() : isDel()
      }
    },
    handleClose(){
      this.$store.dispatch("closeAreaTreeDialog");
    },
    displayTreeList(list) {
      _.each(list, (tree)=>{
        if(tree.level>=this.level) {
          tree.sub = "";
        }else {
          this.displayTreeList(tree.sub);
        }
      })
    },
  }
}
</script>
<style lang="less">
.dialog.tree{
  .dhead{
    >*{vertical-align: middle;}
    >.title{margin-right:10px;}
  }
  .panel.tree{
    width:100%;height:80%;
    &::-webkit-scrollbar-track{
      box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      border-radius:5px;
    }
    &::-webkit-scrollbar-thumb{
      background-color:rgba(50, 65, 87, 0.5);
      outline:1px solid slategrey;
      border-radius:5px;
    }
    &::-webkit-scrollbar{
      width:10px;
    }
    .expand-tree{
      border:none;
      .el-tree-node.is-current,
      .el-tree-node:hover{
        overflow:hidden;
      }
      .is-current>.el-tree-node__content .tree-btn,
      .el-tree-node__content:hover .tree-btn{
        display:inline-block;
      }
      .is-current>.el-tree-node__content .tree-label{
        font-weight:600;
        white-space:normal;
      }
    }
  }
}

</style>
