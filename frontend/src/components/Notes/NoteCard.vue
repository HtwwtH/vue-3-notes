<template>
  <div 
    class="card mb-4"
  >
    <div class="card-content">
      <div class="content">
        <div class="has-text-right has-text-grey-light mt-2">
          {{ dateFormatted }}
        </div>
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          {{ symbolsAmount }}
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        :to="`/edit-note/${ note.id }`"
        href="#"
        class="card-footer-item">
          Edit
        </RouterLink>
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
      >Delete</a>
    </footer>

    <DeleteNoteModal
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :note-id="note.id"
    />
  </div>
</template>

<script setup lang="ts">
import DeleteNoteModal from '@/components/Notes/DeleteNoteModal.vue'
import { reactive, computed } from 'vue'

  const props = defineProps({
    note: {
      type: Object,
      required: true
    }
  })

  const symbolsAmount = computed(() => {
    const length = props.note.content.length
    const description = length > 1 ? 'symbols' : 'symbol'
    return `${ length } ${ description }`
  })

  const dateFormatted = computed(() => {
    return props.note.date.format('D.M.YYYY, H:m')
  })

  const modals = reactive({
    deleteNote: false
  })
</script>