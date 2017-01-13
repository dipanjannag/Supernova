var db_str = process.env.DB_STR || 'mysql://admin:acdh3546@shortrip.c5e0mzj26vsz.us-west-2.rds.amazonaws.com:3306/shortrip_alpha?reconnect=true';
module.exports = {
    connection_str : db_str
};

// herokudb
// mysql://bc4bb1c95fb526:1bb83737@eu-cdbr-west-01.cleardb.com/heroku_77aece663186b1b?reconnect=true


