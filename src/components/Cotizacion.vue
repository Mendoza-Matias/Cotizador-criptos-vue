<script setup>
const props = defineProps(['cotizacion'])
</script>
<template>
    <div class="contenedor-resultado">
        <h2>Cotización</h2>

        <div class="resultado">
            <img :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL" alt="">
            <div>
                <p>El precio es de : <span>{{ props.cotizacion.PRICE }}</span></p>
                <p>Precio mas alto del dia : <span>{{ props.cotizacion.HIGHDAY }}</span></p>
                <p>Precio mas bajo del dia : <span>{{ props.cotizacion.LOWDAY }}</span></p>
                <p>Variación ultimas 24hs : <span> - {{ props.cotizacion.CHANGEPCT24HOUR }}%</span></p>
                <p>Ultima actualización : <span>{{ props.cotizacion.LASTUPDATE }}</span></p>
            </div>
        </div>
    </div>
</template>

<style></style>