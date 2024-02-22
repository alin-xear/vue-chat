<template>
  <div class="container">
    <Navbar />
    <!-- chat window RTS -->
    <ChatWindow :username="user.displayName" />
    <NewChatForm />
  </div>
</template>

<script>
import NewChatForm from "../components/NewChatForm.vue";
import ChatWindow from "../components/ChatWindow.vue";
import getUser from "@/composables/getUser";
import Navbar from "../components/Navbar.vue";
import { useRouter } from "vue-router";
import { watch, watchEffect } from "vue";

export default {
  components: { Navbar, NewChatForm, ChatWindow },
  setup() {
    const { user } = getUser(); // this is a ref..
    const router = useRouter();

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
      }
    })

    return { user };
  },
};
</script>

<style>
</style>