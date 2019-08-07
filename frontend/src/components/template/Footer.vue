<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>

<template>
    <footer class="footer">
        <span>Copyright <strong>Julliano</strong> © 2014-2019 </span>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>