<template>
<div>
  <h1>Adicionar Modelo</h1>
  <form @submit.prevent="addModel">
    <label for="name">Nome:</label>
    <input id="name" v-model="name" type="text" required>
    <button type="submit">Adicionar</button>
  </form>
  <button @click="cancel">Cancelar</button>
</div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export default {
setup() {
  const db = getFirestore();
  const router = useRouter();
  const name = ref('');

  const addModel = async () => {
    const modelCollection = collection(db, 'models');
    await addDoc(modelCollection, { name: name.value });
    router.push('/modelos');
  };

  const cancel = () => {
    router.push('/modelos');
  };

  return { name, addModel, cancel };
}
};
</script>