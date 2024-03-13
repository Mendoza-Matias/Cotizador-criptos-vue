//Colocar logica aqui , permitiendo la reutilización
import { ref, onMounted, computed } from 'vue';
export default function useCript() {
    const criptos = ref([]); //creo un estado que reciba la información
    const cotizacion = ref({});
    const cargando = ref(false)

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', texto: 'Peso Mexicano' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
        { codigo: 'ARG', texto: 'Peso Argentino' }
    ])


    //Realizo el llamado a la api
    onMounted(() => {
        fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
            .then(respuesta => respuesta.json())
            .then(data => {
                criptos.value = data.Data;
            })
    })


    const obtenerCotizacion = async (cotizar) => {
        cargando.value = true
        cotizacion.value = {}
        const { tipoMoneda, criptoMoneda } = cotizar;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${tipoMoneda}`
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        cotizacion.value = data.DISPLAY[criptoMoneda][tipoMoneda];

        cargando.value = false
    }


    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0;
    })

    return {
        monedas,
        criptos,
        cargando,
        cotizacion,
        obtenerCotizacion,
        mostrarResultado
    }
}

/*Crear la funcionalidad y despues ver que mover al composables */