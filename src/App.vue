<template>
  <Layout>
    <div class="panel">
      <div class="panel-header">房间平面图</div>
      <div class="panel-body">
        <a-radio-group type="button">
          <a-radio value="Beijing">客厅</a-radio>
          <a-radio value="Shanghai">卧室</a-radio>
          <a-radio value="Guangzhou">厨房</a-radio>
          <a-radio value="Shenzhen">浴室</a-radio>
          <a-radio value="Shenzhen">书房</a-radio>
        </a-radio-group>
        <div class="plane"></div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">智能设备</div>
      <div class="panel-body">
        <a-radio-group type="button">
          <a-radio value="Beijing">全部</a-radio>
          <a-radio value="Shanghai">照明</a-radio>
          <a-radio value="Guangzhou">温控</a-radio>
          <a-radio value="Shenzhen">安全</a-radio>
          <a-radio value="Shenzhen">娱乐</a-radio>
        </a-radio-group>
        <div class="devices">
          <div v-for="device in 20" class="device">
            <div class="device-icon">💡</div>
            <div class="device-name">智能灯</div>
            <div class="device-position">客厅-[111,112]</div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script setup lang="ts">
import { Layout } from '@/layout'
</script>

<style lang="scss" scoped>
.panel {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: hidden;
  background-color: var(--color-bg-2);
  border: 1px solid var(--color-border);
  .panel-header {
    margin-bottom: 20px;
    font-size: 18px;
    color: var(--color-text-1);
  }
  .panel-body {
    height: calc(100% - 40px);
    overflow: hidden;

    // background-color: red;
    .plane {
      height: calc(100% - 60px);
      margin-top: 20px;
      background-color: var(--color-fill-2);
      border: 1px solid var(--color-border);
    }
    .devices {
      height: calc(100% - 60px);
      margin-top: 20px;
      overflow-y: auto;
      .device {
        display: grid;
        grid-template-areas:
          'left top-right'
          'left bottom-right';

        // grid-template-rows: 1fr;
        grid-template-columns: 60px 1fr;
        gap: 6px;
        margin-bottom: 10px;
        background-color: var(--color-fill-2);
        border: 1px solid var(--color-border);
        .device-icon {
          display: flex;
          grid-area: left;
          align-items: center;
          justify-content: center;
          width: 100%;
          aspect-ratio: 1/1;
          font-size: 30px;
        }
        .device-name {
          display: grid;
          grid-area: top-right;
          align-items: end;
          font-size: 16px;
          font-weight: bold;
          color: var(--color-text-1);
        }
        .device-position {
          grid-area: bottom-right;
          font-size: 12px;
          color: rgb(var(--gray-6));

          // background-color: blue;
        }
      }
    }
  }
}
</style>
