
<template>
  <div>
    <nav v-if="!isPublicView" class="bg-[#377E7F]">
      <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <router-link to="/">
          <img 
            src="/lovable-uploads/b319e0ed-4a1d-4f33-a859-c9ab1db0a991.png" 
            alt="Accomplish It" 
            class="h-9"
          />
        </router-link>
        
        <div class="absolute left-1/2 -translate-x-1/2">
          <nav class="space-x-2">
            <router-link 
              to="/"
              :class="[
                'relative h-14 flex items-center px-4 text-sm font-medium transition-colors hover:text-white',
                $route.path === '/' 
                  ? 'text-white after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-white'
                  : 'text-white/80 hover:after:absolute hover:after:bottom-[-1px] hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-white/50'
              ]"
            >
              Accomplishments
            </router-link>
            <router-link 
              to="/resume-builder"
              :class="[
                'relative h-14 flex items-center px-4 text-sm font-medium transition-colors hover:text-white',
                $route.path === '/resume-builder'
                  ? 'text-white after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-white'
                  : 'text-white/80 hover:after:absolute hover:after:bottom-[-1px] hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-white/50'
              ]"
            >
              Artifacts
            </router-link>
          </nav>
        </div>

        <div class="relative" v-click-outside="closeDropdown">
          <button 
            @click="toggleDropdown"
            class="flex items-center gap-2 px-4 h-14 text-sm font-medium text-white/80 hover:text-white"
          >
            <User class="h-4 w-4" />
            <span>Profile</span>
            <ChevronDown class="h-4 w-4" />
          </button>

          <div 
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
          >
            <router-link to="/profile" class="dropdown-item">
              <User class="h-4 w-4 mr-2" />
              Profile
            </router-link>
            <router-link to="/settings" class="dropdown-item">
              <Settings class="h-4 w-4 mr-2" />
              Settings
            </router-link>
            <div class="border-t my-1"></div>
            <button @click="signOut" class="dropdown-item text-red-600">
              <LogOut class="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, Settings, LogOut, ChevronDown } from 'lucide-vue-next'

export default {
  name: 'App',
  components: {
    User,
    Settings,
    LogOut,
    ChevronDown
  },
  setup() {
    const isPublicView = ref(false)
    const isDropdownOpen = ref(false)
    const router = useRouter()

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const closeDropdown = () => {
      isDropdownOpen.value = false
    }

    const signOut = () => {
      closeDropdown()
    }

    const handleStorageChange = () => {
      const view = localStorage.getItem('view')
      isPublicView.value = view === 'public'
    }

    onMounted(() => {
      handleStorageChange()
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('viewChange', handleStorageChange)
    })

    onUnmounted(() => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('viewChange', handleStorageChange)
    })

    const vClickOutside = {
      mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value()
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    }

    return {
      isPublicView,
      isDropdownOpen,
      toggleDropdown,
      closeDropdown,
      signOut,
      vClickOutside
    }
  }
}
</script>

<style scoped>
.dropdown-item {
  @apply flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left;
}
</style>
