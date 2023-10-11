<template>
  <div class="home text-white h-screen overflow-y-scroll relative">
    <home-header @add="haddleAddUser" />
    <div v-if="rooms && rooms.length !== 0" class="bg-white overflow-hidden">
      <router-link
        :to="'/chat/' + room.name"
        v-for="(room, index) in rooms"
        :key="index"
      >
        <room-card :room="room" />
      </router-link>
    </div>
    <div v-else class="text-center text-gray-500 py-8">
      <!-- Display a message when there are no chats -->
      <p>No chats available.</p>

      <button
        type="submit"
        class="bg-green-800 font-medium m-2 p-2 rounded text-white"
        @click="haddleNewGroup('New Chat')"
        >
        New Chat
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import roomCard from "../components/roomCard";
import homeHeader from "../components/homeHeader";

// import { db } from '../firebase';

export default {
  components: {
    roomCard,
    homeHeader
  },
  computed: mapState(["rooms"]),
  methods: {
    haddleAddUser(name) {
      this.$store.dispatch('addUser', name);
    },
    haddleNewGroup: function(type) {
      let name;
      switch (type) {
        case 'New Chat':
          while (!name) {
            name = prompt("Enter chat name");
          }
          this.$socket.emit("create-group", name);
          this.$store.dispatch('addUser', name);
          break;
        default:
          break;
      }
    }
  }
};
</script>
