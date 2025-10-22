<template>
  <div class="flex w-full h-[85vh] flex-direction-column gap-4">
    <div  :class="{ 'rounded border border-gray-400 bg-white shadow overflow-auto w-[60%]': isShowChild, 'rounded border border-gray-400 bg-white shadow overflow-auto w-[100%]': !isShowChild }">
     <div>
        <slot name="titleParent"></slot>
     </div>
     <div>
        <slot name="contentParent"></slot>
     </div>
    </div>

    <div class="rounded border border-gray-400 bg-white shadow overflow-auto w-[40%]"  v-show="isShowChild">
    <div>
        <slot name="titleChild"></slot>
     </div>
     <div>
        <slot name="contentChild"></slot>
     </div>
    </div>
  </div>
</template>

<script setup lang="ts">

interface IProps {
    isShowChild: boolean
}

const props = withDefaults(defineProps<IProps>(), {
   isShowChild: false
})

</script>
