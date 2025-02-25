
<template>
  <Dialog :open="modelValue" @update:open="$emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Export LinkedIn Update</DialogTitle>
        <DialogDescription>
          Choose how you'd like to export your LinkedIn update. Each tier includes different features and analytics.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-6 py-4">
        <div class="grid gap-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(tier, index) in tiers" :key="index" :class="[
              'rounded-lg border p-6 space-y-4',
              tier.popular ? 'bg-blue-50/50 border-blue-200 relative overflow-hidden' : 'bg-card'
            ]">
              <div v-if="tier.popular" class="absolute top-5 right-5">
                <div class="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  Popular
                </div>
              </div>
              <div class="space-y-2">
                <h3 class="font-semibold text-lg">{{ tier.name }}</h3>
                <p class="text-sm text-muted-foreground">{{ tier.description }}</p>
              </div>
              <div class="space-y-2">
                <div class="text-3xl font-bold">{{ tier.price }}</div>
                <p class="text-sm text-muted-foreground">{{ tier.period }}</p>
              </div>
              <ul class="space-y-2 text-sm">
                <li v-for="(feature, featureIndex) in tier.features" :key="featureIndex" class="flex items-center">
                  <span class="mr-2">✓</span>
                  {{ feature }}
                </li>
              </ul>
              <Button
                :class="[
                  'w-full',
                  tier.popular ? '' : 'variant-outline'
                ]"
              >
                {{ tier.buttonText }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

defineEmits(['update:modelValue'])

const tiers = [
  {
    name: 'Basic',
    description: 'Essential LinkedIn features',
    price: 'Free',
    period: 'No credit card required',
    features: [
      'Plain text export',
      'Basic formatting',
      '1 Export per day'
    ],
    buttonText: 'Export Free'
  },
  {
    name: 'Premium',
    description: 'Professional features',
    price: '$5',
    period: 'per export',
    features: [
      'All Basic features',
      'Rich text formatting',
      'Analytics tracking',
      'Post scheduling',
      'Engagement insights'
    ],
    buttonText: 'Buy Premium Export',
    popular: true
  },
  {
    name: 'Subscription',
    description: 'Unlimited access',
    price: '$29',
    period: 'per month',
    features: [
      'All Premium features',
      'Unlimited exports',
      'Advanced analytics',
      'Priority support',
      'Custom branding'
    ],
    buttonText: 'Start Subscription'
  }
]
</script>
