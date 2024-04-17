<template>
  <div>
    <h1>Adicionar Cliente</h1>
    <form @submit.prevent="addClient">
      <label for="name">Nome:</label>
      <input id="name" v-model="name" type="text" required />

      <label for="cpf">CPF:</label>
      <input id="cpf" v-model="cpf" type="text" required />

      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />

      <label for="phone">Telefone:</label>
      <input id="phone" v-model="phone" type="tel" required />

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
    const cpf = ref('');
    const email = ref('');
    const phone = ref('');

    const addClient = async () => {
      const clientCollection = collection(db, 'clients');

      // Adiciona um novo cliente
      await addDoc(clientCollection, {
        name: name.value,
        cpf: cpf.value,
        email: email.value,
        phone: phone.value,
      });

      // Redireciona após adicionar o cliente
      router.push('/clientes');
    };

    const cancel = () => {
      router.push('/clientes');
    };

    return { name, cpf, email, phone, addClient, cancel };
  },
};
</script>
