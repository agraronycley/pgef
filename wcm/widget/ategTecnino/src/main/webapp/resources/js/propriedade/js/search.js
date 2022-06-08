//Busca logradouro pelo CEP
function RetornaCep() {

    var cep_code = $('#cep').val();

    console.log(cep_code);
    if (cep_code.length <= 0) return;
    $.get("http://apps.widenet.com.br/busca-cep/api/cep.json", { code: cep_code }, function(result) {
        if (result.status != 1) {
            alert(result.message || "Houve um erro desconhecido");
            return;
        }
        var tipoLogradouro = '';
        var logradouro = '';

        var RetirarDetalhes = result.address.trim().split(' - de ');

        //$("#cep").val( result.code );
        //$("#estado").val( result.state );
        //$("#municipio").val( result.city );
        $("#bairro").val(result.district);
        $("#rua").val(RetirarDetalhes[0]);

        setTimeout(function() {
            VerificarCamposCEP();
        }, 300);


    });


}

function VerificarCamposCEP() {

}


function CEP() {

    $("#cep").on("change", function() {
        buscaLogradouro();
        VerificaCEP();
    })
}

function buscaLogradouro() {

    var cep = $('#cep').val();
    var Bairro = $('#bairro').val();
    var Logradouro = $('#rua').val();
    cep = cep.trim();
    var c1 = DatasetFactory.createConstraint('CEP', cep, cep, Constraint.MUST);
    var constraints = new Array(c1);
    var dsLogradouro = DatasetFactory.getDataset("DSBuscaLogradouro", null, constraints, null);

    console.log(dsLogradouro);
    for (var i = 0; i < dsLogradouro.values.length; i++) {
        $('#rua').val(dsLogradouro.values[i].Logradouro);
        $('#bairro').val(dsLogradouro.values[i].Bairro);
    }

}

function VerificaCEP() {

    var Bairro = $('#bairro').val();
    var Logradouro = $('#rua').val();

    if (Bairro == "undefined" || Bairro == " ") {
        $("#bairro").removeAttr('readonly');
        $('#bairro').val("");
        Bairro = "";
        $("#rua").removeAttr('readonly');
        $('#rua').val("");
        Logradouro = "";
    }
    if (Bairro != "") {
        $("#bairro").attr('readonly', 'readonly');
    }
    if (Logradouro != "") {
        $("#rua").attr('readonly', 'readonly');
    }

}