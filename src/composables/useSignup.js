// import { projectAuth } from "@/firebase/config"
import { projectAuth } from "../firebase/config"
import { ref } from "vue"

const error = ref(null)

const signup = async (email, password, displayName) => {
  error.value = null

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Could not complete the signup @firebase')
    }
    await res.user.updateProfile({ displayName })
    error.value = null

    console.log(res.user)
    return res

  } catch (err) {
    error.value = err.message
    console.log('Failed with error code: ', err.message)
  }
}

const useSignup = () => {

  return { error, signup }

}

export default useSignup