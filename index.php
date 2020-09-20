<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

    <title>Document</title>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>

   <link href="assets/fontawesome-pro-5.12.2/css/all.css"  rel="stylesheet">
    <link href="" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css" rel="stylesheet">

    <link href="public/css/main.css" rel="stylesheet">
</head>
<body>
<div class="nav-bar-solid text-center" ">
    <h3 style="color: #f4f3f4; " >INFORMACION COVID-19: Peru</h3>
</div>
    <div id="contenedor-principal" class="container-fluid" style="">

        <div class="col-md-12" >
            <div class="row">
                <div class="col-xl-3 col-md-6 box-cont-pri">
                    <div class=" box-cont-panel smal-panel">
                        <div style="text-align: center">
                            <span class="h5">Confirmados</span>
                        </div>
                        <div class="col-md-12" style="text-align: left">
                            <span class="h3" style="color: #757575">{{cnt_conta}}</span>
                            <span  style="margin-left: 20px;">
                                <i v-if="nm_conta>0" style="color: #00c100" class="fa fa-arrow-up"></i>
                                <i v-if="nm_conta<0" style="color: #e30f08" class="fa fa-arrow-down"></i>
                                <span v-if="nm_conta>0">{{nm_conta.toLocaleString("es-PE")}} nuevos</span> Confirmados</span>
                        </div>
                        <div style="" class="col-md-12">
                            <canvas style="height: 95px; width: 100%;" id="char-contagiados"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6 box-cont-pri">
                    <div class=" box-cont-panel smal-panel">
                        <div style="text-align: center">
                            <span class="h5">Muertos</span>
                        </div>
                        <div class="col-md-12" style="text-align: left">
                            <span class="h3" style="color: #757575">{{cnt_muert}}</span>
                            <span style="margin-left: 20px;">
                                <i v-if="nm_muert>0" style="color: #00c100" class="fa fa-arrow-up"></i>
                                <i v-if="nm_muert<0" style="color: #e30f08" class="fa fa-arrow-down"></i>
                                <span v-if="nm_muert>0">{{nm_muert.toLocaleString("es-PE")}} nuevos</span> Muertos</span>
                        </div>
                        <div style="" class="col-md-12">
                            <canvas style="height: 95px; width: 100%;" id="char-muertos"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6 box-cont-pri">
                    <div class=" box-cont-panel smal-panel">
                        <div style="text-align: center">
                            <span class="h5">Recuperados</span>
                        </div>
                        <div class="col-md-12" style="text-align: left">
                            <span class="h3" style="color: #757575">{{cnt_recu}}</span>
                            <span style="margin-left: 20px;">
                                <i v-if="nm_recu>0" style="color: #00c100" class="fa fa-arrow-up"></i>
                                <i v-if="nm_recu<0" style="color: #e30f08" class="fa fa-arrow-down"></i>
                                <span v-if="nm_recu>0">{{nm_recu.toLocaleString("es-PE")}} nuevos</span> Recuperados</span>
                        </div>
                        <div style="" class="col-md-12">
                            <canvas style="height: 95px; width: 100%;" id="char-recuperados"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6 box-cont-pri">
                    <div class=" box-cont-panel smal-panel">
                        <div style="text-align: center">
                            <span class="h5">Activos</span>
                        </div>
                        <div class="col-md-12" style="text-align: left">
                            <span class="h3" style="color: #757575">{{cnt_acti}}</span>
                            <span style="margin-left: 20px;">
                                <i v-if="nm_acti>0" style="color: #00c100" class="fa fa-arrow-up"></i>
                                <i v-if="nm_acti<0" style="color: #e30f08" class="fa fa-arrow-down"></i>
                                <span v-if="nm_acti>0||nm_acti<0">{{nm_acti.toLocaleString("es-PE")}} <span v-if="nm_acti>0">nuevos</span> </span> Activos</span>
                        </div>
                        <div style="" class="col-md-12">
                            <canvas style="height: 95px; width: 100%;" id="char-activos"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="box-cont-pri" style="margin-bottom: 10px">
            <div class="box-cont-panel" >
                <div style="" class="col-md-12">
                    <div class="col-md-12" style="text-align: center">
                        <h4>Grafico General De casos COVID-19</h4>
                    </div>
                    <canvas style="height: 500px; width: 100%;" id="char-data-general"></canvas>
                </div>
                <div class="col-md-12" style="margin-top: 50px;">
                    <div class="col-md-12" style="text-align: center">
                        <h4>Tabla de Datos de COVID-19</h4>
                    </div>
                    <table id="example" class="table table-striped table-bordered" style="width:100%">
                        <thead>
                        <tr>

                            <th>FECHA</th>
                            <th>Confirmados</th>
                            <th>Muertos</th>
                            <th>Recuperados</th>
                            <th>Activos</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in datapripal">
                            <td>{{ formatDate(item.Date)}}</td>
                            <td style="text-align: center">{{item.Confirmed.toLocaleString("es-PE")}}</td>
                            <td style="text-align: center">{{item.Deaths.toLocaleString("es-PE")}}</td>
                            <td style="text-align: center">{{item.Recovered.toLocaleString("es-PE")}}</td>
                            <td style="text-align: center">{{item.Active.toLocaleString("es-PE")}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>



</body>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.1"></script>
<script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@0.7.7"></script>
<script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>

<script src="public/js/main.js"></script>
</html>
