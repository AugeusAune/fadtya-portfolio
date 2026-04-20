<template>
  <div>
    <div class="md:flex h-screen">
      <ul class="flex-column space-y space-y-6 text-sm p-20 font-medium text-gray-400 md:me-4 mb-4 md:mb-0 shadow-md shadow-blue-500/50 rounded">
        <div class="flex justify-center">
            <img class="w-[10em] h-[10em] p-1 rounded-full ring-1 ring-blue-600" :src="imgSrc" alt="Bordered avatar">
        </div>
        <el-divider></el-divider>
        <li v-for="(tab, index) in tabs" :key="index">
          <button v-if="tab.is_active" class="uppercase cursor-pointer inline-flex items-center px-20 py-3 text-white rounded-lg active w-full bg-blue-600">
            <Icon :name="tab.icon" class="text-xl mr-2" />
            {{ tab.name }}
          </button>
          <button v-else class="uppercase cursor-pointer inline-flex items-center px-20 py-3 rounded-lg w-full bg-gray-800 text-white">
            <Icon :name="tab.icon" class="text-xl mr-2" />
            {{ tab.name }}
          </button>
        </li>
      </ul>
      <div class="text-medium text-gray-500 h-[90vh] overflow-y-auto overflow-x-hidden rounded-lg w-full mt-20">
        <!-- <h3 class="text-lg font-bold text-white mb-2">Profile Tab</h3> -->
            <HeroSection />
            <!-- <SkilsSection /> -->
            <!-- <Experience /> -->
            <!-- <Project/> -->
            <!-- <Contact/> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

interface tabType {
  name: string;
  is_active: boolean;
  icon: string;
};

const tabs: Ref<tabType[]> = ref([
  { name: "Profile", is_active: false, icon: "iconamoon:profile-circle-duotone", },
  { name: "Skills",  is_active: false, icon: "mage:dashboard" },
  { name: "Experience",  is_active: false, icon: "arcticons:pixel-experience" },
  { name: "Projects",  is_active: false, icon: "ant-design:project-filled" },
  { name: "Contact",  is_active: false, icon: "bxs:contact" },
]);

const imgSrc: Ref<string> = ref('https://yayangwijaya.com/cat.gif');

</script>

<style lang="scss" scoped></style>
