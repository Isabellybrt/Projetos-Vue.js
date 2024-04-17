<template>
<div>
  <h1>Editar Modelo</h1>
  <form @submit.prevent="updateModel">
    <label for="name">Nome:</label>
    <input id="name" v-model="model.name" type="text" required>
    <button type="submit">Salvar</button>
  </form>
  <button @click="cancel">Cancelar</button>
</div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter, useRoute } from 'vue-router';

export default {
setup() {
  const db = getFirestore();
  const router = useRouter();
  const route = useRoute();
  const modelId = route.params.id;
  const model = ref(null);

  const getModel = async () => {
    const modelRef = doc(db, 'models', modelId);
    const modelSnapshot = await getDoc(modelRef);
    model.value = modelSnapshot.data();
  };

  getModel();

  const updateModel = async () => {
    const modelRef = doc(db, 'models', modelId);
    await updateDoc(modelRef, model.value);
    router.push('/modelos');
  };

  const cancel = () => {
    router.push('/modelos');
  };

  return { model, updateModel, cancel };
}
};
</script>