<template>
  <chatContainer />
</template>

<script>
import chatContainer from "@/components/chatContainer.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    chatContainer
  },
  computed: mapGetters(["roomArr"]),
  mounted() {
    if (this.roomArr.indexOf(this.$route.params.name) > -1)
      this.$socket.emit(
        "join-group",
        this.$route.params.name,
        sessionStorage.getItem("user-name")
      );
    else this.$router.push({ name: "Home" });
  }
};
</script>
