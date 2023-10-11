<template>
  <more-options
    @click="add"
    @close="optionClose"
    :moreData="{
      ...moreData,
      position: {
        top: position.top + position.height / 2,
        left: position.left + position.width / 2
      }
    }"
  />
</template>

<script>
import moreOptions from "../moreOptions";
export default {
  props: ["position"],
  components: { moreOptions },
  data() {
    return {
      moreData: {
        options: [
          {
            name: "New Chat"
          },
          {
            name: "New Broadcast"
          },
          {
            name: "Settings"
          }
        ]
      }
    };
  },
  methods: {
    add(type) {
      let name;
      switch (type) {
        case this.moreData.options[0].name:
          while (!name) {
            name = prompt("Enter chat name");
          }
          this.$socket.emit("create-group", name);
          this.$store.dispatch('addUser', name);
          break;
        default:
          break;
      }
    },
    optionClose() {
      this.$emit("close");
    }
  }
};
</script>

<style></style>
