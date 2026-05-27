<template>
  <div class="bg-base-200 flex min-h-screen items-center justify-center px-4 py-12">
    <div class="card bg-base-100 w-full max-w-md shadow-lg">
      <div class="card-body">
        <div class="mb-8 text-center">
          <h1 class="text-primary mb-2 text-2xl font-bold">Create an account</h1>
          <p class="text-base-content/90">Sign up to continue to <NuxtLink to="/" class="hover:underline">CareerTrack Dashboard</NuxtLink></p>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="name" class="label mb-1">
              <span class="text-base-content">Name</span>
            </label>
            <input id="name" v-model="name" type="text" class="input w-full" required />
          </div>

          <div class="mb-4">
            <label for="email" class="label mb-1">
              <span class="text-base-content">Email</span>
            </label>
            <input id="email" v-model="email" type="email" class="input w-full" required />
          </div>

          <div class="mb-6">
            <label for="password" class="label mb-1">
              <span class="text-base-content">Password</span>
            </label>
            <div class="relative">
              <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" class="input w-full" minlength="8" required />
              <button type="button" class="text-base-content/60 hover:text-base-content absolute top-[10px] right-3 cursor-pointer" @click.prevent="showPassword = !showPassword">
                <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" />
              </button>
            </div>
          </div>

          <div class="mt-6">
            <button type="submit" class="btn btn-primary w-full" :disabled="loading">Create your account</button>
          </div>
        </form>

        <div class="divider my-6">OR</div>

        <div class="text-center">
          <p class="mb-4">Already have an account?</p>
          <NuxtLink to="/sign-in" class="btn btn-outline btn-primary w-full">Sign In</NuxtLink>
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
  title: "CareerTrack Dashboard | Sign Up",
  description: "Create your CareerTrack Dashboard account",
});

const supabase = useSupabaseClient();
const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);

const handleRegister = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: `${window.location.origin}/confirm`,
        data: {
          name: name.value,
        },
      },
    });

    if (error) {
      console.error("Error during registration:", error.message);
      return;
    }

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      useToastify("User already exists. Please sign in.", {
        type: "error",
        position: "top-center",
      });
      name.value = "";
      email.value = "";
      password.value = "";
    } else if (data) {
      useToastify("Registration successful! A confirmation link has been sent to your email address.", {
        type: "success",
        position: "top-center",
      });
      name.value = "";
      email.value = "";
      password.value = "";
    }
  } catch (error) {
    console.error("Error during registration:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
