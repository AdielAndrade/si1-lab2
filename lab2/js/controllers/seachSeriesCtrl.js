app.controller("seachSeriesCtrl", function ($scope, $http, $localStorage) {

    $scope.app = "Mafraboy APP";
    $scope.resultado = "";
    $scope.seriesEncontradas = [];

    $scope.minhaLista = [];


    $scope.queroAssistir = [];
    $scope.info =[];


    $scope.queroAssistir2 = $localStorage.queroAssistir;
    $scope.minhaLista2 = $localStorage.minhaLista;





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


    $scope.adicionaNoWatchlist = function(serie) {

        if($scope.contemSerieWatchlist(serie)) {
            alert("A Série já existe no seu Watchlist!");
        }
        else {

            $scope.queroAssistir.push(serie);
            $scope.queroAssistir2 = $localStorage.queroAssistir.push(serie);


        }
    };

    $scope.contemSerieWatchlist = function(serie) {
        for (var i = 0; i < $localStorage.queroAssistir.length; i++) {
            if($localStorage.queroAssistir[i].Title === serie.Title) {
                return true;
            }
        }
        return false;
    };

    $scope.removeSerieDaMinhaLista = function(serie) {
        $scope.remove($scope.minhaLista, serie);
        $scope.remove($scope.minhaLista2, serie);

    };

    $scope.removeDaWatchlist = function(serie) {
        $scope.remove($scope.queroAssistir, serie);
        $scope.remove($scope.queroAssistir2, serie);
    };

    $scope.adicionaNoPerfil = function(serie) {

        if($scope.contemSeriePerfil(serie)) {
            alert("A Série já existe no seu Perfil!");
        }
        else {

            $http.get("http://www.omdbapi.com/?i="+serie.imdbID+"&plot=full&apikey=93330d3c").then(successCallback, errorCallback);
            function successCallback(response) {

                $scope.minhaLista.push(response.data);
                $scope.minhaLista2.push(response.data);


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
            $scope.removeDaWatchlist(serie);
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