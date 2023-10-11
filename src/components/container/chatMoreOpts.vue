<template>
  <more-options
    :moreData="{
      ...moreData,
      position: {
        top: position.top + position.height / 2,
        left: position.left + position.width / 2
      }
    }"
    @close="() => $emit('close')"
  />
</template>

<script>
import moreOptions from "../moreOptions";
export default {
  props: ["position"],
  data() {
    return {
      moreData: {
        options: [
          {
            name: "View contact"
          },
          {
            name: "Media, links, and docs"
          },
          {
            name: "Search"
          },
          {
            name: "Mute notifications"
          },
          {
            name: "Wallpaper"
          },
          {
            name: "More"
          }
        ]
      }
    };
  },
  components: {
    moreOptions
  }
};
</script>

<style></style>
