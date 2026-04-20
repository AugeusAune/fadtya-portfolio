<template>
  <div class="relative">
    <!-- Vertical line -->
    <div
      class="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent pointer-events-none"
    />

    <div
      v-for="(item, index) in props.data"
      :key="index"
      class="relative flex gap-4 sm:gap-6 pb-8 sm:pb-12 last:pb-0"
    >
      <!-- Dot -->
      <div class="relative flex flex-col items-center shrink-0">
        <div
          :class="[
            'relative z-10 flex items-center justify-center rounded-full border-2 shrink-0 transition-all',
            'w-8 h-8 sm:w-10 sm:h-10',
            isPresent(item.time)
              ? 'bg-green-500/10 border-green-500 text-green-400'
              : 'bg-gray-900 border-gray-700 text-gray-500',
          ]"
        >
          <div
            v-if="isPresent(item.time)"
            class="absolute inset-0 rounded-full bg-green-500/20 animate-ping"
          />
          <Icon
            :name="isPresent(item.time) ? 'ph:sparkle-fill' : 'ph:circle-fill'"
            class="text-[10px] sm:text-xs relative z-10"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0 pt-1">
        <!-- Time -->
        <time
          :class="[
            'block text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-2',
            isPresent(item.time) ? 'text-green-500' : 'text-gray-500',
          ]"
        >
          {{ item.time }}
        </time>

        <!-- Card -->
        <div
          class="group rounded-xl sm:rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900 transition-all duration-300 overflow-hidden"
        >
          <!-- Top accent for present -->
          <div
            v-if="isPresent(item.time)"
            class="h-px bg-gradient-to-r from-green-500/60 via-green-400/30 to-transparent"
          />

          <div class="p-4 sm:p-5">
            <!-- Title + badge -->
            <div class="flex flex-wrap items-start gap-2 mb-2 sm:mb-3">
              <h4
                class="font-black text-white text-xs sm:text-sm leading-snug group-hover:text-green-400 transition-colors flex-1 break-words min-w-0"
              >
                {{ item.title }}
              </h4>
              <span
                v-if="item.status"
                :class="[
                  'shrink-0 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-none whitespace-nowrap',
                  isPresent(item.time)
                    ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                    : 'bg-gray-800 text-gray-400 border border-gray-700',
                ]"
              >
                {{ item.status }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
              {{ item.description }}
            </p>

            <!-- Tech icons -->
            <div
              v-if="item.icon_skil?.length"
              class="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800"
            >
              <Icon
                v-for="(icon, idx) in item.icon_skil"
                :key="idx"
                :name="icon"
                class="text-sm sm:text-base text-gray-600 hover:text-green-400 transition-colors cursor-default"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: { type: Array, required: true },
  });

  const isPresent = (time) => time && time.toLowerCase().includes('present');
</script>
