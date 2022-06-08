function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/totvsrmsenar";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
	var myQuery = "";
	
	for(var i in constraints) {
		if(constraints[i]['fieldName'] == 'SDISCIPLINA_CODTIPOCURSO') var SDISCIPLINA_CODTIPOCURSO = constraints[i]['finalValue'];
		if(constraints[i]['fieldName'] == 'SDISCIPLINA_NOMEREDUZIDO') var SDISCIPLINA_NOMEREDUZIDO = constraints[i]['finalValue'];
		if(constraints[i]['fieldName'] == 'SDISCIPLINA_NOME') var SDISCIPLINA_NOME = constraints[i]['finalValue'];
		if(constraints[i]['fieldName'] == 'SDISCIPLINA_CODDISC') var SDISCIPLINA_CODDISC = constraints[i]['finalValue'];
	}
	
	if( (SDISCIPLINA_NOMEREDUZIDO == '' || SDISCIPLINA_NOMEREDUZIDO == null) &&
		(SDISCIPLINA_NOME == '' || SDISCIPLINA_NOME == null) && 
		(SDISCIPLINA_NOME == '' || SDISCIPLINA_NOME == null)){
		myQuery = " SELECT SDISCIPLINA.CODDISC SDISCIPLINA_CODDISC, SDISCIPLINA.NOME SDISCIPLINA_NOME, " +
		  " 	   ISNULL(SDISCIPLINA.NOMEREDUZIDO,'') SDISCIPLINA_NOMEREDUZIDO, ISNULL(SDISCIPLINA.COMPLEMENTO,'') SDISCIPLINA_COMPLEMENTO, " +
		  " 	   ISNULL(CONVERT(INT,SDISCIPLINA.CH),0) SDISCIPLINA_CH, SDISCIPLINA.CODTIPOCURSO SDISCIPLINA_CODTIPOCURSO, " +
		  "		   STIPOCURSO.NOME SDISCIPLINA_CONTEXTO, ISNULL(SDISCIPLINA.TIPOAULA,'') SDISCIPLINA_TIPOAULA, " +
		  "		   SDISCIPLINA.TIPONOTA SDISCIPLINA_TIPONOTA, ISNULL(CONVERT(INT,SDISCIPLINA.CHTEORICA),0) SDISCIPLINA_CHTEORICA, " +
		  "		   ISNULL(CONVERT(INT,SDISCIPLINA.CHPRATICA),0) SDISCIPLINA_CHPRATICA, ISNULL(CONVERT(INT,SDISCIPLINA.CHESTAGIO),0) SDISCIPLINA_CHESTAGIO, " +
		  "		   SDISCIPLINA.ESTAGIO SDISCIPLINA_ESTAGIO, SDISCIPLINA.DECIMAIS SDISCIPLINA_DECIMAIS," +
		  "	       SDISCIPLINA.CURSOLIVRE SDISCIPLINA_CURSOLIVRE " +
		  " FROM SDISCIPLINA (NOLOCK) " +
		  " 	INNER JOIN STIPOCURSO (NOLOCK) " +
		  " 			ON STIPOCURSO.CODCOLIGADA = SDISCIPLINA.CODCOLIGADA " +
		  " 		   AND STIPOCURSO.CODTIPOCURSO = SDISCIPLINA.CODTIPOCURSO " +
		  " WHERE SDISCIPLINA.CODCOLIGADA = 1 " +
		  "   AND SDISCIPLINA.CODTIPOCURSO LIKE '%" + SDISCIPLINA_CODTIPOCURSO + "%' " +
		  "   AND SDISCIPLINA.CODDISC LIKE '%" + SDISCIPLINA_CODDISC + "%' ";
	} else {
		myQuery = " SELECT SDISCIPLINA.CODDISC SDISCIPLINA_CODDISC, SDISCIPLINA.NOME SDISCIPLINA_NOME, " +
		  " 	   ISNULL(SDISCIPLINA.NOMEREDUZIDO,'') SDISCIPLINA_NOMEREDUZIDO, ISNULL(SDISCIPLINA.COMPLEMENTO,'') SDISCIPLINA_COMPLEMENTO, " +
		  " 	   ISNULL(SDISCIPLINA.CH,0) SDISCIPLINA_CH, SDISCIPLINA.CODTIPOCURSO SDISCIPLINA_CODTIPOCURSO, " +
		  "		   STIPOCURSO.NOME SDISCIPLINA_CONTEXTO, ISNULL(SDISCIPLINA.TIPOAULA,'') SDISCIPLINA_TIPOAULA, " +
		  "		   SDISCIPLINA.TIPONOTA SDISCIPLINA_TIPONOTA, ISNULL(CONVERT(INT,SDISCIPLINA.CHTEORICA),0) SDISCIPLINA_CHTEORICA, " +
		  "		   ISNULL(CONVERT(INT,SDISCIPLINA.CHPRATICA),0) SDISCIPLINA_CHPRATICA, ISNULL(CONVERT(INT,SDISCIPLINA.CHESTAGIO),0) SDISCIPLINA_CHESTAGIO, " +
		  "		   SDISCIPLINA.ESTAGIO SDISCIPLINA_ESTAGIO, SDISCIPLINA.DECIMAIS SDISCIPLINA_DECIMAIS," +
		  "	       SDISCIPLINA.CURSOLIVRE SDISCIPLINA_CURSOLIVRE " +
		  " FROM SDISCIPLINA (NOLOCK) " +
		  " 	INNER JOIN STIPOCURSO (NOLOCK) " +
		  " 			ON STIPOCURSO.CODCOLIGADA = SDISCIPLINA.CODCOLIGADA " +
		  " 		   AND STIPOCURSO.CODTIPOCURSO = SDISCIPLINA.CODTIPOCURSO " +
		  " WHERE SDISCIPLINA.CODCOLIGADA = 1 " +
		  "   AND SDISCIPLINA.CODTIPOCURSO LIKE '%" + SDISCIPLINA_CODTIPOCURSO + "%' " +
		  "   AND SDISCIPLINA.NOMEREDUZIDO LIKE '%" + SDISCIPLINA_NOMEREDUZIDO + "%' " +
		  "   AND SDISCIPLINA.NOME LIKE '%" + SDISCIPLINA_NOME + "%' " +
		  "   AND SDISCIPLINA.CODDISC LIKE '%" + SDISCIPLINA_CODDISC + "%' ";
	}
	
	
    log.info("ds_CadastroDisciplina_Disciplinas: " + myQuery);

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
        log.error("ds_CadastroDisciplina_Disciplinas ==============> " + e.message);
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