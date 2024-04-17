<template>
  <div>
    <h1>Locações</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Cliente</th>
        <th>Carro</th>
        <th>Data de Início</th>
        <th>Data de Fim</th>
        <th>Valor Total</th>
      </tr>
      <tr v-for="rental in rentals" :key="rental.id">
        <td>{{ rental.id }}</td>
        <!-- Mostrar o nome do cliente em vez do ID -->
        <td>{{ clients[rental.client] }}</td>
        <!-- Mostrar o nome do carro em vez do ID -->
        <td>{{ cars[rental.car] }}</td>
        <td>{{ rental.startDate }}</td>
        <td>{{ rental.endDate }}</td>
        <td>{{ rental.totalValue }}</td>
        <td><button @click="editRental(rental.id)">Editar</button></td>
        <td><button @click="deleteRental(rental.id)">Excluir</button></td>
      </tr>
    </table>

    <button @click="addRental">Adicionar Locação</button>
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
    const rentals = ref([]);
    const clients = ref({});
    const cars = ref({});

    const getClients = async () => {
      const clientCollection = collection(db, 'clients');
      const clientSnapshot = await getDocs(clientCollection);
      return clientSnapshot.docs.reduce(
        (acc, doc) => ({ ...acc, [doc.id]: doc.data().name }),
        {}
      );
    };

    const getCars = async () => {
      const carCollection = collection(db, 'cars');
      const carSnapshot = await getDocs(carCollection);
      return carSnapshot.docs.reduce(
        (acc, doc) => ({ ...acc, [doc.id]: doc.data().plate }),
        {}
      );
    };

    const getRentals = async () => {
      clients.value = await getClients();
      cars.value = await getCars();

      const rentalCollection = collection(db, 'rentals');
      const rentalSnapshot = await getDocs(rentalCollection);
      rentals.value = rentalSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          client: data.client,
          car: data.car,
          startDate: data.startDate,
          endDate: data.endDate,
          totalValue: data.totalValue,
        };
      });
    };

    getRentals();

    const addRental = () => {
      router.push('/locacoes/add');
    };

    const editRental = (id) => {
      router.push(`/locacoes/edit/${id}`);
    };

    const deleteRental = async (id) => {
      await deleteDoc(doc(db, 'rentals', id));
      getRentals();
    };

    return { rentals, addRental, editRental, deleteRental, clients, cars };
  },
};
</script>
