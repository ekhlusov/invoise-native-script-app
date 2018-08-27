<template>
    <Page>
        <ActionBar :title="this.data.title"/>
        <StackLayout>
            <Label :text="this.data.short_desc" />
            <Image :src="this.data.cover" />
            <Button text="Назад" @tap="onButtonTap" />
        </StackLayout>
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
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
                this.$navigateBack();
            },
        },
    }
</script>
