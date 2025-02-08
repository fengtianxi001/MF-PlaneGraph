<template>
  <div class="base-device-marker">
    <a-popover position="rt">
      <div class="marker-main">
        <img src="/public/images/devices/10.png" alt="icon" />
      </div>
      <template #content>
        <div class="descriptions">
          <div class="description-item">
            <span class="description-item-label">产品名称：</span>
            <span class="description-item-value">空气加湿器</span>
          </div>
          <div class="description-item">
            <span class="description-item-label">产品序号：</span>
            <span class="description-item-value">b64d86a19dc7</span>
          </div>
          <div class="description-item">
            <span class="description-item-label">产品品类：</span>
            <span class="description-item-value">温控</span>
          </div>
          <div class="description-item">
            <span class="description-item-label">产品厂商：</span>
            <span class="description-item-value">小米</span>
          </div>
          <div class="description-item">
            <span class="description-item-label">维保时间：</span>
            <span class="description-item-value">2025-09-10</span>
          </div>
        </div>
        <a-button size="mini" long type="primary" status="danger"
          >移除</a-button
        >
      </template>
    </a-popover>

    <div class="marker-tip">
      <div class="maerker-tip-icon"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
// interface PropsType {}
// const props = defineProps<PropsType>()
</script>
<style lang="scss">
.descriptions {
  .description-item {
    margin-bottom: 6px;
    font-size: 12px;
    &-label {
    }
    &-value {
      display: inline-block;
      padding: 2px 6px;
      margin-right: 4px;
      font-size: 10px;
      color: var(--color-text-1);
      background-color: var(--color-fill-2);
      border-radius: 2px;
    }
  }
}
.base-device-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  //   background-color: red;
  .marker-main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background-color: var(--color-bg-2);
    border: 1px solid var(--color-border);
    border-radius: 50%;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .marker-tip {
    width: 30px;
    height: 30px;
    .maerker-tip-icon {
      position: relative;
      width: 10px;
      height: 10px;
      margin: 10px;
      background: #2655ff;
      border-radius: 50%;
      &::after {
        position: absolute;
        top: -10px;
        left: -10px;
        width: 30px;
        height: 30px;
        content: '';
        background: rgba(38, 85, 255, 16%);
        border-radius: 50%;
        animation: breathe 2s ease-in-out infinite;
        will-change: transform;
      }
    }
  }
}

@keyframes breathe {
  0% {
    transform: scale(0.3);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.3);
  }
}
</style>
