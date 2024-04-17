<template>
<div>
  <h1>Editar Carro</h1>
  <form @submit.prevent="updateCar">
    <label for="brand">Marca:</label>
    <select id="brand" v-model="car.brand">
      <option v-for="brand in brands" :key="brand.id" :value="brand.id">
        {{ brand.name }}
      </option>
    </select>

    <label for="model">Modelo:</label>
        <select id="model" v-model="car.model">
        <option v-for="model in models" :key="model.id" :value="model.id">
          {{ model.name }}
        </option>
      </select>

    <label for="plate">Placa:</label>
    <input id="plate" v-model="car.plate" type="text" required>

    <label for="color">Cor:</label>
    <input id="color" v-model="car.color" type="text" required>

    <label for="year">Ano:</label>
    <input id="year" v-model="car.year" type="number" required>

    <label for="dailyRate">Valor Diário:</label>
    <input id="dailyRate" v-model="car.dailyRate" type="number" required>

    <button type="submit">Salvar</button>
  </form>
  <button @click="cancel">Cancelar</button>
</div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, collection, doc, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const db = getFirestore();
    const router = useRouter();
    const route = useRoute();
    const carId = route.params.id;
    const car = ref(null);
    const brands = ref([]);
    const models = ref([]);

    const getBrands = async () => {
      const brandCollection = collection(db, 'brands');
      const brandSnapshot = await getDocs(brandCollection);
      brands.value = brandSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const getModels = async () => {
      const modelCollection = collection(db, 'models');
      const modelSnapshot = await getDocs(modelCollection);
      models.value = modelSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    getBrands();
    getModels();

    const getCar = async () => {
      const carRef = doc(db, 'cars', carId);
      const carSnapshot = await getDoc(carRef);
      car.value = carSnapshot.data();
    };

    getCar();

    const updateCar = async () => {
      const carRef = doc(db, 'cars', carId);
      await updateDoc(carRef, car.value);
      router.push('/carros');
    };

    const cancel = () => {
      router.push('/carros');
    };

    return { car, brands, models, updateCar, cancel };
  }
};
</script>