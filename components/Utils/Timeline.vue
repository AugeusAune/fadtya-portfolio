<template>
  <div class="relative">
    <!-- Vertical line -->
    <div
      class="absolute left-3.5 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-gray-700 to-transparent pointer-events-none"
    />
    <div
      v-for="(item, index) in props.data"
      :key="index"
      class="relative flex gap-4 sm:gap-6 pb-8 sm:pb-12 last:pb-0"
    >
      <!-- Dot indicator -->
      <div class="relative flex flex-col items-center shrink-0">
        <div
          :class="[
            'relative z-10 flex items-center justify-center rounded-full border-2 shrink-0 transition-colors',
            'w-7 h-7 sm:w-8 sm:h-8',
            isPresent(item.time)
              ? 'bg-blue-50 border-blue-600 dark:bg-blue-950/60 dark:border-blue-400'
              : 'bg-white border-slate-300 dark:bg-gray-900 dark:border-gray-700',
          ]"
        >
          <div
            :class="[
              'rounded-full',
              isPresent(item.time)
                ? 'w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400'
                : 'w-2 h-2 bg-slate-400 dark:bg-gray-600',
            ]"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0 pt-0.5">
        <!-- Time -->
        <time
          :class="[
            'block text-[11px] font-bold uppercase tracking-wider mb-2',
            isPresent(item.time)
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-gray-400',
          ]"
        >
          {{ item.time }}
        </time>

        <!-- Card -->
        <div
          class="group rounded-2xl border border-slate-200/90 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-blue-400/60 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 overflow-hidden shadow-sm"
        >
          <!-- Top subtle accent line for present -->
          <div
            v-if="isPresent(item.time)"
            class="h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-transparent dark:from-blue-500/80 dark:via-blue-400/40"
          />

          <div class="p-5 sm:p-6">
            <!-- Title + badge -->
            <div class="flex flex-wrap items-start gap-2 mb-2 sm:mb-3">
              <h4
                class="font-black text-slate-900 dark:text-white text-sm sm:text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1 break-words min-w-0"
              >
                {{ item.title }}
              </h4>
              <span
                v-if="item.status"
                :class="[
                  'shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider leading-none whitespace-nowrap',
                  isPresent(item.time)
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/20'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
                ]"
              >
                {{ item.status }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
              {{ item.description }}
            </p>

            <!-- Projects list -->
            <div
              v-if="item.projects?.length"
              class="mt-4 pt-4 border-t border-slate-100 dark:border-gray-800 space-y-2.5"
            >
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">
                Delivered Systems &amp; Clients
              </p>
              <div
                v-for="(project, pIdx) in item.projects"
                :key="pIdx"
                class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 px-3.5 py-2.5 rounded-xl bg-slate-50/90 dark:bg-gray-800/40 border border-slate-200/70 dark:border-gray-700/50 hover:border-slate-300 dark:hover:border-gray-600 transition-colors"
              >
                <div class="min-w-0">
                  <span class="block text-xs font-bold text-slate-800 dark:text-white leading-snug">
                    {{ project.name }}
                  </span>
                  <span class="block text-[11px] text-slate-500 dark:text-gray-400 leading-snug">
                    {{ project.client }}
                  </span>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <span class="text-[10px] text-slate-500 dark:text-gray-400 whitespace-nowrap">
                    {{ project.time }}
                  </span>
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider whitespace-nowrap',
                      project.role === 'Lead Programmer'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/20'
                        : 'bg-slate-200/70 text-slate-700 border border-slate-300/60 dark:bg-gray-700/60 dark:text-gray-300 dark:border-gray-600',
                    ]"
                  >
                    {{ project.role }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Tech icons -->
            <div
              v-if="item.icon_skil?.length"
              class="flex flex-wrap gap-2.5 sm:gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-gray-800"
            >
              <Icon
                v-for="(icon, idx) in item.icon_skil"
                :key="idx"
                :name="icon"
                class="text-base text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
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
