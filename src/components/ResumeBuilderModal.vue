
<template>
  <div class="fixed inset-0 z-50 bg-white">
    <div class="border-b">
      <div class="flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
        <div class="font-semibold">
          {{ modalTitle }}
        </div>
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          @click="$emit('close')"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>

    <div class="h-[calc(100vh-56px)] grid grid-cols-[60%_40%]">
      <Timeline />
      <component :is="previewComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'
import Timeline from './Timeline.vue'
import ResumePreview from './ResumePreview.vue'
import LinkedInPreview from './LinkedInPreview.vue'

const props = defineProps<{
  type: 'resume' | 'linkedin'
}>()

defineEmits<{
  (e: 'close'): void
}>()

const modalTitle = computed(() => {
  switch (props.type) {
    case 'linkedin':
      return 'Create LinkedIn Update'
    case 'resume':
    default:
      return 'Create New Resume'
  }
})

const previewComponent = computed(() => {
  switch (props.type) {
    case 'linkedin':
      return LinkedInPreview
    case 'resume':
    default:
      return ResumePreview
  }
})
</script>
