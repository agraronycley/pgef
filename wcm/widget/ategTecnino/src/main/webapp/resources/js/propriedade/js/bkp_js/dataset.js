function getColleagueByLogin(login) {
  const constraintColleague1 = DatasetFactory.createConstraint(
    "login",
    login,
    login,
    ConstraintType.MUST
  );
  const dataset = DatasetFactory.getDataset(
    "colleague",
    null,
    new Array(constraintColleague1),
    null
  );

  return !!dataset && !!dataset.values && !!dataset.values.length
    ? dataset.values[0]
    : null;
}

function getPpessoaByCodigo(codigo) {
  const constraintRm_senar_ppessoa_readview1 = DatasetFactory.createConstraint(
    "CODIGO",
    codigo,
    codigo,
    ConstraintType.MUST
  );
  const dataset = DatasetFactory.getDataset(
    "rm_senar_ppessoa_readrecord_offline",
    null,
    new Array(constraintRm_senar_ppessoa_readview1),
    null
  );

  return !!dataset && !!dataset.values && !!dataset.values.length
    ? dataset.values[0]
    : null;
}

function getZdmHistoricoAtegByPropriedadeAndProdutor(
  idPropriedade,
  idProdutor
) {
  const constraintPropriedade = DatasetFactory.createConstraint(
    "IDPROPRIEDADE",
    idPropriedade,
    idPropriedade,
    ConstraintType.MUST
  );
  const constraintProdutor = DatasetFactory.createConstraint(
    "IDPRODUTOR",
    idProdutor,
    idProdutor,
    ConstraintType.MUST
  );
  const dataset = DatasetFactory.getDataset(
    "rmSql_ZMDHISTORICOATEG",
    null,
    new Array(constraintPropriedade, constraintProdutor),
    null
  );

  return !!dataset && !!dataset.values && !!dataset.values.length
    ? dataset.values
    : null;
}
