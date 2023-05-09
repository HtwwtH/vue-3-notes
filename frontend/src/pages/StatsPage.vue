<template>
  <div class="stats">
    <table class="table">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of notes: </td>
          <td>{{ notesStore.getNotesNumber }}</td>
        </tr>
        <tr>
          <td>Total number of symbols: </td>
          <td>{{ notesStore.getSymbolsNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'

const notesStore = useNotesStore()
</script>