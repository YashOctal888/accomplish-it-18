
<template>
  <div class="bg-white rounded-lg border mb-4">
    <div class="h-24 bg-[#1B2437] rounded-t-lg relative">
      <div class="absolute -bottom-12 left-6">
        <div class="w-32 h-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center">
          <Building2 class="w-16 h-16 text-gray-400" />
        </div>
      </div>
    </div>
    <div class="pt-16 px-6 pb-6">
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-semibold text-gray-900">John Doe</h1>
            <Shield class="w-5 h-5 text-gray-500" />
            <span class="text-gray-500">· 1st</span>
          </div>
          <p class="text-gray-700 mt-1">{{ headline }}</p>
          <div class="flex items-center gap-2 text-gray-500 mt-2">
            <span>United States</span>
            <span>·</span>
            <a href="#" class="text-blue-600 hover:underline">Contact info</a>
          </div>
          <div class="flex items-center gap-4 mt-3 text-gray-600">
            <div class="flex items-center gap-1">
              <span class="font-medium">500+</span>
              <span>followers</span>
            </div>
            <span>·</span>
            <div class="flex items-center gap-1">
              <span class="text-blue-600 hover:underline cursor-pointer">500+ connections</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <Button class="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <MessageSquare class="w-4 h-4" />
          Message
        </Button>
        <Button variant="outline" class="gap-2">
          <MoreHorizontal class="w-4 h-4" />
          More
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Building2, Shield, MessageSquare, MoreHorizontal } from 'lucide-vue-next'
import { Button } from '../ui/button'

defineProps({
  headline: {
    type: String,
    required: true
  }
})
</script>
