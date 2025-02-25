
<template>
  <div class="flex gap-4">
    <div class="flex-shrink-0">
      <div class="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
        <Building2 class="w-6 h-6 text-gray-500" />
      </div>
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="text-base font-semibold text-gray-900">{{ role }}</h3>
      <div class="mt-1">
        <p class="text-sm text-gray-600">{{ company }} · Full-time</p>
        <div class="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
          <span>{{ formatDate(startDate) }}</span>
          <span>-</span>
          <span>{{ formatDate(endDate) }}</span>
          <span class="mx-1">·</span>
          <span>{{ duration }} yrs</span>
        </div>
        <p class="text-sm text-gray-500 mt-0.5">United States</p>
      </div>
      <div class="mt-3 space-y-2">
        <p v-for="accomplishment in accomplishments" :key="accomplishment.id" class="text-sm text-gray-700">
          • {{ accomplishment.title }}
        </p>
      </div>
      <div v-if="tags.length > 0" class="mt-4">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(tag, index) in tags"
            :key="index"
            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <div v-if="attachments.length > 0" class="mt-4 space-y-2">
        <div v-for="attachment in attachments" :key="attachment.id" class="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
          <FileText class="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p class="text-sm font-medium text-gray-900">{{ attachment.name }}</p>
            <p class="text-xs text-gray-500">{{ attachment.type }} · {{ attachment.size }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Building2, FileText } from 'lucide-vue-next'
import { format } from 'date-fns'

const props = defineProps({
  role: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  accomplishments: {
    type: Array,
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  },
  attachments: {
    type: Array,
    default: () => []
  }
})

const formatDate = (date) => {
  return format(date, "MMM yyyy")
}
</script>
