

var app = new Vue({
    el: '#app',
    data: {
        calcPrice: {
            material: 1,
            certificate: 1,
            day: 1,
        }
    },
    components: {
        VueSlider: window['vue-slider-component']
    }
})