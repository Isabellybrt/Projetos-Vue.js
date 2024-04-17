<template>
  <div>
    <h1>Clientes</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>CPF</th>
        <th>email</th>
        <th>phone</th>
      </tr>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.id }}</td>
        <td>{{ client.name }}</td>
        <td>{{ client.cpf }}</td>
        <td>{{ client.email }}</td>
        <td>{{ client.phone }}</td>
        <td><button @click="editClient(client.id)">Editar</button></td>
        <td><button @click="deleteClient(client.id)">Excluir</button></td>
      </tr>
    </table>
    <button @click="addClient">Adicionar Cliente</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const db = getFirestore();
    const router = useRouter();
    const clients = ref([]);

    const getClients = async () => {
      const clientCollection = collection(db, 'clients');
      const clientSnapshot = await getDocs(clientCollection);
      clients.value = clientSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    getClients();

    const addClient = () => {
      router.push('/clientes/add');
    };

    const editClient = (id) => {
      router.push(`/clientes/edit/${id}`);
    };

    const deleteClient = async (id) => {
      await deleteDoc(doc(db, 'clients', id));
      getClients();
    };

    return { clients, addClient, editClient, deleteClient };
  },
};
</script>
