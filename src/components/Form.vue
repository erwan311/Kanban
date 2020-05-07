<template>
    <div id="form">
        <h5>Erwan Bouvron - Kuartz</h5>
        <div id="header">
            <div class="div_title">
                <label for="title">Title</label>
                <input v-model="title" type="text" id="title" placeholder="Titre de la tache" v-on:input="updateTitle">
            </div>
            <div class="div_priority">
                <label for="priority">Priorité</label>
                <input v-model="priority" type="range" id="priority" min="1" max="5" value="3"
                       v-on:input="updateSlider" class="spinner-red"/>
                <p id="res_slider">⭐️⭐️⭐️</p>
            </div>
            <a class="waves-effect waves-light btn red disabled" @click="sumbitForm" id="submit">Ajouter</a>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Form",
        data: function () {
            return {
                title: "",
                priority: 3
            }
        },
        methods: {
            sumbitForm: function (e) { // Methode pour envoyer la nouvelle tache à App.vue
                if (this.title.length > 0) { // La tache doit avoir un titre non vide
                    this.$emit("newTache", this.title, this.priorityToString(this.priority));
                    this.title = ""; // On remet à vide le titre pour la prochaine tache, et on désactive le bouton ajouter
                    document.querySelector("#submit").classList.add("disabled");
                }

                e.preventDefault();
            },
            priorityToString: function (priority) { // Converti le nombre en étoile
                let str = "";
                for (let i = 0; i < priority; i++) {
                    str += "⭐️";
                }
                return str;
            },
            updateSlider: function () {
                document.querySelector("#res_slider").innerText = this.priorityToString(this.priority);
            },
            updateTitle: function () {
                if (document.querySelector("#title").value.length === 0) {
                    if (!document.querySelector("#submit").classList.contains("disabled")) document.querySelector("#submit").classList.add("disabled");
                } else {
                    if (document.querySelector("#submit").classList.contains("disabled")) document.querySelector("#submit").classList.remove("disabled");
                }
            }
        }
    }
</script>

<style scoped>

    #header {
        display: flex;
        width: 50%;
        height: 60px;
        margin: auto auto 50px;
    }

    #header > * {
        margin-left: 10px;
        margin-right: 10px;
        width: 60%;
    }

    #title {
        width: 60%;
        margin-left: 15px;
        border-bottom-color: red;
    }

    #title:focus {
        box-shadow: 0 1px 0 0 red;
    }

    #priority {
        width: 30%;
        margin-left: 15px;
        background-color: red;
    }

    input[type=range]::-webkit-slider-thumb {
        background-color: red;
    }
    input[type=range]::-moz-range-thumb {
        background-color: red;
    }
    input[type=range]::-ms-thumb {
        background-color: red;
    }

    #res_slider {
        min-width: 102px;
    }

    #submit {
        width: 140px;
    }
</style>
