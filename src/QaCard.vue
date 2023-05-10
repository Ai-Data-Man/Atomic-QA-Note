<template>
    <div class="rich-media-node" :style="{ border: collapsed ? '2px solid grey' : '' }">
        <img :src="node.avatar" style="width: 48px; height: 48px; border-raduis: 4px;" />
        <span style="padding: 4px 0; font-weight: bold;">能力值{{ node.value }}</span>
    </div>
</template>

<script setup lang="js">
export default {
    name: 'QaCard',
    props: {
        node: {
            type: Object,
            required: true
        },
        collapsed: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped lang="less">
.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}
</style>