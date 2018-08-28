<template>
    <Page>
        <ActionBar :title="this.data.title"/>
        <FlexboxLayout flexDirection="column">
            <PDFView flexGrow="1" src="http://apps.ekhlusov.ru/1.pdf" :load="onLoad"></PDFView>
            <!--<Label :text="this.data.short_desc" />
            <Image :src="this.data.cover" />
            <Button text="Назад" @tap="onButtonTap" />-->
        </FlexboxLayout>
    </Page>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true,
            }
        },
        mounted() {
          console.log(this.data);
        },
        methods: {
            onLoad() {
                alert('Loaded PDF!');
            },
            onButtonTap() {
                console.log("Button was pressed");
                this.$navigateBack();
            },
        },
    }
</script>
