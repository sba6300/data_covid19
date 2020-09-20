const APP = new Vue({
    el:"#contenedor-principal",
    data:{
        datacollection: null,
        datapripal:[],
        cnt_conta:0,
        cnt_acti:0,
        cnt_muert:0,
        cnt_recu:0,

        nm_conta:0,
        nm_acti:0,
        nm_muert:0,
        nm_recu:0,
    },

    methods:{
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        },
        setPreData(){
            var data_cont=[];
            var data__null=[];
            var data__label=[];
            var data_muer=[];
            var data_recu=[];
            var data_acti=[];
            var d ;
            this.cnt_conta=0;
            this.cnt_acti=0;
            this.cnt_muert=0;
            this.cnt_recu=0;



            for (var i =0; i<this.datapripal.length; i++){
                data_cont.push(this.datapripal[i].Confirmed);
                data_muer.push(this.datapripal[i].Deaths);
                data_recu.push(this.datapripal[i].Recovered);
                data_acti.push(this.datapripal[i].Active);
                data__null.push("");
                d = new Date(this.datapripal[i].Date);
                data__label.push(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate());
            }

            this.cnt_conta=this.datapripal[this.datapripal.length-1].Confirmed;
            this.cnt_acti=this.datapripal[this.datapripal.length-1].Active;
            this.cnt_muert=this.datapripal[this.datapripal.length-1].Deaths;
            this.cnt_recu=this.datapripal[this.datapripal.length-1].Recovered;

            console.log(this.cnt_acti +"    <>     "+ this.datapripal[this.datapripal.length-2].Active);

            this.nm_conta= this.cnt_conta - this.datapripal[this.datapripal.length-2].Confirmed;
            this.nm_acti=this.cnt_acti-this.datapripal[this.datapripal.length-2].Active;
            this.nm_muert=this.cnt_muert-this.datapripal[this.datapripal.length-2].Deaths;
            this.nm_recu=this.cnt_recu-this.datapripal[this.datapripal.length-2].Recovered;

            this.cnt_conta=this.cnt_conta.toLocaleString("es-PE");
            this.cnt_acti=this.cnt_acti.toLocaleString("es-PE");
            this.cnt_muert= this.cnt_muert.toLocaleString("es-PE");
            this.cnt_recu=this.cnt_recu.toLocaleString("es-PE");
            char_contag.data.labels=data__null;
            char_contag.data.datasets[0].data=data_cont;
            char_contag.update();

            char_muer.data.labels=data__null;
            char_muer.data.datasets[0].data=data_muer;
            char_muer.update();

            char_recu.data.labels=data__null;
            char_recu.data.datasets[0].data=data_recu;
            char_recu.update();

            char_activ.data.labels=data__null;
            char_activ.data.datasets[0].data=data_acti;
            char_activ.update();

            char_general.data.labels=data__label;
            char_general.data.datasets[0].data=data_cont;
            char_general.data.datasets[3].data=data_muer;
            char_general.data.datasets[1].data=data_recu;
            char_general.data.datasets[2].data=data_acti;
            char_general.update();

        },
        getdataInfo(){
            axios({
                method: 'get',
                url: 'https://api.covid19api.com/total/country/peru',
                responseType: 'stream'
            })
                .then(function (response) {
                    console.log(response)
                    APP._data.datapripal = response.data;
                    APP.setPreData();
                });
        }
    }
});

var ctx_cont = document.getElementById('char-contagiados').getContext('2d');
var ctx_muer = document.getElementById('char-muertos').getContext('2d');
var ctx_recu = document.getElementById('char-recuperados').getContext('2d');
var ctx_activ = document.getElementById('char-activos').getContext('2d');


var ctx_general = document.getElementById('char-data-general').getContext('2d');


var char_general = new Chart(ctx_general, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            pointRadius: 0,
            spanGaps: false,
            label: 'Confirmados',
            data: [],
            backgroundColor: [
                'rgba(255,249,91,0.2)'
            ],
            borderColor: [
                'rgb(173,168,63)'
            ],
            borderWidth: 1
        },
            {
                pointRadius: 0,
                spanGaps: false,
                label: 'Recuperados',
                data: [],
                backgroundColor: [
                    'rgba(97,255,70,0.2)'
                ],
                borderColor: [
                    'rgb(56,180,61)'
                ],
                borderWidth: 1
            },{
                pointRadius: 0,
                spanGaps: false,
                label: 'Activos',
                data: [],
                backgroundColor: [
                    'rgba(82,243,255,0.1)'
                ],
                borderColor: [
                    'rgb(65,171,180)'
                ],
                borderWidth: 1
            },
            {
                pointRadius: 0,
                spanGaps: false,
                label: 'Muertos',
                data: [],
                backgroundColor: [
                    'rgba(255,99,132,0.1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            },


        ]
    },
    options: {

    }
});
var timeFormat = 'MM/DD/YYYY HH:mm';
var now = window.moment();
var dragOptions = {
    animationDuration: 1000
};

var char_contag = new Chart(ctx_cont, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            pointRadius: 0,
            spanGaps: false,
            label: '',
            data: [],
            backgroundColor: [
                'rgba(255,249,91,0.1)'
            ],
            borderColor: [
                'rgb(173,168,63)'
            ],
            borderWidth: 1
        }]
    },
    options: {

        legend: {
            display: false,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                display: false,
            }],
        }
    }
});
var char_muer = new Chart(ctx_muer, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            pointRadius: 0,
            spanGaps: false,
            label: '',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            display: false,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                display: false,
            }],
        }
    }
});
var char_recu = new Chart(ctx_recu, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            pointRadius: 0,
            spanGaps: false,
            label: '',
            data: [],
            backgroundColor: [
                'rgba(97,255,70,0.2)'
            ],
            borderColor: [
                'rgb(56,180,61)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            display: false,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                display: false,
            }],
        }
    }
});
var char_activ = new Chart(ctx_activ, {
    type: 'line',
    data: {
        labels:[],
        datasets: [{
            pointRadius: 0,
            spanGaps: false,
            label: '',
            data: [],
            backgroundColor: [
                'rgba(82,243,255,0.2)'
            ],
            borderColor: [
                'rgb(65,171,180)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            display: false,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                display: false,
            }],
        }
    }
});


$( document ).ready(function() {

    APP.getdataInfo();
    setTimeout(function () {
        $('#example').DataTable({
            "searching": false,
            "order": [[ 1, "desc" ]],
            language: {
                url: 'public/Spanish.json'
            }
        });
    },1000);

});
