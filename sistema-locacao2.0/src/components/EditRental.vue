<template>
  <div>
    <h1>Editar Locação</h1>
    <form @submit.prevent="updateRental">
      <label for="client">Cliente:</label>
      <select id="client" v-model="rental.client">
        <option v-for="client in clients" :key="client.id" :value="client.id">
          {{ client.name }}
        </option>
      </select>

      <label for="car">Carro:</label>
      <select id="car" v-model="rental.car">
        <option v-for="car in cars" :key="car.id" :value="car.id">
          {{ car.plate }}
        </option>
      </select>

      <label for="startDate">Data de Início:</label>
      <input id="startDate" v-model="rental.startDate" type="date" required />

      <label for="endDate">Data de Fim:</label>
      <input id="endDate" v-model="rental.endDate" type="date" required />

      <label for="totalValue">Total</label>
      <input
        id="totalValue"
        v-model="rental.totalValue"
        type="float"
        required
      />

      <button type="submit">Salvar</button>
    </form>
    <button @click="cancel">Cancelar</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const db = getFirestore();
    const router = useRouter();
    const route = useRoute();
    const rentalId = route.params.id;
    const rental = ref(null);
    const clients = ref([]);
    const cars = ref([]);

    const getClients = async () => {
      const clientCollection = collection(db, 'clients');
      const clientSnapshot = await getDocs(clientCollection);
      clients.value = clientSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    const getCars = async () => {
      const carCollection = collection(db, 'cars');
      const carSnapshot = await getDocs(carCollection);
      cars.value = carSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    getClients();
    getCars();

    const getRental = async () => {
      const rentalRef = doc(db, 'rentals', rentalId);
      const rentalSnapshot = await getDoc(rentalRef);
      rental.value = rentalSnapshot.data();
    };

    getRental();

    const updateRental = async () => {
      const rentalRef = doc(db, 'rentals', rentalId);
      await updateDoc(rentalRef, rental.value);
      router.push('/locacoes');
    };

    const cancel = () => {
      router.push('/locacoes');
    };

    return { rental, clients, cars, updateRental, cancel };
  },
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
