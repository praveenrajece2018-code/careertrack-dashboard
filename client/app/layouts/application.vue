<template>
  <div>
    <ApplicationNavBar @sign-out="handleSignOutModal" />
    <section class="px-4 py-8 sm:px-6">
      <slot />
    </section>

    <!-- Sign out modal -->
    <dialog ref="signOutModal" class="modal">
      <div class="modal-box">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Sign Out <Icon name="ph:sign-out" size="24" /></h3>
        <p>Are you sure you want to sign out?</p>
        <div class="modal-action">
          <form method="dialog" class="space-x-2">
            <button class="btn">Cancel</button>
            <button class="btn btn-primary" @click="handleSignOut">Sign Out</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const signOutModal = ref(null as HTMLDialogElement | null);

const handleSignOutModal = () => {
  signOutModal.value?.showModal();
};

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    signOutModal.value?.close();
    navigateTo("/sign-in");
  }
};
</script>
