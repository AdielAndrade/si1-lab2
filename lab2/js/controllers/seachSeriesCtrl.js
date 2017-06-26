app.controller("seachSeriesCtrl", function ($scope, $http, $localStorage) {

    $scope.app = "Mafraboy APP";
    $scope.resultado = "";
    $scope.seriesEncontradas = [];

    $scope.minhaLista = [];


    $scope.queroAssistir = [];
    $scope.info =[];


    $scope.queroAssistirPersitente = $localStorage.queroAssistir;
    $scope.minhaListaPersistente = $localStorage.minhaLista;





    $scope.encontraSerie = function(nome) {
    $scope.resultado = "Resultado da pesquisa:";
    $http.get("http://www.omdbapi.com/?s=" + nome+ "&type=series&apikey=93330d3c").then(successCallback, errorCallback);
        function successCallback(response){
            if (response.data.Response === 'False') {
                alert("Série não encontrada!");
            }
            else {
                $scope.seriesEncontradas = response.data.Search;
            }
        }
        function errorCallback(error){
            console.log("Deu Errado Mane");
        }
    };


    $scope.addQueroAssisitir = function(serie) {

        if($scope.contemEmDesejoAssistir(serie)) {
            alert("A Série já existe no seu Desejo Assistir!");
        }
        if($scope.contemSeriePerfil(serie)) {
            alert("A Série já existe no seu Perfil");
        }
        else {

            $scope.queroAssistir.push(serie);
            $scope.queroAssistirPersitente = $localStorage.queroAssistir.push(serie);


        }
    };

    $scope.contemEmDesejoAssistir = function(serie) {
        for (var i = 0; i < $localStorage.queroAssistir.length; i++) {
            if($localStorage.queroAssistir[i].Title === serie.Title) {
                return true;
            }
        }
        return false;
    };

    $scope.removeSerieDaMinhaLista = function(serie) {
        var resposta = confirm("Deseja realmente remover a série " +serie.Title+ "?");
        if (resposta==true) {
            $scope.remove($scope.minhaLista, serie);
            $scope.remove($scope.minhaListaPersistente, serie);
        }
    };

    $scope.removeDesejoAssistir = function(serie) {
        $scope.remove($scope.queroAssistir, serie);
        $scope.remove($scope.queroAssistirPersitente, serie);
    };

    $scope.adicionaNoPerfil = function(serie) {

        if($scope.contemSeriePerfil(serie)) {
            alert("A Série já existe no seu Perfil!");
        }
        else {

            $http.get("http://www.omdbapi.com/?i="+serie.imdbID+"&plot=full&apikey=93330d3c").then(successCallback, errorCallback);
            function successCallback(response) {

                $scope.minhaLista.push(response.data);
                $scope.minhaListaPersistente.push(response.data);


            }function errorCallback(error) {
                alert(error);
            }

        }


    };



    $scope.moveParaPerfil = function(serie) {
        if($scope.contemSeriePerfil(serie)) {
            alert("A Série já existe no seu Perfil!");
        }
        else {
            $scope.adicionaNoPerfil(serie);
            $scope.removeDesejoAssistir(serie);
        }
    };


    $scope.contemSeriePerfil = function(serie) {
        for (var i = 0; i < $localStorage.minhaLista.length; i++) {
            if($localStorage.minhaLista[i].Title === serie.Title) {
                return true;
            }
        }
        return false;
    };

    $scope.remove = function(array, serie) {
        var i = array.indexOf(serie);
        if(i !== -1) {
            array.splice(i, 1);
        }
        return array;
    }





});