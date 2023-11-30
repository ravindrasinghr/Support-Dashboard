const { BigQuery } = require('@google-cloud/bigquery');
const { Client } = require('pg');

// Run the query
exports.queryBQ = async (req, res, next) => {
    const bigquery = new BigQuery();

    const datasetId = 'regrowth_logs_hevo';
    const tableId = 'logs_logs_catalog_inventory';

    const query = `SELECT * FROM \`${datasetId}.${tableId}\` limit 1`;
    const result = await bigquery.query(query);
    console.log(Array.isArray(result[0]));
    console.log(Object.keys(result[0][0]));
    res.json(result);
}

exports.queryDB = async (req, res, next) => {
    const client = new Client({
        user: process.env.SURESHOT_DB_USER,
        host: process.env.SURESHOT_DB_HOST,
        database: process.env.SURESHOT_DB_DATABASE,
        password: process.env.SURESHOT_DB_PASSWORD,
        port: process.env.SURESHOT_DB_PORT,
    })
      client.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    const result = await client.query('SELECT * FROM failed_events limit 1');
    res.json(result.rows);
}