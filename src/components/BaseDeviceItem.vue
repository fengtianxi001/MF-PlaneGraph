<template>
  <div class="base-device-item">
    <div class="item-left">💡</div>
    <div class="item-main">
      <div class="item-name">智能灯(119538153)</div>
      <div class="item-desc">已绑定-客厅</div>
    </div>
    <div class="item-right">
      <Switch />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Switch } from '@arco-design/web-vue'
// interface PropsType {}
// const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-device-item {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: var(--color-fill-2);
  border: 1px solid var(--color-border);

  //   background-color: blue;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  .item-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 8px;
    font-size: 40px;

    // background-color: red;
  }
  .item-main {
    flex: 1;
    .item-name {
      font-size: 16px;
      font-weight: bold;
    }
    .item-desc {
      margin-top: 4px;
      font-size: 12px;
      color: rgb(var(--gray-6));
    }
  }
  .item-right {
    // margin-right: 10px;
  }
}
</style>
