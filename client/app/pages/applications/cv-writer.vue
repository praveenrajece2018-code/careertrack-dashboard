<template>
  <section>
    <h1 class="pb-4 text-2xl font-bold sm:pb-0">CV Writer Assistant</h1>
    <article class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <h2 class="pb-2 font-medium">Job Description</h2>
        <textarea v-model="jobDescription" class="textarea w-full" :class="{ 'border-red-500': isInvalid }" rows="10" placeholder="Paste here the specific job description" />
      </div>
      <div>
        <h2 class="pb-2 font-medium">What would you like to highlight about yourself?</h2>
        <textarea
          v-model="highlights"
          class="textarea w-full"
          :class="{ 'border-red-500': isInvalid }"
          rows="10"
          placeholder="Briefly describe standout qualities, achievements, or experiences that reflect your strengths — e.g., leadership roles, certifications, unique skills, or impactful projects."
        />
      </div>
    </article>

    <h3 class="pt-8 pb-4 text-center font-medium">Select the CV length</h3>
    <div class="flex justify-center gap-8">
      <label class="flex cursor-pointer items-center gap-2">
        <input v-model="cvLength" type="radio" name="cvLength" value="short" class="radio radio-sm" />
        <span>Short</span>
      </label>
      <label class="flex cursor-pointer items-center gap-2">
        <input v-model="cvLength" type="radio" name="cvLength" value="standard" class="radio radio-sm" />
        <span>Standard</span>
      </label>
      <label class="flex cursor-pointer items-center gap-2">
        <input v-model="cvLength" type="radio" name="cvLength" value="long" class="radio radio-sm" />
        <span>Long</span>
      </label>
    </div>

    <div class="pt-6 text-center">
      <button class="btn btn-primary" :disabled="loading" @click="generateCV">
        <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
        {{ loading ? "Generating..." : "Generate CV" }}
      </button>
    </div>

    <div v-if="generatedCV" class="mt-8">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <article class="prose prose-lg w-full max-w-none break-words">
            <div v-html="renderedCV"></div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { marked } from "marked";

// definePageMeta({
//   layout: "application",
//   middleware: "auth",
// });

useSeoMeta({
  title: "JobNest | CV Writer",
  description: "Generate a CV with the help of our assistant",
});

const jobDescription = ref("");
const highlights = ref("");
const cvLength = ref("standard");
const loading = ref(false);
const generatedCV = ref("");
const isInvalid = ref(false);
const renderedCV = computed(() => {
  let text = generatedCV.value.trim();
  if (text.startsWith("```") && text.endsWith("```")) {
    text = text.slice(3, -3).trim();
  }
  return marked(text);
});

const generateCV = async () => {
  if (!jobDescription.value || !highlights.value) {
    isInvalid.value = true;
    useToastify("Please fill in all fields", { type: "error" });
    return;
  }

  try {
    loading.value = true;
    isInvalid.value = false;
    const { data, error } = await useFetch("/api/generate-cv", {
      method: "POST",
      body: {
        jobDescription: jobDescription.value,
        highlights: highlights.value,
        length: cvLength.value,
      },
    });

    if (error.value) {
      const msg =
        error.value.data?.message || (error.value.statusCode === 429 ? "Too many requests. Please wait a minute and try again." : "Failed to generate CV. Please try again.");
      useToastify(msg, { type: "error" });
      return;
    }
    if (data.value) {
      generatedCV.value = data.value.cv;
    }
  } catch (err) {
    useToastify("Failed to generate CV. Please try again.", { type: "error" });
    console.error("Error:", err);
  } finally {
    isInvalid.value = false;
    loading.value = false;
  }
};
</script>

<style scoped></style>
