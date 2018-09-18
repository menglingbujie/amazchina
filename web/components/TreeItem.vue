<template>
	<span class="tree-expand">
		<span class="tree-label" v-show="isEdit">
			<el-input class="edit" size="mini" autofocus
        v-model="data.alias"
        :ref="'treeInput'+data.id"
        @click.stop.native="nodeEditFocus"
        @blur.stop="nodeEditPass(data,node,store)"
        @keyup.enter.stop.native="nodeEditBlur(data,node,store)"></el-input>
		</span>
		<span v-show="!isEdit" @click.stop="nodeClick(data,node,store)" :class="[data.id > maxexpandId ? 'tree-new tree-label' : 'tree-label']">
			<span>{{data.alias}}</span>
		</span>
		<span class="tree-btn" v-show="isShowControlBar">
			<i v-if="data.id" class="el-icon-plus" @click.stop="nodeAdd(data,node,store)"></i>
			<i v-if="data.level!='1'" class="el-icon-edit" @click.stop="nodeEdit(data,node,store)"></i>
			<!-- <i class="el-icon-delete" @click.stop="nodeDel(data,node,store)"></i> -->
		</span>
	</span>
</template>

<script>
	export default{
		name: 'treeExpand',
		props: ['node', 'data', 'store', 'maxexpandId','mode'],
		data(){
			return {
				isEdit:false,
			}
		},
		created(){
			this.isEdit = this.data.isEdit||false;//初始化
			this.data.isEdit = this.isEdit;
			this.$nextTick(() => {
				this.$refs['treeInput'+this.data.id].$refs.input.focus();
			})
		},
		computed:{
			isShowControlBar(){
				let d = this.data;
				// 非编辑状态并且不是readonly，并且level不是第一级（顶级不让修改）
				return !this.isEdit&&this.mode!='readonly';
			}
		},
		methods: {
			nodeAdd(d,n,s){//新增
				this.$emit('nodeAdd',d,n,s)
			},
			nodeEdit(d,n,s){//编辑节点，不需要通知外面，编辑完成后再通知
				this.isEdit=d.isEdit=true;
				this.$nextTick(() => {
					this.$refs['treeInput'+d.id].$refs.input.focus();
				})
			},
			nodeDel(d,n,s){//删除
				this.$emit('nodeDel',d,n,s)
			},
			nodeClick(d,n,s){//节点点击
				this.$emit('nodeClick',d,n,s)
			},
			nodeEditPass(d,n,s){//编辑完成
				this.nodeEditBlur(d,n,s);
				this.$emit('nodeEditDone',d,n,s)
			},
			nodeEditFocus(){
				//阻止点击节点的事件冒泡
			},
			nodeEditBlur(d,n,s){
				// console.log("=nodeEditBlur==")
				this.isEdit=d.isEdit = false;
			}
		}
	}
</script>
<style>
.tree-expand .tree-label .edit .el-input__inner{
  height:24px;line-height:24px;
}
</style>
<style lang="less" scoped>
	.tree-expand{
		overflow:hidden;
	}
	.tree-expand .tree-label.tree-new{
		font-weight:600;
	}
	.tree-expand .tree-label{
		font-size:0.9em;
	}
	.tree-expand .tree-label .edit{
		width:80%;
	}
	.tree-expand .tree-btn{
		display:none;
		margin-left:20px;
	}
	.tree-expand .tree-btn i{
		color:#8492a6;
		font-size:0.9em;
		margin-right:3px;
	}
</style>
