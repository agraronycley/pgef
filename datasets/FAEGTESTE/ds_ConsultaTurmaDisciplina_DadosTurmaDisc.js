function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/totvsrmsenar";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
	var datainicial;
	var datafinal;

	for(var i in constraints) {
		if(constraints[i]['fieldName'] == 'STURMADISC_IDTURMADISC') var STURMADISC_IDTURMADISC = constraints[i]['finalValue'];
	}
	
	var myQuery = " SELECT STURMADISC.CODTIPOCURSO STURMADISC_CODTIPOCURSO, STURMADISC.IDPERLET STURMADISC_IDPERLET, " +
				  " 	   STURMADISC.CODTURMA STURMADISC_CODTURMA, STURMADISC.IDTURMADISC STURMADISC_IDTURMADISC, STURMADISC.CODDISC STURMADISC_CODDISC, " +
				  "		   SMODALIDADECURSO.CODMODALIDADECURSO STURMADISC_MODALIDADE, SCURSO.CODCURSO STURMADISC_CODCURSO, SCURSO.NOME STURMADISC_CURSO, " +
				  "		   ISNULL(STURMA.NOMERED,'') STURMADISC_NOMERED, STURMADISC.TIPO STURMADISC_TIPOTURMA, SDISCIPLINA.CODDISC STURMADISC_CODDISC, " +
				  "		   STURMADISC.MAXALUNOS STURMADISC_MAXALUNOS, SHABILITACAOFILIAL.CODTURNO STURMADISC_CODTURNO, ISNULL(SMODALIDADECURSO.DESCRICAO,'') STURMADISC_DESCMODALIDADE, " +
	   			  "        STURMADISCCOMPL.LOCAL STURMADISC_LOCAL, ISNULL(CIDADEREALIZACAO.DESCRICAO,'') STURMADISC_DESCLOCAL, CONVERT(INT,SDISCIPLINA.CH) STURMADISC_CH, " +
	   			  "        SDISCIPLINA.NOME STURMADISC_DISCIPLINA, ISNULL(CONVERT(VARCHAR,STURMADISC.DTINICIAL,103),'') STURMADISC_DTINICIAL, " +
	   			  "        ISNULL(CONVERT(VARCHAR,STURMADISC.DTFINAL,103),'') STURMADISC_DTFINAL, STURNO.NOME STURMADISC_TURNO, STURMA.NOME STURMADISC_NOMETURMA," +
	   			  "		   SHABILITACAOFILIAL.IDHABILITACAOFILIAL " +
				  " FROM STURMADISC (NOLOCK) " +
				  "		INNER JOIN SPLETIVO (NOLOCK) " +
				  "				ON SPLETIVO.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
				  " 		   AND SPLETIVO.IDPERLET = STURMADISC.IDPERLET " +
				  "		 LEFT JOIN STURMADISCCOMPL (NOLOCK) " +
				  "				ON STURMADISCCOMPL.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
				  "	   		   AND STURMADISCCOMPL.IDTURMADISC = STURMADISC.IDTURMADISC " +
				  "		INNER JOIN SHABILITACAOFILIAL (NOLOCK) " +
				  "				ON SHABILITACAOFILIAL.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
				  "	   		   AND SHABILITACAOFILIAL.IDHABILITACAOFILIAL = STURMADISC.IDHABILITACAOFILIAL " +
				  "		INNER JOIN STURNO (NOLOCK) " +
				  "				ON STURNO.CODCOLIGADA = SHABILITACAOFILIAL.CODCOLIGADA " +
				  "			   AND STURNO.CODTURNO = SHABILITACAOFILIAL.CODTURNO " +
				  "		INNER JOIN SCURSO (NOLOCK) " +
				  "				ON SCURSO.CODCOLIGADA = SHABILITACAOFILIAL.CODCOLIGADA " +
				  "	   		   AND SCURSO.CODCURSO = SHABILITACAOFILIAL.CODCURSO " +
				  "		 LEFT JOIN SMODALIDADECURSO (NOLOCK) " +
				  "				ON SMODALIDADECURSO.CODCOLIGADA = SCURSO.CODCOLIGADA " +
				  "	   		   AND SMODALIDADECURSO.CODMODALIDADECURSO = SCURSO.CODMODALIDADECURSO " +
				  "		INNER JOIN STURMA (NOLOCK) " +
				  "				ON STURMA.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
				  "	   		   AND STURMA.CODTURMA = STURMADISC.CODTURMA " +
				  "	   		   AND STURMA.IDHABILITACAOFILIAL = STURMADISC.IDHABILITACAOFILIAL " +
				  "		INNER JOIN SDISCIPLINA (NOLOCK) " +
				  "				ON SDISCIPLINA.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
				  "	   		   AND SDISCIPLINA.CODDISC = STURMADISC.CODDISC " +
				  " 	 LEFT JOIN GCONSIST CIDADEREALIZACAO (NOLOCK) " +
				  "				ON CIDADEREALIZACAO.CODINTERNO = STURMADISCCOMPL.LOCAL " +
				  "	   		   AND CIDADEREALIZACAO.CODTABELA = 'LOCAL' " +
				  " WHERE STURMADISC.CODCOLIGADA = 1 " +
				  "   AND STURMADISC.IDTURMADISC  = '" + STURMADISC_IDTURMADISC + "' ";
		  
	
	log.info("ds_ConsultaTurmaDisciplina_DadosTurmaDisc: " + myQuery);

    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ds_ConsultaTurmaDisciplina_DadosTurmaDisc ==============> " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return newDataset;
}

function FormataStringData(data) {
	  var dia  = data.split("/")[0];
	  var mes  = data.split("/")[1];
	  var ano  = data.split("/")[2];

	  return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
	  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
	}