class Error {

    static errorAPI (errors, SweetAlert = null) {
        let msgError = '';

        errors.forEach( error => {
            msgError += error.msg + ', ';
        });

        // Remove a última vírgula e o espaço em branco depois dela, com uma expresão regular.
        // A     '/'   marca do início e do fim da expressão regular
        // A     ','   corresponde a vírgula
        // Os    '\s'  caracteres de espaço em branco médio(espaço, tabulação etc.) e o * meio 0 ou mais
        // O     '$'   no final significa o fim da string
        msgError = msgError.replace(/,\s*$/, "");

        if ( SweetAlert ) {
            SweetAlert.warning( msgError );

        } else{
            alert( msgError );
        }
    }
    
}