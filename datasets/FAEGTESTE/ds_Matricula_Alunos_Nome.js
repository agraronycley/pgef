function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/totvsrmsenar";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
	
	var SALUNO_NOME = constraints[0]['finalValue'];
	var SALUNO_CPF = constraints[1]['finalValue'];
	
	var myQuery =	" SELECT DISTINCT SALUNO.CODCFO SALUNO_CODCFO, SALUNO.RA SALUNO_RA, PPESSOA.NOME SALUNO_NOME, " +
					"    			  ISNULL(PPESSOA.TELEFONE1,'') SALUNO_TELEFONE1, ISNULL(PPESSOA.TELEFONE2,'') SALUNO_TELFONE2, " +
					"    			  ISNULL(PPESSOA.EMAIL,'') SALUNO_EMAIL, PPESSOA.CPF SALUNO_CPF " +
					" FROM SALUNO (NOLOCK) " +
					" 	INNER JOIN PPESSOA (NOLOCK) " +
					" 			ON PPESSOA.CODIGO = SALUNO.CODPESSOA " +
					" WHERE SALUNO.CODCOLIGADA = 1 " +
					"        AND PPESSOA.NOME LIKE '%" + SALUNO_NOME + "%' AND PPESSOA.CPF LIKE '%" + SALUNO_CPF + "%' "
					" ORDER BY PPESSOA.NOME " ;
  	
    log.info("ds_Matricula_Alunos_Nome: " + myQuery);

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
        log.error("ds_Matricula_Alunos ==============> " + e.message);
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