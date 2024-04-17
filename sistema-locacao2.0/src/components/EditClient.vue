<template>
<div>
  <h1>Editar Cliente</h1>
  <form @submit.prevent="updateClient">
    <label for="name">Nome:</label>
    <input id="name" v-model="client.name" type="text" required>
    <label for="cpf">CPF:</label>
    <input id="cpf" v-model="client.cpf" type="text" required>
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
  const clientId = route.params.id;
  const client = ref(null);

  const getClient = async () => {
    const clientRef = doc(db, 'clients', clientId);
    const clientSnapshot = await getDoc(clientRef);
    client.value = clientSnapshot.data();
  };

  getClient();

  const updateClient = async () => {
    const clientRef = doc(db, 'clients', clientId);
    await updateDoc(clientRef, client.value);
    router.push('/clientes');
  };

  const cancel = () => {
    router.push('/clientes');
  };

  return { client, updateClient, cancel };
}
};
</script>