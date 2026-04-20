<template>
  <div class="overflow-x-hidden">
    <div id="home">
      <HeroSection />
    </div>
    <div id="skills">
      <SkilsSection />
    </div>
    <div id="about">
      <Experience />
    </div>
    <div id="education">
      <Education />
    </div>
    <div id="projects">
      <Project />
    </div>
    <div id="contact">
      <Contact />
    </div>
    <div class="mt-5">
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
  #home {
    background-image: radial-gradient(circle at 20% 30%, rgba(22, 163, 74, 0.05) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(22, 163, 74, 0.05) 0%, transparent 50%);
  }
</style>
