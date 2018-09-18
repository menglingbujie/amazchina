<template>
  <el-select v-loading="loading"  v-model="current" filterable :filter-method="filterHander">
    <el-option v-for="country in resultCountries" :label="displayCountry(country)" :value="country.code" v-bind:key="country.id">
      <i class="icon flag" :class="country.code.toLowerCase()"></i>
      <span class="nation">{{ displayCountry(country) }}</span>
    </el-option>
  </el-select>
</template>
<style lang='less' scoped>
  @import "../styles/common/flags_small.less";
  .el-select {
    width: 100%;
  }
  .el-select-dropdown__item {
    font-size: 0;
    height: 40px;
    line-height: 40px !important;
    >i, >span {
      margin-right: 5px;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
    }
  }
</style>
<script>
  import AccountApi from '../api/account';
  export default {
    data() {
      return {
        countryList: [],
        loading:false,
        current:"",
        resultCountries: [],
      }
    },
    watch: {
      current(val) {
        this.$emit("country", val)
        return val;
      },
    },
    created() {
      const initCountries = sessionStorage.getItem('countries');
      if(initCountries){
        this.initCountry(JSON.parse(initCountries));
      }else{
        this.fetchCountryList();
      }
    },
    methods: {
      initCountry(list){
        let code= this.$lang.lang;
        if(code=="zh-CN"){
          code="CN";
        }else{
          code="GB";
        }
        let ct = _.find(list,{code: code.toUpperCase()});
        this.current = ct&&ct.code; // 初始化当前国家
        this.resultCountries = list;// 初始化过滤国家
        this.countryList=list;
      },
      filterHander(country) {
        this.resultCountries = _.orderBy(_.filter(this.countryList,(item) => {
          return this.displayCountry(item).toLowerCase().indexOf(country.toLowerCase()) != -1
        }), ['id'], ['asc']);
      },
      fetchCountryList() {
        this.loading = true;
        AccountApi.fetchCountryList().then((resp)=>{
          if(!resp.result){
            return sessionStorage.removeItem("countries");
          }
          const countries = resp.data;
          sessionStorage.setItem('countries',JSON.stringify(countries));
          this.initCountry(countries);
        }).catch((e)=>{
          this.$message.error(e);
        }).finally(()=>{
          this.loading = false;
        })
      },
      displayCountry(country) {
        return this.$lang.lang == "zh-CN" ? country.name : country.en_name;
      },
    },
  }
</script>
