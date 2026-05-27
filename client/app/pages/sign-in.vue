<template>
  <div class="bg-base-200 flex min-h-screen flex-col items-center justify-center px-4 py-12">
    <div class="card bg-base-100 w-full max-w-md shadow-lg">
      <div class="card-body">
        <div class="mb-8 text-center">
          <h1 class="text-primary mb-2 text-2xl font-bold">Welcome Back</h1>
          <p class="text-base-content/90">Sign in to continue to <NuxtLink to="/" class="hover:underline">CareerTrack Dashboard</NuxtLink></p>
        </div>

        <form @submit.prevent="signIn">
          <div class="mb-4">
            <label for="email" class="label mb-1">
              <span class="text-base-content">Email</span>
            </label>
            <input id="email" v-model="email" type="email" class="input w-full" :class="{ 'border-red-500': isInvalid }" required />
          </div>

          <div class="mb-6">
            <label for="password" class="label mb-1">
              <span class="text-base-content">Password</span>
            </label>
            <div class="relative">
              <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" class="input w-full" :class="{ 'border-red-500': isInvalid }" required />
              <button type="button" class="text-base-content/60 hover:text-base-content absolute top-[10px] right-3 cursor-pointer" @click.prevent="showPassword = !showPassword">
                <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" />
              </button>
            </div>
          </div>

          <div class="mt-6">
            <button type="submit" class="btn btn-primary w-full" :disabled="loading">Sign In</button>
          </div>
        </form>

        <div class="divider my-6">OR</div>

        <div class="text-center">
          <p class="mb-4">Don't have an account yet?</p>
          <NuxtLink to="/sign-up" class="btn btn-outline btn-primary w-full">Create an Account</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   layout: "account",
// });

useSeoMeta({
  title: "CareerTrack Dashboard | Sign In",
  description: "Sign in to your CareerTrack Dashboard account",
});

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const loading = ref(false);
const isInvalid = ref(false);
const showPassword = ref(false);

const signIn = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      isInvalid.value = true;
      useToastify(error.message, {
        type: "error",
        position: "top-center",
      });
      console.error("Error signing in:", error.message);
      return;
    }

    if (data) {
      navigateTo("/confirm");
      isInvalid.value = false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
