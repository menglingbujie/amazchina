<template>
  <el-menu class="navbar" mode="horizontal">
    <img class="logo" src="/assets/images/logo.png">
    <Change-Language></Change-Language>
    <div class="nav-right">
      <el-dropdown class="avatar-container" @command="dropdownCommand" trigger="click" size="small">
        <div class="user">
          <div class="avatar-wrapper">
            <span class="uname">{{nickName}}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item command="logout">
            <span>{{i18n("account['Sign out']")}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>
<script>
import ChangeLanguage from '../components/ChangeLanguage';
export default {
  components: {
    ChangeLanguage,
  },
  data(){
    return {
      stateUser:this.$store.state.user,
      stateInteractive:this.$store.state.interactive,
    }
  },
  created(){
    this.$nextTick(()=>{
      this.$store.dispatch('user/fetchUserInfo').then((resp)=>{
      });
    })
  },
  computed:{
    userInfo(){
      return this.stateUser.userInfo;
    },
    nickName() {
      return this.userInfo.nickname;
    }
  },
  methods: {
    dropdownCommand(cm) {
      if(cm=="logout") {
        if (this.callProviderType == 2) {
          icallcenter.logon.logout();
        }else if (this.callProviderType == 1) {
          window.plivoClient.client.logout();
        }
        this.$store.dispatch('account/doLogout');
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common/color';
.navbar {
  line-height: 50px;
  border-radius: 0px !important;
  background:none;
  &.el-menu--horizontal {
    border: none;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
    -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
  }
  >.logo{vertical-align: middle; margin-left: 20px;}
  .nav-right {
    float: right;
    padding-right: 35px;
    white-space: nowrap;
    .btn_group{
      margin-right:30px;float:left;
      .tag,.status,.dropdown{margin-right:5px;}

    }
    .btn_call {
      padding: 0;
      color: @color_32c5d2;
      vertical-align: middle;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      >.user{
        color:@color_fff;
        >.avatar-wrapper {
          cursor: pointer;
          position: relative;
          .user-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
          }
          .el-icon-caret-bottom {
            font-size: 12px;vertical-align: middle;color:@color_fff;
          }
          >.uname{font-size:14px;}
        }
      }
    }
  }
}
</style>
