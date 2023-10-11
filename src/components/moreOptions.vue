<template>
  <ul
    class="z-10 bg-white text-black text-left absolute shadow-md rounded"
    ref="list"
    :style="{ top: moreData.position.top + 'px' }"
    id="popup"
  >
    <li
      class="opt py-2 cursor-pointer hover:bg-gray-300"
      v-for="(opt, i) in moreData.options"
      :key="i"
    >
      <a
        href="javascript:void(0)"
        class="opt pl-3 pr-6 flex"
        @click="optionClick(opt.name)"
        >{{ opt.name }}</a
      >
    </li>
  </ul>
</template>
<script>
export default {
  props: ["moreData"],
  mounted() {
    this.$refs.list.style.left =
      this.moreData.position.left - this.$el.offsetWidth + "px";
    document.addEventListener("click", this.globalClick);
  },
  methods: {
    globalClick(e) {
      const isOpts = [...e.target.classList].indexOf("opt") > -1;
      if (!isOpts) {
        this.emitAndClean();
      }
    },

    emitAndClean() {
      this.$emit("close");
      this.cleanListeners();
    },

    cleanListeners() {
      document.removeEventListener("click", this.globalClick);
    },

    optionClick(name) {
      this.$emit("click", name);
      this.emitAndClean();
    }
  }
};
</script>
