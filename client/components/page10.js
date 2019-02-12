 angular.module('app').component('page10', {
    templateUrl:  './views/page10.html',

    controller: function ($timeout, $q, $log, $scope, $stateParams, $http) {    

        console.log($stateParams.obj.apt)
        console.log($stateParams.obj.readOnly)
        $scope.readOnly = $stateParams.obj.readOnly;
        $scope.readOnly = false;
        $scope.form ={//[0]: Value, [1]:Normal Range
                hematology:{ 'Hb':['',''], 'RBC Morphology':['', ''], 'WBC TLC':['', ''], 'DLC':{ 'Neutrophils': ['',''], 'Lymphocytes': ['',''], 'Eiosinophils': ['',''], 'Monocytes': ['',''], 'Balophils': ['',''] }, 'Platelets':['', ''], 'Malarial Parasite': ['',''], 'Impression': ['',''], 'ESR': ['',''], 'BT': ['',''], 'CT': ['',''], 'PT Test': ['',''], 'Control': ['',''], 'D-Dimer': ['',''], 'Blood group': ['',''], 'ICT': ['',''], 'DCT': ['',''], 'Rectic count': ['',''], 'AEC': ['',''],},
                semen_analysis:{ 'Colour': ['',''], 'Volume': ['',''], 'Viscosity': ['',''], 'Liquifaction time': ['',''], 'pH': ['',''], 'Fructose': ['',''], 'Total sperm content': ['',''], 'Grade 1 (non-motive)': ['',''], 'Grade 2 (non-progressive)': ['',''], 'Grade 3 (slowly progressive)': ['',''], 'Grade 4 (rapidly progressive)': ['',''], 'Abnormal forms': ['',''], 'Pus cells': ['',''], 'RBCs': ['',''], 'Epithelial cells': ['',''], 'Round cells': ['',''], 'Other findings': ['',''],},
                fluid:{ 'Colour': ['',''], 'Appearance': ['',''], 'Quantity': ['',''], 'Cobweb/Coagulum': ['',''], 'Specific gravity': ['',''], 'Protein': ['',''], 'Sugar': ['',''], 'LDH': ['',''], 'Total cells': ['',''], 'RBC': ['',''], 'DLC': ['',''], 'Lymphocytes': ['',''], 'Polymorphs': ['',''], 'Round/Epithelial/Methothelial': ['',''],},
                urine_analysis:{ 'Colour':  ['',''], 'Appearance':  ['',''], 'pH':  ['',''], 'Protein':  ['',''], 'Sugar':  ['',''], 'BSQBP':  ['',''], 'Ketone':  ['',''], 'Microscopy RBC':  ['',''], 'Pus cells':  ['',''], 'Epithelial cells':  ['',''], 'Cast':  ['',''], 'Crystals':  ['',''], 'Parasites':  ['',''], 'Other findings':  ['',''],},
                stool_examination:{ 'Colour':  ['',''], 'Consistency':  ['',''], 'Mucus':  ['',''], 'Blood':  ['',''], 'pH':  ['',''], 'R sugar':  ['',''], 'Microscopy':  ['',''], 'Pus cells':  ['',''], 'RBC':  ['',''], 'Other':  ['',''],}
        }

        // get form    
        var success=function(response) {
            if(response.data.success) {
                    $scope.form = response.data.form;
            }
            else {
            }
        };
        var error = function(response) {
            alert( "failure message: " + JSON.stringify(response));
        };
        if($stateParams.obj.apt.form)
            $http.post('/secure/doctor/get_form', {appointment:$stateParams.obj.apt}).then(success, error);
        // end of get form 

        // postData to save form
        $scope.postData = function() {
            console.log($scope.form) 
            var successCallback=function(response) {
                if(response.data.success) {
                $log.log(response.data);
                alert('form saved successfully');
                }
                else {
                }
            };
            var errorCallback = function(response) {
                alert( "failure message: " + JSON.stringify(response));
            };
            $http.post('/secure/doctor/save_form', { form:$scope.form, appointment:$stateParams.obj.apt}).then(successCallback, errorCallback);        
        }
    }
})