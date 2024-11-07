<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-lg mx-auto bg-[#FEFAE0] rounded-md mt-7 p-5 pr-1 h-[700px] relative custom-shadow">
    <div class="text-xl text-[#0F2C59] text-center">Text Note 📓 </div>
    <button @click="openForm" class="absolute right-5 top-6 border-2 border-[#0F2C59] rounded-md hover:scale-105"
      role="img" aria-label="add-note">➕</button>
    <hr class="w-36 mx-auto mt-2 border-t-[3px] border-[#0F2C59]">

    <div
      class="notes-container mt-11 p-8 flex flex-col gap-7 max-h-[540px] overflow-hidden overflow-y-scroll custom-scrollbar">
      <div v-for="(noteItem, index) in noteArr" :key="index" class="w-full relative bg-[#FEFAE0] shadow-lg">
        <div class="note-item top-[-17px] left-0 right-0 text-sm text-[#0F2C59] flex justify-between">
          <div class="flex"> <span class="text-xs">⚫</span> {{ noteItem }}</div>
          <div class="flex gap-1">
            <button @click="editNote(index)">🖊️</button>
            <button @click="deleteNote(index)">❌</button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <form v-if="isOpenForm" @submit.prevent="saveNote"
        class="bg-[#fdabab] flex flex-col gap-2 rounded-md p-6 text-[#0F2C59] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-36 shadow-lg">
        <label class="text-lg" for="add">{{ editIndex !== null ? 'Edit note' : 'Add new note' }}</label>
        <input v-model="note" type="textNote">
        <div class="flex justify-evenly text-xs mt-4">
          <button type="submit"
            class="bg-[#FEFAE0] p-[6px] rounded-sm shadow-md hover:bg-[#6e935b] hover:text-white transition-all hover:scale-105">
            {{ editIndex !== null ? 'Update' : 'Save' }}
          </button>
          <button @click="cancelNote"
            class="bg-[#FEFAE0] p-[6px] rounded-sm shadow-md hover:bg-[#6e935b] hover:text-white transition-all hover:scale-105">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

onMounted(() => {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    noteArr.value = JSON.parse(savedNotes);
  }
});

const isOpenForm = ref(false);
const noteArr = ref<string[]>([])
const editIndex = ref<number | null>(null);

const openForm = () => {
  isOpenForm.value = true;
  editIndex.value = null;
};

const note = ref('');
const saveNote = () => {
  if (note.value.trim()) {
    if (editIndex.value !== null) {
      noteArr.value[editIndex.value] = note.value;
    } else {
      noteArr.value.push(note.value);
    }
    localStorage.setItem('notes', JSON.stringify(noteArr.value));
    isOpenForm.value = false;
    note.value = '';
    editIndex.value = null;
  }
};

const cancelNote = () => {
  note.value = '';
  isOpenForm.value = false;
  editIndex.value = null;
};

const deleteNote = (index: number) => {
  noteArr.value.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(noteArr.value));
};

const editNote = (index: number) => {
  note.value = noteArr.value[index];
  isOpenForm.value = true;
  editIndex.value = index;
};
</script>

<style scoped>
input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-width: 1px;
  border-bottom-color: #0F2C59;
  border-bottom-style: dotted;
  background-color: #fdabab;
  color: #0F2C59;
}

input:focus {
  outline: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #FEFAE0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #0F2C59;
  border-radius: 4px;
  border: 2px solid #FEFAE0;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #6e935b;
}

.note-item {
  word-break: break-word;
  white-space: normal;
  max-width: 100%;
}
</style>
