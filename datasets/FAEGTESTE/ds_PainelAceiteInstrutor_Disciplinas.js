function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/totvsrmsenar";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

	for(var i in constraints) {
		if(constraints[i]['fieldName'] == 'ACEITE_EMAIL') var ACEITE_EMAIL = constraints[i]['finalValue'];
	}

    //ACEITE_EMAIL = 'mariana.nogueira.melo@hotmail.com';

	var myQuery =   " SELECT STURMADISC.IDTURMADISC ACEITE_IDTURMADISC, SCURSO.NOME ACEITE_CURSO, " +
                    " SPROFESSORTURMA.CODPROF ACEITE_CODPROF, PPESSOA.NOME ACEITE_NOMEINSTRUTOR, PPESSOA.EMAIL ACEITE_EMAIL, " +
                    " SDISCIPLINA.NOME ACEITE_DISCIPLINA, " +
                    " ISNULL(MUNREALIZACAO.NOMEMUNICIPIO + '-' + ETDREALIZACAO.CODETD,'') ACEITE_MUNICIPIO, " +
                    " ISNULL(CONVERT(VARCHAR,STURMADISC.DTINICIAL,103),'') ACEITE_DATAINICIAL, " +
                    " ISNULL(CONVERT(VARCHAR,STURMADISC.DTFINAL,103),'') ACEITE_DATAFINAL, " +
                    " ISNULL((SELECT ZMDDISTANCIAS.DISTANCIA " +
                    "           FROM ZMDDISTANCIAS (NOLOCK) " +
                    "           WHERE ZMDDISTANCIAS.UFORIGEM = FCFO.CODETD  " +
                    "             AND ZMDDISTANCIAS.CIDORIGEM = MUNORIGEM.NOMEMUNICIPIO  " +
                    "             AND ZMDDISTANCIAS.UFDESTINO = SUBSTRING(STURMADISCCOMPL.LOCAL,1,2)  " +
                    "             AND ZMDDISTANCIAS.CIDDESTINO = GCONSIST.DESCRICAO),'') ACEITE_DISTANCIA " +
                    " FROM STURMADISC (NOLOCK) " +
                    "  INNER JOIN STURMADISCCOMPL (NOLOCK) " +
                    "          ON STURMADISCCOMPL.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
                    "         AND STURMADISCCOMPL.IDTURMADISC = STURMADISC.IDTURMADISC " +
                    "  INNER JOIN GCONSIST (NOLOCK) " +
                    "          ON GCONSIST.CODCOLIGADA = STURMADISCCOMPL.CODCOLIGADA " +
                    "         AND GCONSIST.CODCLIENTE = STURMADISCCOMPL.LOCAL " +
                    "  INNER JOIN SPROFESSORTURMA (NOLOCK) " +
                    "          ON SPROFESSORTURMA.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
                    "         AND SPROFESSORTURMA.IDTURMADISC = STURMADISC.IDTURMADISC " +
                    "  INNER JOIN SPROFESSORTURMACOMPL (NOLOCK) " +
                    "          ON SPROFESSORTURMACOMPL.CODCOLIGADA = SPROFESSORTURMA.CODCOLIGADA " +
                    "         AND SPROFESSORTURMACOMPL.IDPROFESSORTURMA = SPROFESSORTURMA.IDPROFESSORTURMA " +
                    "  INNER JOIN SPROFESSOR (NOLOCK) " +
                    "          ON SPROFESSOR.CODCOLIGADA = SPROFESSORTURMA.CODCOLIGADA " +
                    "         AND SPROFESSOR.CODPROF = SPROFESSORTURMA.CODPROF " +
                    "  INNER JOIN SPROFESSORCOMPL (NOLOCK) " +
                    "          ON SPROFESSORCOMPL.CODCOLIGADA = SPROFESSOR.CODCOLIGADA " +
                    "         AND SPROFESSORCOMPL.CODPROF = SPROFESSOR.CODPROF " +
                    "  INNER JOIN PPESSOA (NOLOCK) " +
                    "          ON PPESSOA.CODIGO = SPROFESSOR.CODPESSOA " +
                    "  INNER JOIN SHABILITACAOFILIAL (NOLOCK) " +
                    "          ON SHABILITACAOFILIAL.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
                    "         AND SHABILITACAOFILIAL.IDHABILITACAOFILIAL = STURMADISC.IDHABILITACAOFILIAL " +
                    "  INNER JOIN SCURSO (NOLOCK) " +
                    "          ON SCURSO.CODCOLIGADA = SHABILITACAOFILIAL.CODCOLIGADA " +
                    "         AND SCURSO.CODCURSO = SHABILITACAOFILIAL.CODCURSO " +
                    "   LEFT JOIN GETD ETDREALIZACAO (NOLOCK) " +
                    "          ON ETDREALIZACAO.CODETD = SUBSTRING(STURMADISCCOMPL.LOCAL,1,2) " +
                    "   LEFT JOIN GMUNICIPIO MUNREALIZACAO (NOLOCK) " +
                    "          ON MUNREALIZACAO.CODMUNICIPIO = SUBSTRING(STURMADISCCOMPL.LOCAL,3,5) " +
                    "         AND MUNREALIZACAO.CODETDMUNICIPIO = SUBSTRING(STURMADISCCOMPL.LOCAL,1,2) " +
                    "  INNER JOIN ZMDVINCULOFCFOPPESSOA (NOLOCK) " +
                    "          ON ZMDVINCULOFCFOPPESSOA.CODPESSOA = PPESSOA.CODIGO " +
                    "   LEFT JOIN FCFO (NOLOCK) " +
                    "          ON FCFO.CODCFO = ZMDVINCULOFCFOPPESSOA.CODCFO " +
                    "   LEFT JOIN GMUNICIPIO MUNORIGEM (NOLOCK) " +
                    "          ON MUNORIGEM.CODMUNICIPIO = FCFO.CODMUNICIPIO " +
                    "         AND MUNORIGEM.CODETDMUNICIPIO = FCFO.CODETD " +
                    "  INNER JOIN SDISCIPLINA (NOLOCK) " +
                    "          ON SDISCIPLINA.CODCOLIGADA = STURMADISC.CODCOLIGADA " +
                    "         AND SDISCIPLINA.CODDISC = STURMADISC.CODDISC " +
                    " WHERE STURMADISC.CODCOLIGADA = 1 " +
                    " AND SPROFESSORTURMACOMPL.ACEITO = 3 /*AGUARDANDO*/ " +
                    " AND PPESSOA.EMAIL LIKE '%"+ACEITE_EMAIL+"%' " +
                    " AND STURMADISC.CODTIPOCURSO = 8 " +
                    " AND (STURMADISCCOMPL.STATUS = ('05') OR STURMADISCCOMPL.STATUS = '' OR STURMADISCCOMPL.STATUS IS NULL) " +
                    //" AND STURMADISC.IDTURMADISC = 58915 " + 
                    " AND (/* Filtra turmas de teste */( " +
                    "      (STURMADISC.CODTURMA  <>  '101')   " +
                    "      AND  (STURMADISC.CODTURMA NOT LIKE '9999%')   " +
                    "      AND   (STURMADISC.CODTURMA NOT LIKE '7777%') " +
                    "  )) ";
	
	
    log.info("ds_PainelAceiteInstrutor_Disciplinas: " + myQuery);

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
        log.error("ds_PainelAceiteInstrutor_Disciplinas ==============> " + e.message);
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