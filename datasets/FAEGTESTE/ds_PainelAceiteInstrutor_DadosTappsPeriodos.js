function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/totvsrmsenar";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

	for(var i in constraints) {
		if(constraints[i]['fieldName'] == 'TAPPS_CODTIPOCURSO') var TAPPS_CODTIPOCURSO = constraints[i]['finalValue'];
		if(constraints[i]['fieldName'] == 'TAPPS_IDTURMADISC') var TAPPS_IDTURMADISC = constraints[i]['finalValue'];
	}

	var myQuery = " SELECT SPROFESSOR.CODPROF, STURMADISC.IDTURMADISC, STURMADISC.CODTURMA, SDISCIPLINA.NOME DISCIPLINA, PPESSOA.NOME, PPESSOA.EMAIL, PLANO_AULA.TOTALHORAS, " +
                "  (SELECT DISTINCT CONVERT(VARCHAR,MIN(SPLANOAULA.DATA),103) " +
                "   FROM SPLANOAULA WHERE SPLANOAULA.IDTURMADISC = STURMADISC.IDTURMADISC " +
                "    AND DATEPART(WK,SPLANOAULA.DATA) = PLANO_AULA.QTDESEMANAS) DATAINICIO, " +
                "    (SELECT DISTINCT CONVERT(VARCHAR,MAX(SPLANOAULA.DATA),103) " +
                "   FROM SPLANOAULA WHERE SPLANOAULA.IDTURMADISC = STURMADISC.IDTURMADISC " +
                "    AND DATEPART(WK,SPLANOAULA.DATA) = PLANO_AULA.QTDESEMANAS) DATAFIM, " +
                "  (SELECT SENAR_VALOREDUCADOR.VALOREDUCADOR AS VALORHORA " +
                "    FROM SENAR_VALOREDUCADOR (NOLOCK) " +
                "    WHERE SENAR_VALOREDUCADOR.CODPROF = SPROFESSOR.CODPROF " +
                "      AND SENAR_VALOREDUCADOR.IDTURMADISC = STURMADISC.IDTURMADISC) VALORHORA, " +
                "(SELECT  PLANO_AULA.TOTALHORAS * ISNULL(SENAR_VALOREDUCADOR.VALOREDUCADOR ,0) AS VALORHORA " +
                "     FROM SENAR_VALOREDUCADOR (NOLOCK) " +
                "     WHERE SENAR_VALOREDUCADOR.CODPROF = SPROFESSOR.CODPROF " +
                "       AND SENAR_VALOREDUCADOR.IDTURMADISC = STURMADISC.IDTURMADISC) VALORTOTAL, " +
                "ISNULL((SELECT ZMDDISTANCIAS.DISTANCIA " +
                "   FROM ZMDDISTANCIAS (NOLOCK) " +
                "   WHERE ZMDDISTANCIAS.UFORIGEM = FCFO.CODETD " +
                "      AND ZMDDISTANCIAS.CIDORIGEM = MUNORIGEM.NOMEMUNICIPIO " +
                "      AND ZMDDISTANCIAS.UFDESTINO = SUBSTRING(STURMADISCCOMPL.LOCAL,1,2) " +
                "      AND ZMDDISTANCIAS.CIDDESTINO = GCONSIST.DESCRICAO),'') * 2 DISTANCIA, " +
                "PLANO_AULA.QTDESEMANAS QTDESEMANAS " +
                "FROM STURMADISC " +
                "INNER JOIN SPROFESSORTURMA (NOLOCK) " +
                "     ON SPROFESSORTURMA.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
                "    AND SPROFESSORTURMA.IDTURMADISC = STURMADISC.IDTURMADISC " +
                "INNER JOIN SPROFESSOR (NOLOCK) " +
                "     ON SPROFESSOR.CODCOLIGADA = SPROFESSORTURMA.CODCOLIGADA " +
                "    AND SPROFESSOR.CODPROF = SPROFESSORTURMA.CODPROF " +
                "INNER JOIN PPESSOA (NOLOCK) " +
                "     ON PPESSOA.CODIGO = SPROFESSOR.CODPESSOA " +
                "INNER JOIN SPROFESSORTURMACOMPL (NOLOCK) " +
                "     ON SPROFESSORTURMACOMPL.CODCOLIGADA = SPROFESSORTURMA.CODCOLIGADA " +
                "    AND SPROFESSORTURMACOMPL.IDPROFESSORTURMA = SPROFESSORTURMA.IDPROFESSORTURMA " +
                "INNER JOIN SDISCIPLINA (NOLOCK) " +
                "     ON SDISCIPLINA.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
                "    AND SDISCIPLINA.CODDISC = STURMADISC.CODDISC " +
                "LEFT JOIN SPLANOAULA (NOLOCK) " +
                "     ON SPLANOAULA.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
                "    AND SPLANOAULA.IDTURMADISC = STURMADISC.IDTURMADISC " +
                "LEFT JOIN (SELECT HORAS.CODCOLIGADA, HORAS.IDTURMADISC, HORAS.QTDESEMANAS, SUM(HORAS.HORAS) TOTALHORAS FROM ( " +
                "  SELECT SHORARIOTURMA.CODCOLIGADA, SHORARIOTURMA.IDTURMADISC, " +
                "        DATEDIFF(HOUR, SHORARIO.HORAINICIAL, SHORARIO.HORAFINAL) HORAS, " +
                "        MIN(SPLANOAULA.DATA)  DATA, " +
                "        DATEPART(WK,SPLANOAULA.DATA) QTDESEMANAS " +
                "  FROM SHORARIOTURMA   " +
                "  INNER JOIN SPLANOAULA   " +
                "          ON SHORARIOTURMA.CODCOLIGADA = SPLANOAULA.CODCOLIGADA " +
                "        AND SHORARIOTURMA.IDHORARIOTURMA = SPLANOAULA.IDHORARIOTURMA " +
                "  INNER JOIN SHORARIO " +
                "          ON SHORARIOTURMA.CODCOLIGADA = SHORARIO.CODCOLIGADA " +
                "        AND SHORARIOTURMA.CODHOR = SHORARIO.CODHOR " +
                "    LEFT JOIN (SELECT HT.IDTURMADISC, DATEPART(WK, PA.DATA) DIASEMANA " +
                "    FROM SHORARIOTURMA  HT " +
                "    INNER JOIN SPLANOAULA  PA " +
                "            ON HT.CODCOLIGADA = PA.CODCOLIGADA " +
                "          AND HT.IDHORARIOTURMA = PA.IDHORARIOTURMA " +
                "    INNER JOIN SHORARIO  H " +
                "          ON HT.CODCOLIGADA = H.CODCOLIGADA " +
                "        AND HT.CODHOR = H.CODHOR " +
                "    ) TOTALHORAS " +
                "    ON TOTALHORAS.IDTURMADISC = SHORARIOTURMA.IDTURMADISC " +
                //"  WHERE SHORARIOTURMA.IDTURMADISC = STURMADISC.IDTURMADISC " +
                "  GROUP BY  SHORARIOTURMA.CODCOLIGADA, SHORARIOTURMA.IDTURMADISC, SPLANOAULA.DATA, SHORARIO.HORAINICIAL, SHORARIO.HORAFINAL " +
                ") HORAS " +
                "GROUP BY HORAS.CODCOLIGADA, HORAS.IDTURMADISC, HORAS.QTDESEMANAS " +
                "    ) PLANO_AULA " +
                "  ON PLANO_AULA.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
                "  AND PLANO_AULA.IDTURMADISC = STURMADISC.IDTURMADISC " +
                "INNER JOIN STURMADISCCOMPL (NOLOCK) " +
                "      ON STURMADISC.CODCOLIGADA = STURMADISCCOMPL.CODCOLIGADA " +
                "     AND STURMADISC.IDTURMADISC = STURMADISCCOMPL.IDTURMADISC " +
                "INNER JOIN GCONSIST (NOLOCK) " +
                "       ON GCONSIST.CODCOLIGADA = STURMADISCCOMPL.CODCOLIGADA " +
                "      AND GCONSIST.CODCLIENTE = STURMADISCCOMPL.LOCAL " +
                "INNER JOIN ZMDVINCULOFCFOPPESSOA (NOLOCK) " +
                "       ON ZMDVINCULOFCFOPPESSOA.CODPESSOA = PPESSOA.CODIGO " +
                "INNER JOIN FCFO (NOLOCK) " +
                "       ON FCFO.CODCFO = ZMDVINCULOFCFOPPESSOA.CODCFO " +
                "INNER JOIN GMUNICIPIO MUNORIGEM (NOLOCK) " +
                "       ON MUNORIGEM.CODMUNICIPIO = FCFO.CODMUNICIPIO " +
                "      AND MUNORIGEM.CODETDMUNICIPIO = FCFO.CODETD " +
                "WHERE STURMADISC.CODCOLIGADA = 1 " +
                "AND STURMADISC.CODTIPOCURSO =  " + TAPPS_CODTIPOCURSO + 
                "AND STURMADISC.IDTURMADISC =  " + TAPPS_IDTURMADISC +
                "AND SPROFESSORTURMACOMPL.ACEITO = 3 " +
                "GROUP BY STURMADISC.IDTURMADISC, STURMADISC.CODTURMA, SDISCIPLINA.NOME, PPESSOA.NOME, PPESSOA.EMAIL, " +
                "STURMADISC.CODCOLIGADA, SPROFESSOR.CODPROF, FCFO.CODETD, MUNORIGEM.NOMEMUNICIPIO ,STURMADISCCOMPL.LOCAL, " +
                "GCONSIST.DESCRICAO, PLANO_AULA.QTDESEMANAS , PLANO_AULA.TOTALHORAS " +
                "ORDER BY QTDESEMANAS ";
  
    log.info("ds_PainelAceiteInstrutor_DadosTappsPeriodos: " + myQuery);

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
        log.error("ds_PainelAceiteInstrutor_DadosTappsPeriodos ==============> " + e.message);
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