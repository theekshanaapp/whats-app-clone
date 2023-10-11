<template>
  <div>
    <header class="p-2 text-white font-medium text-xl text-left">
      <h3>Whatsapp</h3>
    </header>
    <section class="flex justify-center items-center pt-20">
      <form @submit.prevent="login" class="absolute w-3/4 max-w-xs">
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          class="border-b-2 border-green-800 px-2 py-3 rounded-t w-full bg-transparent"
        />
        <button
          type="submit"
          class="bg-green-800 font-medium m-2 p-2 rounded text-white"
        >
          Submit
        </button>
      </form>
    </section>
  </div>
</template>
<style scoped>
header {
  background-color: var(--app-color);
}
</style>
<script>
export default {
  created() {
    if (sessionStorage.getItem("user-name")) this.$router.push("home");
  },
  methods: {
    login({ target: { elements } }) {
      let name = elements[0].value;
      if (name) {
        sessionStorage.setItem("user-name", name);
        this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>
<style scoped>
.pt-20 {
  padding-top: 20rem;
}
</style>
