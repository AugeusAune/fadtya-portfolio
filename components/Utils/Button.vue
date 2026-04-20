<template>
  <div v-if="props.link">
    <a :href="props.link" target="_blank" :class="className">
      <Icon :name="props.icon" class="text-xl" /> {{ props.text }}
    </a>
  </div>
  <div v-else>
    <button type="button" :class="className">
      <Icon :name="props.icon" class="text-xl" /> {{ props.text }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  text: { type: String, required: true },
  type: { type: String, required: true },
  icon: { type: String, required: true },
  link: { type: String },
  isBlock: { type: Boolean },
});

let className;

switch (props.type) {
  case "slate":
    className =
      "text-gray-90 flex gap-2 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1  me-2 mb-2 text-white bg-slate-600";
    break;
  case "blue":
    className =
      "text-gray-90 flex gap-2 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1  me-2 mb-2 text-white bg-blue-800";
    break;
  case "skyblue":
    className =
      "text-gray-90 flex gap-2 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1  me-2 mb-2 text-white bg-sky-500";
    break;
  case "pink":
    className =
      "text-gray-90 flex gap-2 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1  me-2 mb-2 text-white bg-rose-500";
    break;
  case "black":
    className =
      "text-gray-90 flex gap-2 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1  me-2 mb-2 text-white bg-slate-950";
    break;
  case "indigo":
    className =
      "text-gray-90 flex gap-2 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1  me-2 mb-2 text-white bg-indigo-700";
    break;
  case "purple":
    className =
      "text-gray-90 flex gap-2 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1  me-2 mb-2 text-white bg-purple-800";
    break;
  default:
    className =
      "text-gray-90 flex gap-2 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1  me-2 mb-2 text-white bg-blue-600";
    break;
}

className += props.isBlock ? " w-full" : "";
</script>
