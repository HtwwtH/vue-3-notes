<template>
  <div :class="`card has-background-${ bgColor }-dark p-4 mb-4`">
    <label
      v-if="label"
      class="label has-text-white"
    >
      {{ label }}
    </label>
      <div class="field">
        <div class="control">
          <textarea
            v-autofocus
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="textarea"
            :class="{ 'is-danger': isDanger }"
            :placeholder="placeholder"
            ref="textareaRef"
            maxlength="256"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <slot name="buttons" />
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { vAutofocus } from '@/directives/vAutofocus'

  defineProps({
    modelValue: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: 'success'
    },
    placeholder: {
      type: String,
      default: 'Type your note...'
    },
    label: {
      type: String,
      default: ''
    },
    isDanger: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const textareaRef = ref<null | { focus: () => null }>(null)

  const focusTextArea = () => {
    textareaRef.value?.focus()
  }

  defineExpose({
    focusTextArea
  })
</script>