<template>
  <div>
    <h1>Adicionar Locação</h1>
    <form @submit.prevent="addRental">
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

      <!-- Exibir o valor total calculado -->
      <p>Total a Pagar: R$ {{ calculatedTotalValue.toFixed(2) }}</p>

      <button type="submit">Adicionar</button>
    </form>
    <button @click="cancel">Cancelar</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const db = getFirestore();
    const router = useRouter();
    const clients = ref([]);
    const cars = ref([]);
    const rental = ref({ client: '', car: '', startDate: '', endDate: '' });

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

    // Propriedade computada para calcular o valor total com base na taxa diária e no número de dias
    const calculatedTotalValue = computed(() => {
      const selectedCar = cars.value.find((car) => car.id === rental.value.car);
      if (selectedCar) {
        const startDate = new Date(rental.value.startDate);
        const endDate = new Date(rental.value.endDate);
        const numberOfDays = Math.ceil(
          (endDate - startDate) / (1000 * 60 * 60 * 24)
        );
        return selectedCar.dailyRate * numberOfDays;
      }
      return 0;
    });

    const addRental = async () => {
      const rentalCollection = collection(db, 'rentals');
      await addDoc(rentalCollection, {
        client: rental.value.client,
        car: rental.value.car,
        startDate: rental.value.startDate,
        endDate: rental.value.endDate,
        totalValue: calculatedTotalValue.value, // Usar o valor calculado aqui
      });
      router.push('/locacoes');
    };

    const cancel = () => {
      router.push('/locacoes');
    };

    return { rental, clients, cars, addRental, cancel, calculatedTotalValue };
  },
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
