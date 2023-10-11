<template>
  <div
    class="bg-blue-200 font-hairline p-1 rounded text-gray-900 self-center m-2"
    :style="{ width: 'max-content' }"
  >
    {{ msg.text }}
  </div>
</template>
<script>
export default {
  props: ["msg"]
};
</script>
