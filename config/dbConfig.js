var db_str = process.env.DB_STR || 'mysql://root:acdh3546@sledgehammer.ctnkwcpvczis.us-west-2.rds.amazonaws.com/shortrip_alpha?reconnect=true';
module.exports = {
    connection_str : db_str
};

// herokudb
// mysql://bc4bb1c95fb526:1bb83737@eu-cdbr-west-01.cleardb.com/heroku_77aece663186b1b?reconnect=true


