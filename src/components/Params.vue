<template>
    <div>
        <div class="fixed-action-btn direction-top">
            <a id="menu" class="waves-effect waves-light btn btn-floating btn-large red" @click="clickButton">
                <span class="material-icons">
                build
                </span>
            </a>
        </div>

        <div class="tap-target blue" data-target="menu">
            <div class="tap-target-content black-text">
                <p>Trie priorité : croisant / décroissant</p>
                <div class="switch">
                    <label class="black-text">
                        Off
                        <input id="triPropriete" type="checkbox" @click="changeTri" checked>
                        <span class="lever"></span>
                        On
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import M from 'materialize-css';

    let instanceTap;

    export default {
        name: "Params",
        methods: {
            changeTri: function () { // Permet de change l'ordre de tri (croissant / décroissant)
                this.$emit("changeTri");
            },
            clickButton: function () {
                instanceTap.open();
            }
        },
        getValueTrie: function () {
            return !document.querySelector("#triPropriete").checked;
        },
        mounted() { // Initialisation du composant FeatureDiscovery
            M.AutoInit();
            instanceTap = M.TapTarget.init(document.querySelector(".tap-target"), {});
        }
    }
</script>

<style scoped>
    .material-icons {
        margin-top: 16px;
    }

    .switch label input[type=checkbox]:checked + .lever {
        background-color: red;
    }

    .switch label input[type=checkbox]:checked + .lever:after {
        background-color: red;
    }
</style>
