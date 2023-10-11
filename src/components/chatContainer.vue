<template>
  <div class="chat-container flex flex-col h-screen">
    <header class="chat__header flex px-1 py-2 items-center text-white">
      <router-link
        to="/home"
        class="flex items-center"
        @click.native="leaveRoom"
      >
        <span class="material-icons">keyboard_backspace</span>
        <Avatar />
      </router-link>

      <div
        class="header__title flex flex-col justify-start ml-2 flex-1 text-left overflow-hidden"
      >
        <p class="truncate">{{ roomName }}</p>
        <p class="header__title__status font-light truncate">
          {{ displayUsers }}
        </p>
      </div>
      <span class="material-icons ml-3">videocam</span>
      <span class="material-icons ml-3">call</span>
      <span
        class="material-icons ml-3 moreopts"
        ref="more"
        @click.stop="isOption = true"
        >more_vert</span
      >
      <more-options :position="optsPos" @close="optionsClose" v-if="isOption" />
    </header>
    <div class="container__messages flex flex-col overflow-y-scroll h-full">
      <component
        :is="component(msg.isMsg)"
        v-for="msg in messages"
        :key="msg.id"
        :msg="msg"
      ></component>
    </div>
    <messageForm @ping="appendMsg" />
  </div>
</template>

<script>
import messageCard from "./messageCard.vue";
import messageForm from "./messageForm.vue";
import notificationCard from "./notificationCard.vue";
import Avatar from "./avatar.vue";
import moreOptions from "./container/chatMoreOpts";
import { mapActions, mapState } from 'vuex'; // Import mapActions from Vuex
export default {
  components: {
    messageCard,
    messageForm,
    Avatar,
    notificationCard,
    moreOptions
  },
  data() {
    return {
      messages: [],
      roomName: "",
      users: [],
      isOption: false
    };
  },
  computed: {
    ...mapState(["rooms"]),
    displayUsers() {
      return this.users.join(", ");
    }
  },
  mounted() {
    this.roomName = this.$route.params.name;
    // To get the position of the parent for more options position
    this.optsPos = this.$refs.more.getBoundingClientRect();

    let selectedChat = this.rooms.filter((room) => room.name === this.roomName);
    this.messages = selectedChat[0].messages.map(obj=> {
      obj.timeStamp = new Date(obj.timeStamp.seconds * 1000 + obj.timeStamp.nanoseconds / 1000000);
      return obj;
    })
  },
  sockets: {
    incomingMessage(data) {
      this.messages.push(data);
      this.scrollToLatest();
    },
    notification(data) {
      let name;
      if (data.slice(data.length - 4) === "left") {
        name = data.slice(0, data.length - 5);
        this.users.splice(this.users.indexOf(name), 1);
      } else {
        name = data.slice(0, data.length - 7);
        this.users.push(name);
      }
      this.messages.push({
        id: Math.random(),
        text: data,
        isMsg: false
      });
      this.scrollToLatest();
    }
  },
  destroyed() {
    // Call the 'allRooms' action when the component is about to be destroyed
    this.allRoomsAction();
  },
  methods: {
    ...mapActions(['updateRoomMessages']),
    component(isMsg) {
      return isMsg ? "messageCard" : "notificationCard";
    },

    leaveRoom() {
      this.$socket.emit("leave-group", this.roomName);
    },

    appendMsg(msg) {
      let roomName = this.roomName;

      this.messages.push({
        id: Math.random(),
        text: msg,
        timeStamp: new Date(),
        name: "You",
        mine: true,
        isMsg: true
      });

      let pushMessages = {
        id: Math.random(),
        text: msg,
        timeStamp: new Date(),
        name: "You",
        mine: true,
        isMsg: true
      };
      
      this.updateRoomMessages({ roomName, pushMessages });
      let el = document.querySelector(".container__messages");
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 0);
      this.scrollToLatest();
    },

    scrollToLatest() {
      let el = document.querySelector(".container__messages");
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 0);
    },

    optionsClose() {
      this.isOption = false;
    },

    allRoomsAction() {
      // Dispatch the 'allRooms'
      this.$store.dispatch('allRooms').catch((error) => {
        console.error('Error fetching all rooms:', error);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat__header {
  background-color: var(--app-color);
}
.header__title__status {
  font-size: 12px;
}
</style>