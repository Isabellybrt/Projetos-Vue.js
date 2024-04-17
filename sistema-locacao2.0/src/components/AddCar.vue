<template>
  <div>
    <h1>Adicionar Carro</h1>
    <form @submit.prevent="addCar">
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
      <input id="plate" v-model="car.plate" type="text" required />

      <label for="color">Cor:</label>
      <input id="color" v-model="car.color" type="text" required />

      <label for="year">Ano:</label>
      <input id="year" v-model="car.year" type="number" required />

      <label for="dailyRate">Valor Diário do Aluguel:</label>
      <input id="dailyRate" v-model="car.dailyRate" type="number" required />

      <button type="submit">Adicionar</button>
    </form>
    <button @click="cancel">Cancelar</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const db = getFirestore();
    const router = useRouter();
    const brands = ref([]);
    const models = ref([]);
    const car = ref({ plate: '', brand: '', model: '' });

    const getBrands = async () => {
      const brandCollection = collection(db, 'brands');
      const brandSnapshot = await getDocs(brandCollection);
      brands.value = brandSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    const getModels = async () => {
      const modelCollection = collection(db, 'models');
      const modelSnapshot = await getDocs(modelCollection);
      models.value = modelSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    getBrands();
    getModels();

    const addCar = async () => {
      const carCollection = collection(db, 'cars');
      const carSnapshot = await getDocs(carCollection);
      const existingCars = carSnapshot.docs.map((doc) => doc.data());
      try {
        // Adiciona o novo carro à coleção "cars"
        await addDoc(carCollection, car.value);

        // Redireciona para a página de lista de carros após a adição bem-sucedida
        router.push('/carros');
      } catch (error) {
        console.error('Erro ao adicionar carro:', error.message);
        // Manipule o erro, por exemplo, exiba uma mensagem de erro ao usuário
      }
    };

    const cancel = () => {
      router.push('/carros');
    };

    return { car, brands, models, addCar, cancel };
  },
};
</script>
