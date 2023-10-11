<template>
  <form class="chat flex items-center relative my-1 mb-2">
    <span class="material-icons absolute chat__smiley self-end">tag_faces</span>
    <textarea
      class="chat__msg rounded-full tracking-wide px-10 p-2 ml-1 w-full resize-none"
      rows="1"
      placeholder="Type a message"
      @keypress.enter.exact.prevent="submit"
      @input="autoResize"
    ></textarea>
    <div class="chat__options absolute inline-flex self-end">
      <span class="material-icons chat__attach mr-4">attach_file</span>
      <transition name="slide-fade">
        <span class="material-icons chat__cam mr-2" v-if="!dirty"
          >camera_alt</span
        >
      </transition>
    </div>
    <button
      type="submit"
      @click.prevent="submit"
      class="send rounded-full flex mx-1 p-2"
    >
      <span class="material-icons text-white" v-if="!dirty">mic</span>
      <span class="material-icons text-white" v-if="dirty">send</span>
    </button>
  </form>
</template>
<script>
export default {
  name: "MessageForm",
  data() {
    return {
      dirty: false
    };
  },
  methods: {
    submit() {
      let input = document.querySelector(".chat__msg");
      if (!input.value) return;
      window.navigator.vibrate(30);
      this.$socket.emit("chat-message", {
        msg: input.value,
        room: this.$route.params.name,
        user: sessionStorage.getItem("user-name")
      });
      this.$emit("ping", input.value);
      input.value = "";
      this.autoResize({ target: input });
      this.dirty = false;
    },
    autoResize(e) {
      this.dirty = true;
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
      if (e.target.value === "") this.dirty = false;
    }
  }
};
</script>
<style scoped>
.send {
  background-color: var(--app-sub-color);
}
.chat__msg {
  border-radius: 1.5rem;
  min-height: 40px;
}
.chat__msg:placeholder-shown + .chat__attach + .chat__cam {
  display: inline;
}
.chat__smiley {
  left: 0.75rem;
  bottom: 0.5rem;
}
.chat__options {
  right: 3rem;
  bottom: 0.5rem;
}
.chat__attach {
  transform: rotateZ(-45deg);
}
.slide-fade-leave-active {
  transition: all 0.05s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
