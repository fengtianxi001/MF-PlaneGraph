<template>
  <div class="layout">
    <div class="layout-header">
      <div style="display: flex">
        <LayoutBrand />
      </div>
      <div style="display: flex">
        <LayoutActions />
      </div>
    </div>
    <div class="layout-body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="tsx">
import LayoutBrand from './LayoutBrand.vue'
import LayoutActions from './LayoutActions.vue'
</script>
<style lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  font-family: SarasaMonoSC;
  .layout-header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;
    background-color: var(--color-menu-light-bg);
    border-bottom: 1px solid var(--color-neutral-3);
  }
  .layout-body {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 350px;
    grid-gap: 30px;
    height: calc(100% - 50px);
    padding: 30px;
    background-color: var(--color-neutral-2);
    background-size: auto 100%;
  }
}
</style>
