<template>
  <div>
    <el-row class="flex justify-center items-center p-10">
      <el-col :lg="10" :md="24" :sm="24">
        <h1
          class="text-white font-bold lg:text-[3rem] md:text-[2rem] text-[2rem] mt-6"
        >
          Farhan Aditya
        </h1>
        <h1
          class="text-green-500 font-bold lg:text-[3rem] md:text-[2rem] text-[2rem]"
        >
          Full Stack Developer
        </h1>
        <p
          class="text-sm lg:w-[80%] md:w-[80%] w-[90%] text-[#9fa8b7] italic mt-2"
        >
          "Hello my name is Farhan Aditya, usually called farhan whatever lmao,
          I am a Full Stack Web Developer, with 4 years of developing web
          applications, I like coding not because of the money, but solving
          problems is an art for me"
        </p>
        <div class="flex mt-5">
          <button
            type="button"
            class="focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800"
          >
            <Icon name="tabler:rocket" class="text-xl" /> Download CV
          </button>
          <button
            type="button"
            class="text-gray-90 focus:outline-none border focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
          >
            <Icon name="fa6-brands:get-pocket" class="text-xl" /> Hire Me
          </button>
        </div>
      </el-col>
      <el-col :lg="8" :md="24" :sm="24" class="mt-8">
        <div
          class="text-white w-full bg-[#0f172a] text-end p-3 px-4 border-b mt-3"
        >
          <div class="flex justify-between">
            <div>
              <Icon name="logos:javascript" class="text-yellow-200" />
              profile.js
            </div>
            <div class="flex gap-2">
              <div
                class="bg-red-500 rounded-full w-4 h-4 mt-1 drop-shadow-lg"
              ></div>
              <div
                class="bg-yellow-500 rounded-full w-4 h-4 mt-1 drop-shadow-lg"
              ></div>
              <div
                class="bg-green-500 rounded-full w-4 h-4 mt-1 drop-shadow-lg"
              ></div>
            </div>
          </div>
        </div>
        <div>
          <highlightjs language="js" :code="code" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
  const birthDate = new Date('2003-10-21');
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  const code = `// Coded By Farhan Aditya
// No hugs and kissed, just project and coded
const identity = {
  name: "Farhan Aditya",
  age: "${age}",
  position: "Full Stack Developer",
  programming_languange: ['Javascript', 'PHP', 'Golang'],
  framework: ['Elysia JS', 'Laravel', 'Vue JS', 'Nuxt JS'],
  born: "Jakarta, 21 Oct 2003",
  developing_website_experience: "2 + Years",
}
class Happiness {
  stress = null;
  love = 99999;
  gratitude = 99999;
}
`;
</script>
<style scoped>
  .text-shadow {
    text-shadow: 1px 2px black;
  }

  .hero {
    background-image: url('https://cpwebassets.codepen.io/assets/packs/lines-3-4541e35a1939230404d773f7eeddcc9b.svg');
    background-position-x: 3em;
    background-position-y: -1em;
    background-repeat: no-repeat;
  }
</style>
