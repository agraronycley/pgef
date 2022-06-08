function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/totvsrmsenar";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
	
	for(var i in constraints) {
		if(constraints[i]['fieldName'] == 'STURMA_CODTIPOCURSO') var STURMA_CODTIPOCURSO = constraints[i]['finalValue'];
		if(constraints[i]['fieldName'] == 'STURMA_CODMODALIDADECURSO') var STURMA_CODMODALIDADECURSO = constraints[i]['finalValue'];
	}

    var myQuery = " SELECT SCURSO.CODCURSO STURMA_CODCURSO, SCURSO.NOME + ' - ' + SCURSO.CODCURSO SCURSO_NOME, SCURSOCOMPL.NROVAGAS STURMA_MAXALUNOS " +
				  " FROM SCURSO (NOLOCK) " +
				  " 	INNER JOIN SCURSOCOMPL (NOLOCK) " +
				  " 			ON SCURSOCOMPL.CODCOLIGADA = SCURSO.CODCOLIGADA " +
				  " 		   AND SCURSOCOMPL.CODCURSO = SCURSO.CODCURSO " +
				  " WHERE SCURSO.CODCOLIGADA = 1 " +
				  "   AND SCURSO.CODTIPOCURSO LIKE '%" + STURMA_CODTIPOCURSO + "%'";
	
	if(STURMA_CODMODALIDADECURSO == '' || STURMA_CODMODALIDADECURSO == null){
		myQuery += "";
	} else {
		myQuery += "   AND SCURSO.CODMODALIDADECURSO LIKE '%" + STURMA_CODMODALIDADECURSO + "%'";
	}

    log.info("ds_CadastroTurma_Cursos: " + myQuery);

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
        log.error("ds_CadastroTurma_Cursos ==============> " + e.message);
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