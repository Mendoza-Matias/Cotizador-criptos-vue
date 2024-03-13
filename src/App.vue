<script setup>
import { ref, reactive} from 'vue'
import Alerta from './components/Alerta.vue'
import Spinner from './components/Spinner.vue'
import useCripto from './composables/useCripto'
import Cotizacion from './components/Cotizacion.vue'

const { monedas, criptos, cargando, cotizacion, obtenerCotizacion , mostrarResultado} = useCripto();

const cotizar = reactive({ //Quiero que la información vaya junta.
  tipoMoneda: '',
  criptoMoneda: ''
})
const error = ref('');


const cotizarCripto = () => {
  //Validar cotizar lleno
  if (Object.values(cotizar).includes) {
    error.value = "Todos los campos son obligatorios" //Si no estan llenos devuelve mi alerta
  }
  error.value = ''
  obtenerCotizacion(cotizar) //le paso la informacion al composable
}
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de<span>CriptoMonedas</span></h1>

    <div class="contenido">
      <Alerta v-if="error">{{ error }}</Alerta>
      <form class="formulario" v-on:submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select v-model="cotizar.tipoMoneda" id="moneda">
            <option> -- Selecciona -- </option>
            <option v-for="moneda in monedas" :value="moneda.codigo">
              {{ moneda.texto }}</option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto">Cripto Moneda:</label>
          <select v-model="cotizar.criptoMoneda" id="cripto">
            <option>-- Selecciona --</option>
            <option v-for="cripto in criptos" :value="cripto.CoinInfo.Name">
              {{ cripto.CoinInfo.FullName }}</option>
          </select>
        </div>

        <input type="submit" value="Cotizar">

      </form>
      <Spinner v-if="cargando" />
      <Cotizacion v-if="mostrarResultado" v-bind:cotizacion="cotizacion"/>
      
    </div>
  </div>
</template>
<style scoped></style>
