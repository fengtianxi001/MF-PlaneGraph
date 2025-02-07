<template>
  <div class="base-panel">
    <div class="panel-header">{{ title }}</div>
    <div class="panel-filter" v-if="$slots.filter">
      <slot name="filter"></slot>
    </div>
    <div class="panel-body">
      <!-- 让滚动条贴着容器边缘   -->
      <div class="panel-wrap">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface PropsType {
  title: string
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-bg-2);
  border: 1px solid var(--color-border);
  .panel-header {
    flex-shrink: 0;
    padding: 20px 20px 0;
    font-size: 18px;
  }
  .panel-filter {
    flex-shrink: 0;
    padding: 20px 20px 0;
  }
  .panel-body {
    flex: 1;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    .panel-wrap {
      box-sizing: border-box;
      height: 100%;
      padding-right: 20px;
      padding-left: 20px;
      overflow-y: auto;
    }
  }
}
</style>
