
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Sample accomplishments data
const sampleAccomplishments = [
  {
    id: "1",
    title: "Reached 100% of sales quota for Q2",
    date: "2024-06-15",
    role: "Sales Executive",
    company: "HorizonCorp",
    privateDetails: "Managed a 20-client portfolio worth $1.2M in revenue",
    tags: ["Sales", "Achievement", "Quarter Goals", "highlight"],
    attachments: [
      {
        id: "1",
        name: "Final_points",
        type: "docx",
        size: "1.9MB",
        url: "/docs/final-points.docx"
      }
    ]
  },
  // ... Add more sample accomplishments as needed
]

export const useAccomplishmentStore = defineStore('accomplishments', () => {
  const accomplishments = ref(sampleAccomplishments)

  const toggleSelected = (id) => {
    const accomplishment = accomplishments.value.find(acc => acc.id === id)
    if (accomplishment) {
      accomplishment.selected = !accomplishment.selected
    }
  }

  const getSelectedAccomplishments = computed(() => {
    return accomplishments.value.filter(acc => acc.selected)
  })

  const clearSelection = () => {
    accomplishments.value = accomplishments.value.map(acc => ({
      ...acc,
      selected: false
    }))
  }

  return {
    accomplishments,
    toggleSelected,
    getSelectedAccomplishments,
    clearSelection
  }
})
