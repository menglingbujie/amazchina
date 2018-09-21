<template>
  <Layout-Frame>
    <el-main class="content article" slot="content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-main>
  </Layout-Frame>
</template>

<script>
export default {
}
</script>

