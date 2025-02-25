
<template>
  <div class="min-h-screen bg-[#F6FBFB]">
    <main class="py-8 px-4 max-w-4xl mx-auto">
      <!-- Artifacts Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div
          v-for="artifact in artifacts"
          :key="artifact.title"
          class="p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center bg-white rounded-lg border"
          @click="artifact.onClick"
        >
          <component :is="artifact.icon" class="w-8 h-8 mb-4 text-gray-600" />
          <h3 class="font-medium mb-2">{{ artifact.title }}</h3>
          <p class="text-sm text-gray-500">{{ artifact.description }}</p>
        </div>
      </div>

      <div class="border-t my-8"></div>

      <!-- Previous Artifacts -->
      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900">Previous Artifacts</h2>
        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="artifact in previousArtifacts"
            :key="artifact.title"
            class="p-4 hover:bg-gray-50 transition-colors cursor-pointer bg-white rounded-lg border"
          >
            <div class="flex items-center gap-4">
              <div class="p-2 bg-gray-100 rounded-lg">
                <component :is="artifact.icon" class="w-5 h-5 text-gray-600" />
              </div>
              <div class="flex-1">
                <div>
                  <h3 class="font-medium text-sm text-gray-900 mb-1">{{ artifact.title }}</h3>
                  <div class="flex items-center gap-2">
                    <p class="text-xs text-gray-500">{{ artifact.type }}</p>
                    <span
                      v-for="tag in artifact.tags"
                      :key="tag"
                      class="px-2 py-0.5 text-[10px] bg-gray-100 text-gray-600 rounded-full"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-xs text-gray-500">
                {{ new Date(artifact.date).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <ResumeBuilderModal
        v-if="showModal"
        :type="modalType"
        @close="closeModal"
      />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FileText, MessagesSquare, FileSpreadsheet, Linkedin } from 'lucide-vue-next'
import ResumeBuilderModal from '../components/ResumeBuilderModal.vue'

const showModal = ref(false)
const modalType = ref('resume')

const closeModal = () => {
  showModal.value = false
}

const handleModalOpen = (type) => {
  modalType.value = type
  showModal.value = true
}

const artifacts = [
  {
    title: "Performance Review",
    description: "Track and manage performance reviews",
    icon: FileSpreadsheet,
    onClick: () => handleModalOpen('resume')
  },
  {
    title: "1:1",
    description: "Document one-on-one meetings",
    icon: MessagesSquare,
    onClick: () => handleModalOpen('resume')
  },
  {
    title: "Resume",
    description: "Create and update your resume",
    icon: FileText,
    onClick: () => handleModalOpen('resume')
  },
  {
    title: "LinkedIn Profile",
    description: "Generate LinkedIn content",
    icon: Linkedin,
    onClick: () => handleModalOpen('linkedin')
  }
]

const previousArtifacts = [
  {
    title: "Q4 Performance Review",
    type: "Performance Review",
    date: "2024-02-15",
    icon: FileSpreadsheet
  },
  {
    title: "Weekly 1:1 with Manager",
    type: "1:1",
    date: "2024-02-10",
    icon: MessagesSquare,
    tags: ["Auto-updated", "Shared"]
  },
  {
    title: "Software Engineer Resume",
    type: "Resume",
    date: "2024-02-01",
    icon: FileText
  }
]
</script>
