
<template>
  <div v-if="selectedAccomplishments.length === 0" class="p-6 h-full flex items-center justify-center text-center">
    <div class="text-gray-500">
      <p class="text-lg font-medium mb-2">LinkedIn Preview</p>
      <p class="text-sm">Select accomplishments from the timeline to see them in your LinkedIn profile</p>
    </div>
  </div>

  <template v-else>
    <div :class="[
      isFullScreen ? 'fixed inset-0 bg-white z-50 overflow-auto' : 'p-6 h-full overflow-auto bg-gray-50 space-y-4'
    ]">
      <div :class="[
        isFullScreen ? 'max-w-4xl mx-auto p-8' : ''
      ]">
        <div class="flex justify-end gap-2">
          <Button variant="outline" size="sm" @click="handleExport" class="gap-2">
            <FileText class="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" @click="toggleFullScreen" class="gap-2">
            <Maximize2 class="w-4 h-4" />
            {{ isFullScreen ? 'Exit Full Screen' : 'Full Screen' }}
          </Button>
        </div>

        <ProfileHeader :headline="getProfileHeadline()" />

        <div class="space-y-6">
          <div class="bg-white rounded-lg border">
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Experience</h2>
              <div class="space-y-8">
                <ExperienceItem
                  v-for="[company, accomplishments] in groupedAccomplishments"
                  :key="company"
                  :role="getLatestRole(accomplishments)"
                  :company="company"
                  :start-date="getEarliestDate(accomplishments)"
                  :end-date="getLatestDate(accomplishments)"
                  :duration="getDurationYears(accomplishments)"
                  :accomplishments="accomplishments"
                  :tags="getUniqueTags(accomplishments)"
                  :attachments="getAllAttachments(accomplishments)"
                />
              </div>
            </div>
          </div>
        </div>

        <ExportModal v-model="showExportModal" />
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastify'
import { FileText, Maximize2 } from 'lucide-vue-next'
import { Button } from '../ui/button'
import { useAccomplishmentStore } from '@/stores/accomplishments'
import ProfileHeader from './ProfileHeader.vue'
import ExperienceItem from './ExperienceItem.vue'
import ExportModal from './ExportModal.vue'
import { format, differenceInYears } from 'date-fns'

const toast = useToast()
const { getSelectedAccomplishments } = useAccomplishmentStore()

const isFullScreen = ref(false)
const showExportModal = ref(false)

const selectedAccomplishments = computed(() => getSelectedAccomplishments())

const groupedAccomplishments = computed(() => {
  const groups = selectedAccomplishments.value.reduce((acc, accomplishment) => {
    if (!acc[accomplishment.company]) {
      acc[accomplishment.company] = []
    }
    acc[accomplishment.company].push(accomplishment)
    return acc
  }, {})

  return Object.entries(groups).sort(([, aAccomplishments], [, bAccomplishments]) => {
    const aLatestDate = Math.max(...aAccomplishments.map(a => new Date(a.date).getTime()))
    const bLatestDate = Math.max(...bAccomplishments.map(b => new Date(b.date).getTime()))
    return bLatestDate - aLatestDate
  })
})

const getProfileHeadline = () => {
  if (selectedAccomplishments.value.length === 0) return ""
  
  const latestAccomplishment = [...selectedAccomplishments.value].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0]

  const highlightedAccomplishments = selectedAccomplishments.value.filter(acc => 
    acc.tags?.includes('highlight')
  )

  if (highlightedAccomplishments.length > 0) {
    return `${latestAccomplishment.role} | ${highlightedAccomplishments[0].title}`
  }

  return `${latestAccomplishment.role} with expertise in ${selectedAccomplishments.value[0].tags?.slice(0, 2).join(" and ") || "various domains"}`
}

const getLatestRole = (accomplishments) => {
  return [...accomplishments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0].role
}

const getEarliestDate = (accomplishments) => {
  return new Date(Math.min(...accomplishments.map(a => new Date(a.date).getTime())))
}

const getLatestDate = (accomplishments) => {
  return new Date(Math.max(...accomplishments.map(a => new Date(a.date).getTime())))
}

const getDurationYears = (accomplishments) => {
  const latestDate = getLatestDate(accomplishments)
  const earliestDate = getEarliestDate(accomplishments)
  return differenceInYears(latestDate, earliestDate)
}

const getUniqueTags = (accomplishments) => {
  return Array.from(new Set(accomplishments.flatMap(acc => acc.tags || [])))
}

const getAllAttachments = (accomplishments) => {
  return accomplishments.flatMap(acc => acc.attachments || [])
}

const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value
}

const handleExport = () => {
  if (selectedAccomplishments.value.length === 0) {
    toast.error("Please select at least one accomplishment to export.")
    return
  }
  showExportModal.value = true
}
</script>
