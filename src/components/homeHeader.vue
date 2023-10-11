<template>
  <header class="header flex pt-3 flex-wrap items-center sticky">
    <p class="flex-1 text-left px-2 font-bold text-2xl">WhatsApp</p>
    <span class="material-icons mr-2">search</span>

    <!-- more options -->
    <span
      tabindex="0"
      class="moreopts material-icons p-2"
      @keypress.enter="toggle"
      @click.stop="toggle"
      ref="more"
      >more_vert</span
    >
    <more-options v-if="show" :position="optsPos" @add="optionAdd" @close="optionClose" />

    <!-- pages -->
    <section class="section pt-6 relative">
      <ul class="flex items-center cursor-pointer" id="pages">
        <li
          tabindex="0"
          :class="[i ? 'flex-1' : 'flex px-2', 'pb-2']"
          v-for="(tab, i) in tabs"
          :key="i"
          @keypress.enter="activeTab(i)"
          @click="activeTab(i)"
        >
          {{ i ? tabs[i] : null }}
          <span class="material-icons items-center" v-if="!i">camera_alt</span>
          <span
            class="bg-white h-6 inline-block rounded-full w-6 text-black mx-1"
            v-if="i === 1"
            >{{ roomLen }}</span
          >
        </li>
      </ul>
      <div class="highlighter absolute bg-white bottom-0 h-1"></div>
    </section>
  </header>
</template>
<style scoped>
.header {
  background-color: var(--app-color);
  box-shadow: 0 2px 5px black;
  top: -60px;
}
.section {
  flex: 1 100%;
}
.highlighter {
  transition: all 0.25s ease-in-out;
}
</style>
<script>
import moreOptions from "./container/homeMoreOpts";
import { mapGetters } from "vuex";
export default {
  components: {
    moreOptions
  },
  data() {
    return {
      show: false,
      tabs: ["CAM", "CHATS", "STATUS", "CALLS"],
      tab: 0
    };
  },
  computed: {
    ...mapGetters(["roomArr"]),
    roomLen() {
      return this.roomArr.length;
    }
  },
  mounted() {
    this.activeTab(1);

    // To get the position of the parent for more options position
    this.optsPos = this.$refs.more.getBoundingClientRect();
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    activeTab(index) {
      this.tab = index;
      this.highlight();
    },
    highlight() {
      let el = document.querySelector(".highlighter"),
        idx = this.tab,
        li = document.querySelectorAll("#pages li")[idx],
        width = parseFloat(getComputedStyle(li).width);
      el.style.left = li.offsetLeft + "px";
      el.style.width = width + "px";
    },
    optionAdd(name) {
      name && this.$emit("add", name);
    },

    optionClose() {
      this.toggle();
    }
  }
};
</script>
