<template>
    <div id="app">
        <Form @newTache="newTache"></Form>

        <kanban-board :stages="stages" :blocks="blocks" ref="kanban" :config="config" @update-block="updateTache"
                      :state-machine-config="stateMachineConfig">
            <div v-for="stage in stages" :slot="stage" :key="stage">
                <h2>{{ stage }}</h2>
            </div>
            <div v-for="block in blocks" :slot="block.id" :key="block.id">
                <Card :title="block.title" :priority="block.priority" :id="block.id" @deleteCard="deleteCard"></Card>
            </div>
        </kanban-board>

        <Params @changeTri="updateAllTaches"></Params>

    </div>
</template>

<script>

    import Card from "./components/Card";
    import Form from "./components/Form";
    import Params from "./components/Params";
    import Airtable from 'airtable';

    // Configuration des déplacements entre les blocks
    const stateMachineConfig = {
        id: 'kanban',
        initial: 'on-hold',
        states: {
            'on-hold': {
                on: {
                    PICK_UP: 'in-progress',
                },
            },
            'in-progress': {
                on: {
                    RELINQUISH_TASK: 'on-hold',
                    PUSH_TO_QA: 'needs-review',
                },
            },
            'needs-review': {
                on: {
                    REQUEST_CHANGE: 'in-progress',
                    PASS_QA: 'approved',
                },
            },
            approved: {
                type: 'final',
            },
        },
    };

    export default {
        name: 'App',
        components: {Form, Card, Params},
        data() {
            return {
                stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
                blocks: [],
                stateMachineConfig,
                config: {
                    copy: false,
                    direction: 'vertical',
                },
            };
        },
        methods: { // Les différentes méthodes utilisées
            updateTache(id, status) {
                this.blocks.find(b => b.id === Number(id)).status = status;
                this.updateAllTaches();
            },
            newTache: function (title, priority) {
                this.blocks.push({
                    id: this.blocks.length + 1,
                    status: 'on-hold',
                    title: title,
                    priority: priority
                });
                this.updateAllTaches();
            },
            deleteCard: function (id) {
                this.blocks.splice(this.blocks.indexOf(this.blocks.find(b => b.id === Number(id))), 1);
            },
            updateAllTaches() { // Permet de trier l'ensemble des blocks
                let croissant = Params.getValueTrie();
                this.blocks.sort((a, b) => {
                    if (croissant) return this.priorityToInt(a.priority) - this.priorityToInt(b.priority);
                    else return this.priorityToInt(b.priority) - this.priorityToInt(a.priority);
                });
                let cpt = 1;
                this.blocks.map(item => item.id = cpt++);
            },
            priorityToInt: function (priority) { // Converti le nombre d'étoile de priorité en nombre
                return priority.length / 2;
            }
        },
        mounted() { // Inititalision, on insére les blocks en fonctions des taches dans la base de donnée
            let bdd = new Airtable({apiKey: 'keyS9trR1RqwnCn3i'}).base('appWC1vg7U7T65ofg');

            bdd('Table 1').select().firstPage().then(result => {
                result.forEach(item => {
                    this.newTache(item.fields.Name, item.fields.Priorité);
                });
            });
        }
    }
</script>

<style lang="scss">
    @import './assets/kanban.scss';
</style>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 20px;
    }

    .drag-item {
        height: auto;
        background-color: transparent;
        margin-top: 0px;
        margin-bottom: 0px;
    }
</style>
