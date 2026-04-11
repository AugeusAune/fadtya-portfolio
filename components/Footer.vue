<template>
  <div>
    <footer class="rounded-lg shadow text-center">
      <div
        class="w-full mx-auto max-w-screen-xl p-4 justify-center"
      >
        <span class="text-sm text-white text-center"
          >© {{ year }}
          <a href="https://flowbite.com/" class="hover:underline">Farhan Aditya</a>.
          All Rights Reserved.
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup>
let date = new Date();
let year = date.getFullYear();
</script>

<style lang="scss" scoped></style>
