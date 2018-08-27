<template>
    <Page class="page">
        <ActionBar title="Invoise Mag" class="action-bar"/>
        <ScrollView>
            <StackLayout class="home-panel" style="height:100%">
                <ListView class="list-group" for="mag in mags" @itemTap="onItemTap">
                    <v-template>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Image :src="mag.cover" class="thumb img-thumbnail"/>
                            <Label :text="mag.title" class="list-group-item-heading" style="width: 60%"/>
                            <Label :text="mag.short_desc" class="list-group-item-heading" style="width: 60%"/>
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import MagPage from './MagPage'
    import axios from 'axios'

    export default {
        data() {
            return {
                mags: [],
            }
        },
        mounted() {

            axios.get('http://apps.ekhlusov.ru/invoice_mags.json')
                .then(response => {
                    console.log(response.data);
                    this.mags = response.data
                })
        },

        methods: {
            onItemTap: function (args) {
                console.log('Item with index: ' + args.item.title + ' tapped');
                this.$navigateTo(MagPage, {
                    context: {
                        propsData: {
                            data: args.item
                        }
                    }
                })

            },
        },
    }
</script>
