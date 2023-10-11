<template>
  <div class="flex items-center p-1 pl-2">
    <Avatar />
    <div
      class="flex my-1 mx-2 text-left flex-1 overflow-hidden border-gray-400 border-b border-solid text-black"
    >
      <div class="flex-1 overflow-hidden">
        <p>{{ room.name }}</p>

        <p class="text-xs text-gray-600 font-light pb-2 truncate">
          {{ room.messages.length !== 0 ? room.messages[0].text : 'No Messages'}}
        </p>
      </div>
      <div class="flex flex-col items-end">
        <p class="text-gray-600 text-xs">{{ convertTimestamp(room.updateDate)  }}</p>
        <span
          class="flex items-center justify-center bg-black text-white font-medium h-6 rounded-full w-6 m-1 overflow-hidden"
          :style="{ backgroundColor: 'var(--notification-color)' }"
          >{{ room.messages.length !== 0 ? room.messages.length : '0' }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "./avatar";
export default {
  props: ["room"],
  components: {
    Avatar
  },
  methods: {
    convertTimestamp(originalTimestamp) {
      const date = new Date(originalTimestamp.seconds * 1000 + originalTimestamp.nanoseconds / 1000000); // Convert to milliseconds
      
      const hours = date.getHours();
      const minutes = date.getMinutes();
      // Format the time
      return `${hours}:${minutes}`;
    }
  }
};
</script>
