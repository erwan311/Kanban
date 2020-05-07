<template>
    <div id="card" class="card blue">
        <a class="btn-floating halfway-fab waves-effect waves-light red" @click="deleteCard">
            <span class="material-icons">
                delete_forever
            </span>
        </a>
        <div class="card-content black-text">
            <p>{{ title }}</p>
            <p>{{ priority }}</p>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Card',
        props: {
            id: Number,
            title: String,
            priority: String
        },
        methods: {
            deleteCard: function () { // Envoi un message pour supprimer la card
                this.$emit("deleteCard", this.id);
            }
        }
    }
</script>

<style>
    .btn-floating.halfway-fab {
        bottom: 5px !important;
        right: 5px !important;
        padding-top: 8px;
    }
</style>
