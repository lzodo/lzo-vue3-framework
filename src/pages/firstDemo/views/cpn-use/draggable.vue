<template>
  <button @click="start">start</button>
  <button @click="pause">pause</button>
  <button @click="disabled = !disabled">{{ disabled ? 'enabled' : 'disabled' }}</button>
  <div class="flex">
    <VueDraggable
      ref="el"
      v-model="list"
      :disabled="disabled"
      :animation="150"
      ghostClass="ghost"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded"
      @start="onStart"
      @update="onUpdate"
    >
      <div v-for="item in list" :key="item.id">
        {{ item.name }}
      </div>
    </VueDraggable>
    {{ list }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
const list = ref([
  {
    name: 'Joao',
    id: 1,
  },
  {
    name: 'Jean',
    id: 2,
  },
  {
    name: 'Johanna',
    id: 3,
  },
  {
    name: 'Juan',
    id: 4,
  },
]);

const el = ref();
const disabled = ref(false);
function pause() {
  console.log('pause');
  el.value?.pause();
}

function start() {
  console.log('start');
  el.value?.start();
}

const onStart = () => {
  console.log('start');
};

const onUpdate = () => {
  console.log('update');
};
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
