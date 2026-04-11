<template>
  <div>
    <div class="hero-section bg-gradient-to-b from-[#161f32] to-[#383f5000]">
      <HeroSection />
    </div>
    <div class="skils bg-gradient-to-t from-[#161f32] to-[#383f5000]">
      <SkilsSection />
    </div>
    <div class="experience bg-gradient-to-b from-[#161f32] to-[#383f5000]">
      <Experience />
    </div>
    <div class="project bg-gradient-to-t from-[#161f32] to-[#383f5000]">
      <Project />
    </div>
    <div class="contact bg-gradient-to-b from-[#161f32] to-[#383f5000]">
      <Contact />
    </div>
    <div class="contact bg-gradient-to-b from-[#161f32] to-[#383f5000] mt-5">
      <Footer />
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'layout',
  });

  useHead({
    title: 'Farhan Aditya - Full Stack Developer',
  });
</script>
<style scoped>
  .hero {
    background-image: url('https://cpwebassets.codepen.io/assets/packs/lines-3-4541e35a1939230404d773f7eeddcc9b.svg');
    background-size: 65%;
  }
</style>
