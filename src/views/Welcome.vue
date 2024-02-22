<template>
  <div class="welcome container">
    <p>Welcome</p>
    <div v-if="showLogin" class="animate">
      <h2>Login</h2>
      <LoginForm @login='enterChat' />
      <p>
        No account yet? <span @click="showLogin = false">Signup</span> instead
      </p>
    </div>
    <div v-else class="animate">
      <h2>Sign up</h2>
      <SignupForm @signup='enterChat' />
      <p>
        Already have an account?
        <span @click="showLogin = true">Log in</span> instead
      </p>
    </div>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true);
    const router = useRouter()

    const enterChat = () => {
      router.push({ name: 'Chatroom' })
    }

    return { showLogin, enterChat };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}
/* form styles */
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome span {
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
}

.welcome button {
  margin: 20px auto;
}

.animate {
  animation: bounceIn .5s ease; 
}

@keyframes hithere {
  30% { transform: scale(1.2); }
  40%, 60% { transform: rotate(-20deg) scale(1.2); }
  50% { transform: rotate(20deg) scale(1.2); }
  70% { transform: rotate(0deg) scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes bounceIn {
  from, to { transform: scale(1, 1); }
  25% { transform: scale(0.9, 1); }
  50% { transform: scale(1, 0.9); }
  75% { transform: scale(0.95, 1.05); }
}

</style>