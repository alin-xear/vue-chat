<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div
        v-for="doc in formattedDocuments"
        :key="doc.id"
        class="single"
        :class="{ ownMessage: username == doc.name }"
      >
        <div class="innerMessage">
          <span class="created-at">{{ doc.createdAt }}</span>
          <span class="name">{{ doc.name }}:</span>
          <span class="message">{{ doc.message }}</span>
        </div>
      </div>
    </div>
    <div v-else>No documents</div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "vue";

export default {
  props: ["username"],
  setup(props) {
    const { documents, error } = getCollection("messages");
    const username = props["username"];

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        });
      }
    });

    const messages = ref("");

    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
    });

    return { error, documents, formattedDocuments, messages, username };
  },
};
</script>

<style>
.chat-window {
  background-color: #fafafa;
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
}
.single.ownMessage {
  margin-right: 15px;
  text-align: right;
  background-clip: #f4f4f4;
}
.innerMessage {
  display: inline-block;
  background-color: #eee;
  padding: 10px 20px;
  border-radius: 10px;
}
.ownMessage .innerMessage {
  background-color: #5ae4ca;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  height: 600px;
  overflow: auto;
  scrollbar-color: grey #5ae4ca;
  scrollbar-width: thin;
}

/* width */
.messages::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.messages::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px grey;
  border-radius: 10px;
}

/* Handle */
.messages::-webkit-scrollbar-thumb {
  background: #5ae4ca;
  border-radius: 10px;
}

@media (max-width: 900px) {
  .messages {
    height: calc(100vh - 290px);
  }

  .single {
    margin: 18px 15px 18px 0;
  }
}
</style>