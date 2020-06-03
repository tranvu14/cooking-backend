import client from '../database/MySQLClient.ts';

export async function getDishes({ response } : {response : any }) {
    const results = await client.execute('SELECT * FROM dish;');
    response.status = 200;
    response.body = results.rows;
}