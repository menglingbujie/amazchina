<template>
  <el-upload
    class="image-uploader-single"
    :action="action"
    :headers="headers"
    :show-file-list="false"
    :on-progress="progressHandler"
    :on-success="successLicense"
    :on-error="errorHandler"
    :before-upload="beforeUpload"
    :accept="accType"
    v-loading="loading">
    <div v-if="image"  :style="{backgroundImage: 'url(' + image + ')'}" class="image"></div>
    <i v-else class="el-icon-plus image-uploader-icon"></i>
  </el-upload>
</template>
<style lang='less'>
@import "../styles/common/color.less";
.image-uploader-single{
  line-height: initial;
  .el-upload {
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    width: 100%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: $color_6797d9;
    }
  }
  .image-uploader-icon {
    font-size: 28px;
    color: $color_gray_d8;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .image {
    width: 100%;
    height: 80px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
<script>
  import Cookie from 'js-cookie';

  export default {
    props: ["action", "image", "acceptType", "maxSize"],
    data() {
      return {
        loading: false,
      }
    },
    computed: {
      headers() {
        return {
          "CLIENT-LANG": this.$lang.lang,
          "Authorization": "Bearer " + Cookie.get("access_token"),
        }
      },
      accType() {
        return this.acceptType ? this.acceptType : 'image/jpeg,image/png';
      },
      imageMaxSize() {
        return this.maxSize ? this.maxSize : 2;
      },
    },
    created() {
      this.$lang.load(['account']);
    },
    methods: {
      successLicense(resp, file) {
        this.loading = false;
        this.$emit("success", resp, file);
      },
      progressHandler(event, file) {
        this.loading = true;
      },
      errorHandler(err, file) {
        this.loading = false;
        this.$emit("error", err)
      },
      beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < this.imageMaxSize;
        if (!isLt2M) {
          this.$emit("error", {maxSize: this.imageMaxSize + "M"});
        }
        return isLt2M;
      }
    },
  }
</script>
