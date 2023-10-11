<template>
  <div
    class="card relative px-2 p-1 rounded-b text-left m-2"
    :class="[msg.mine ? 'mine self-end' : 'self-start']"
  >
    <header
      class="font-medium card__header"
      :class="[msg.mine ? 'text-green-600' : 'text-orange-600']"
    >
      {{ msg.name }}
    </header>
    <article>{{ msg.text }}</article>
    <footer class="card__footer font-light justify-end flex items-center">
      <span class="text-xs">
        {{
          new Date(msg.timeStamp).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
          })
        }}
      </span>
      <span
        class="material-icons ml-1 text-base"
        v-if="msg.mine"
        :style="{ color: '#23b6f2' }"
        >done_all</span
      >
    </footer>
  </div>
</template>
<script>
export default {
  props: {
    msg: Object
  }
};
</script>
<style scoped>
.card {
  max-width: 75vw;
  background-color: white;
  margin-left: 12px;
  border-top-right-radius: 0.25rem;
  word-wrap: break-word;
}
.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -10px;
  width: 10px;
  height: 10px;
  border-top-left-radius: 5px;
  background-color: inherit;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
}
.card.mine {
  margin-right: 12px;
  background-color: var(--msg-color);
  border-top-right-radius: 0rem;
  border-top-left-radius: 0.25rem;
}
.card.mine::before {
  left: auto;
  right: -10px;
  clip-path: polygon(0 0, 100% 0, 0 100%, 0 0);
}
.card__footer,
.card__header {
  font-size: 0.75rem;
}
</style>
