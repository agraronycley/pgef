/**
 * @Details
 * @JS: distance
 */

const calcRadiusDistance = (lat1, lon1, lat2, lon2) => {
    return new Promise((resolve, reject) => {
        try {
            let RADIUSMILES = 3961;
            let RADIUSKILOMETERS = 6373;
            Promise.all([
                calcDeg2rad(lat1),
                calcDeg2rad(lon1),
                calcDeg2rad(lat2),
                calcDeg2rad(lon2),
            ]).then((deg2rad) => {
                let latDifference = deg2rad[2] - deg2rad[0];
                let lonDifference = deg2rad[3] - deg2rad[1];
                let a = Math.pow(Math.sin(latDifference / 2), 2) + Math.cos(deg2rad[0]) * Math.cos(deg2rad[2]) * Math.pow(Math.sin(lonDifference / 2), 2);
                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                let dm = c * RADIUSMILES;
                let dk = c * RADIUSKILOMETERS;
                Promise.all([
                    calcRound(dm),
                    calcRound(dk)
                ]).then((round) => {
                    let miles = round[0]; //NOTE: ** Milhas **
                    let kilometers = round[1]; //NOTE: ** Kilometros **
                    resolve({
                        'miles': miles,
                        'kilometers': kilometers
                    });
                }).catch((err) => {
                    // TODO: handle exception
                    throw err;
                });
            }).catch((err) => {
                // TODO: handle exception
                throw err;
            });
        } catch (ex) {
            // TODO: handle exception
            reject(new Error(`Ocorreu algum erro durante a execução da função - calcRadiusDistance - ${ex}`));
        }
    });
};

const calcDeg2rad = (deg) => {
    return new Promise((resolve, reject) => {
        try {
            let rad = deg * Math.PI / 180;
            resolve(rad);
        } catch (ex) {
            // TODO: handle exception
            reject(new Error(`Ocorreu algum erro durante a execução da função - calcDeg2rad - ${ex}`));
        }
    });
};

const calcRound = (x) => {
    return new Promise((resolve, reject) => {
        try {
            let round = Math.round(x * 10) / 10;
            resolve(round);
        } catch (ex) {
            // TODO: handle exception
            reject(new Error(`Ocorreu algum erro durante a execução da função - calcRound - ${ex}`));
        }
    });
};

const validRuralProperty = (codPessoa = document.getElementById("codPPessoa").value) => {
    return new Promise((resolve, reject) => {
        try {
            let constraint = new Array(
                DatasetFactory.createConstraint("CODPESSOA", codPessoa, codPessoa, ConstraintType.MUST)
            );
            DatasetFactory.getDataset("rm_senar_zmdpropriedaderural_readview", null, constraint, null, {
                success: function(dsPropriedadeRural) {
                    if (dsPropriedadeRural && dsPropriedadeRural.values && dsPropriedadeRural.values.length > 0) {
                        resolve(dsPropriedadeRural);
                    } else {
                        resolve(new Object({ columns: new Array(), values: new Array() }));
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    throw new Error(`Não foi possivel identificar registros existentes. Erro: ${errorThrown}`);
                }
            });
        } catch (ex) {
            // TODO: handle exception
            reject(new Error(`Ocorreu algum erro durante a execução da função - validRuralProperty - ${ex}`));
        }
    });
};

const treatRuralProperty = (codPessoa = document.getElementById("codPPessoa").value, latitude = document.getElementById("latitude").value, longitude = document.getElementById("longitude").value) => {
    return new Promise((resolve, reject) => {
        try {
            validRuralProperty(codPessoa).then((ruralproperty) => {
                if (ruralproperty && ruralproperty.values && ruralproperty.values.length > 0) {
                    var func_run = new Array();
                    for (let i = 0; i < ruralproperty.values.length; i++) {
                        let records = ruralproperty.values[i];
                        func_run.push(calcRadiusDistance(latitude, longitude, records.LATITUDE, records.LONGITUDE));
                    }
                    Promise.all(func_run).then((promisedata) => {
                        resolve(promisedata);
                    }).catch((err) => {
                        // TODO: handle exception
                        throw err;
                    });
                } else {
                    resolve(new Array());
                }
            }).catch((err) => {
                // TODO: handle exception
                throw err;
            });
        } catch (ex) {
            // TODO: handle exception
            reject(new Error(`Ocorreu algum erro durante a execução da função - validRuralProperty - ${ex}`));
        }
    });
};

const radiusProperty = () => {
    return new Promise((resolve, reject) => {
        try {
            treatRuralProperty(document.getElementById("codPPessoa").value, document.getElementById("latitude").value, document.getElementById("longitude").value).then((radiusproperty) => {
                const radiusProcedure = async n => {
                    var inradius = new Array();
                    if (radiusproperty && radiusproperty.length > 0) {
                        for (let i = 0; i < radiusproperty.length; i++) {
                            if (radiusproperty[i].kilometers < 2) {
                                inradius.push(radiusproperty[i].kilometers);
                            }
                        }
                    }
                    return inradius;
                }
                radiusProcedure(0).then(radiusprocdata => {
                    if (radiusprocdata && radiusprocdata.length > 1) {
                        let highNumber = radiusprocdata.sort(function(a, b) { return b - a; })[0];
                        FLUIGC.message.alert({
                            message: `Foi identificado que existe uma propriedade rural cadastrada para o produtor em um raio menor que ${(highNumber > 0)? highNumber: "1"} Km do local informado para inclusão.`,
                            title: "Atenção!",
                            label: "OK",
                        }, function(el, ev) {
                            //Callback action executed by the user...
                            //el: Element (button) clicked...
                            //ev: Event triggered...
                        });
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }).catch((err) => {
                    // TODO: handle exception
                    throw err;
                });
            }).catch((err) => {
                // TODO: handle exception
                throw err;
            });
        } catch (ex) {
            // TODO: handle exception
            reject(new Error(`Ocorreu algum erro durante a execução da função - radiusProperty - ${ex}`));
        }
    });
};