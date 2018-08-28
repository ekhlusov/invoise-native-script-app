<template>
    <Page class="page">
        <ActionBar title="Invoise Magazine" class="action-bar">
            <FlexboxLayout flexDirection="column"
                         ios:horizontalAlignment="center"
                         android:horizontalAlignment="center">
                <Image src="~/images/invoise_ab_logo.png" class="action-image" stretch="none"/>
            </FlexboxLayout>
        </ActionBar>
        <ScrollView>
            <StackLayout class="home-panel" style="height:100%; width:100%;" verticalAlignment="stretch">
                <PullToRefresh @refresh="refreshList">
                    <ListView class="list-group" for="mag in mags" @itemTap="onItemTap">
                        <v-template>
                            <FlexboxLayout flexDirection="column" class="mag-list" :backgroundImage="mag.cover">
                                <StackLayout width="100%" class="mag-list__right">
                                    <Label class="opacity-block"></Label>
                                    <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="stretch" alignContent="stretch"
                                    class="mag-info-block">
                                        <FlexboxLayout flexDirection="column" flexGrow="1" class="info-container">
                                            <Label :text="mag.title" class="mag-list__right--title"/>
                                            <Label :text="mag.pages + ' стр., ' + mag.size + ' мб.'"
                                                   class="mag-list__right--info"/>
                                        </FlexboxLayout>

                                        <FlexboxLayout flexDirection="column" flexGrow="1">
                                            <Button text="Скачать" @tap="onTap(mag.title)"
                                                    class="btn btn-default mag-list__right--download"
                                                    horizontalAlignment="stretch"
                                                    verticalAligment="bottom"
                                                    padding="10"
                                            />
                                        </FlexboxLayout>
                                    </FlexboxLayout>


                                </StackLayout>
                            </FlexboxLayout>
                        </v-template>
                    </ListView>
                </PullToRefresh>
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
            onTap: function (title) {
                console.log('btn pressed' + title);
                this.$navigateTo(MagPage, {
                    context: {
                        propsData: {
                            data: {'title': title}
                        }
                    }
                })
            },
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
            refreshList(args) {
                var pullRefresh = args.object;
                setTimeout(function () {
                    pullRefresh.refreshing = false;
                }, 1000);
                console.log('refr');
            }
        }
    }
</script>
