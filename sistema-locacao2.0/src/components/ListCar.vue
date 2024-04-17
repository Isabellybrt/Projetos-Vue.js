<template>
  <div>
    <h1>Carros</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Placa</th>
        <th>Cor</th>
        <th>Ano</th>
        <th>Valor Diário</th>
      </tr>
      <tr v-for="car in cars" :key="car.id">
        <td>{{ car.id }}</td>
        <td>{{ car.brand }}</td>
        <td>{{ car.model }}</td>
        <td>{{ car.plate }}</td>
        <td>{{ car.color }}</td>
        <td>{{ car.year }}</td>
        <td>{{ car.dailyRate }}</td>
        <td><button @click="editCar(car.id)">Editar</button></td>
        <td><button @click="deleteCar(car.id)">Excluir</button></td>
      </tr>
    </table>
    <button @click="addCar">Adicionar Carro</button>
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
    const cars = ref([]);
    const brands = ref([]);
    const models = ref([]);

    const getBrands = async () => {
      const brandCollection = collection(db, 'brands');
      const brandSnapshot = await getDocs(brandCollection);
      return brandSnapshot.docs.reduce(
        (acc, doc) => ({ ...acc, [doc.id]: doc.data().name }),
        {}
      );
    };

    const getModels = async () => {
      const modelCollection = collection(db, 'models');
      const modelSnapshot = await getDocs(modelCollection);
      return modelSnapshot.docs.reduce(
        (acc, doc) => ({ ...acc, [doc.id]: doc.data().name }),
        {}
      );
    };

    const getCars = async () => {
      const brandsMap = await getBrands();
      const modelsMap = await getModels();

      const carCollection = collection(db, 'cars');
      const carSnapshot = await getDocs(carCollection);
      cars.value = carSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          brand: brandsMap[data.brand] || data.brand,
          model: modelsMap[data.model] || data.model,
          plate: data.plate,
          color: data.color,
          year: data.year,
          dailyRate: data.dailyRate,
        };
      });
    };

    getCars();

    const addCar = () => {
      router.push('/carros/add');
    };

    const editCar = (id) => {
      router.push(`/carros/edit/${id}`);
    };

    const deleteCar = async (id) => {
      await deleteDoc(doc(db, 'cars', id));
      getCars();
    };

    return { cars, brands, models, addCar, editCar, deleteCar };
  },
};
</script>

<style></style>
