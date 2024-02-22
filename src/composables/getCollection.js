import { ref, watchEffect } from "vue"
import { projectFirestore } from "../firebase/config"

const getCollection = (collection) => {
  const documents = ref(null)
  const error = ref(null)

  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

  // onspanshopt == real time listener
  const unsub = collectionRef.onSnapshot((snap) => {
      // console.log('snapshot');
    let results = []
    snap.docs.forEach(doc => {
      // check for the createdAt timestamp to make sure we are using db data vs local data
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
    })
    documents.value = results
    error.value = null
  }, (err) => {
    console.log(err.message)
    documents.value = null
    error.value = 'Could not fetch data'
  })

  watchEffect(onInvalidate => {
      // unsub from previouse collection when watcher is stopped (on unmount)
      onInvalidate(() => unsub())
  })

  return { error, documents }
}

export default getCollection