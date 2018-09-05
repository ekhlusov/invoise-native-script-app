<template>
    <Page actionBarHidden="true">
        <FlexboxLayout flexDirection="column">
            <TabView :selectedIndex="selectedIndex">
                <TabViewItem title="Tab 1">
                    <StackLayout>
                        <Image src="http://apps.ekhlusov.ru/1.jpg" width="100%" height="100%" stretch="aspectFit" id="magImage"
                               @doubleTap="onDoubleTap"/>
                    </StackLayout>
                </TabViewItem>

                <TabViewItem title="Tab 1">
                    <StackLayout>
                        <Image src="http://apps.ekhlusov.ru/1.jpg" width="100%" height="100%" />
                    </StackLayout>
                </TabViewItem>

                <TabViewItem title="Tab 1">
                    <StackLayout>
                        <Image src="http://apps.ekhlusov.ru/1.jpg" width="100%" height="100%" />
                    </StackLayout>
                </TabViewItem>

            </TabView>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import * as fs from 'file-system';
    import * as http from "http";
    import * as utils from "utils/utils";
    import {Label} from "ui/label";
    import {View} from "ui/core/view";
    import {GestureEventData, PanGestureEventData, PinchGestureEventData} from "ui/gestures";

    let states = ["unknown", "start", "change", "end"];

    let item;
    let statusLbl;

    let density;
    let prevDeltaX;
    let prevDeltaY;
    let startScale;

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
            console.log('yyyy');
            //this.pageLoaded(args);
        },
        methods: {
            pageLoaded(args) {
                console.log('PAGE LOADED');
                const page = args.object;
                item = page.getViewById("item");
                density = utils.layout.getDisplayDensity();

                item.translateX = 0;
                item.translateY = 0;
                item.scaleX = 1;
                item.scaleY = 1;
            },

            onPan(args) {
                console.log("PAN[" + states[args.state] + "] deltaX: " + Math.round(args.deltaX) + " deltaY: " + Math.round(args.deltaY));

                if (args.state === 1) {
                    prevDeltaX = 0;
                    prevDeltaY = 0;
                }
                else if (args.state === 2) {
                    item.translateX += args.deltaX - prevDeltaX;
                    item.translateY += args.deltaY - prevDeltaY;

                    prevDeltaX = args.deltaX;
                    prevDeltaY = args.deltaY;
                }
            },

            onPinch(args) {
                console.log("PINCH[" + states[args.state] + "] scale: " + args.scale + " focusX: " + args.getFocusX() + " focusY: " + args.getFocusY());

                if (args.state === 1) {
                    const newOriginX = args.getFocusX() - item.translateX;
                    const newOriginY = args.getFocusY() - item.translateY;

                    const oldOriginX = item.originX * item.getMeasuredWidth();
                    const oldOriginY = item.originY * item.getMeasuredHeight();

                    item.translateX += (oldOriginX - newOriginX) * (1 - item.scaleX);
                    item.translateY += (oldOriginY - newOriginY) * (1 - item.scaleY);

                    item.originX = newOriginX / item.getMeasuredWidth();
                    item.originY = newOriginY / item.getMeasuredHeight();

                    startScale = item.scaleX;
                }

                else if (args.scale && args.scale !== 1) {
                    let newScale = startScale * args.scale;
                    newScale = Math.min(8, newScale);
                    newScale = Math.max(0.125, newScale);

                    item.scaleX = newScale;
                    item.scaleY = newScale;
                }
            },

            onDoubleTap(args) {
                console.log("DOUBLETAP");

                /*item.animate({
                    translate: { x: 0, y: 0 },
                    scale: { x: 1, y: 1 },
                    curve: "easeOut",
                    duration: 300
                }).then(function () {
                });*/

            },
            onLoad() {
                console.log('Loaded PDF!');
            },
            onButtonTap() {
                console.log("Button was pressed");
                //this.$navigateBack();
            },
        },
    }
</script>
