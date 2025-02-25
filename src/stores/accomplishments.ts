
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Accomplishment } from '../types/accomplishment'
import { sampleAccomplishments } from '../data/sampleAccomplishments'

export const useAccomplishmentStore = defineStore('accomplishments', () => {
  const accomplishments = ref<Accomplishment[]>(sampleAccomplishments)

  const toggleSelected = (id: string) => {
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
