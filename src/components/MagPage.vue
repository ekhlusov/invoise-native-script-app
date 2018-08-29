<template>
    <Page>
        <ActionBar :title="this.data.title"/>
        <FlexboxLayout flexDirection="column">
            <PDFView flexGrow="1" :src="this.localPdfLink" :load="onLoad"></PDFView>
            <!--<Label :text="this.data.short_desc" />
            <Image :src="this.data.cover" />
            <Button text="Назад" @tap="onButtonTap" />-->
        </FlexboxLayout>
    </Page>
</template>

<script>
    import * as fs from 'file-system';
    import * as http from "http";

    export default {
        data() {
            return {
                localPdfLink: '',
            }
        },
        props: {
            data: {
                type: Object,
                required: true,
            }
        },
        mounted() {
            let pdfUrl = 'http://apps.ekhlusov.ru/1.pdf';
            let documentsFolder = fs.knownFolders.temp();
            let file = fs.path.join(documentsFolder.path, "Test.pdf");
            //let PDFFile = fs.File.fromPath(path);
            //https://globalsib.com/wp-content/uploads/2017/06/igor-nikolaev-2-640x427.jpg

            console.log(file);

            // Проверка на существование файла
            if  (fs.File.exists(file)) {
                this.localPdfLink = file;
                console.log('File exists:' + file);
            } else {
                console.log('Download Started: ' + pdfUrl);
                http.getFile(pdfUrl, file).then(
                    response => {
                        this.localPdfLink = response.path;
                        console.log(response);
                        console.log(this.localPdfLink);
                    }
                );
            }
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
