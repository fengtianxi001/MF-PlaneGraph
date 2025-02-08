<template>
  <div class="base-panel">
    <div class="base-panel-header">
      <span class="base-panel-header-title">{{ title }}</span>
      <span class="base-panel-header-tip" v-if="tip">
        <icon-question-circle />
        <span style="margin-left: 2px">{{ tip }}</span>
      </span>
    </div>
    <div class="base-panel-filter" v-if="$slots.filter">
      <slot name="filter"></slot>
    </div>
    <div class="base-panel-body">
      <!-- 让滚动条贴着容器边缘   -->
      <div class="base-panel-wrap">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon'
interface PropsType {
  title: string
  tip?: string
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
  border: 1px solid var(--color-neutral-3);
  &-header {
    flex-shrink: 0;
    padding: 20px 20px 0;
    &-title {
      font-size: 18px;
      font-weight: bold;
    }
    &-tip {
      margin-left: 10px;
      font-size: 12px;
      color: var(--color-neutral-5);
    }
  }
  &-filter {
    flex-shrink: 0;
    padding: 20px 20px 0;
  }
  &-body {
    flex: 1;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: hidden;
  }
  &-wrap {
    box-sizing: border-box;
    height: 100%;
    padding-right: 20px;
    padding-left: 20px;
    overflow-y: auto;
  }
}
</style>
