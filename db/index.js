import mysql from 'mysql'
import config from '../config'

const { db } = config

const pool = mysql.createPool({
    ...db,
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        })
    })
}

export const queryAllArticles = function () {
    const sql = `
    SELECT * FROM articles
      `;
    return query(sql);
}

export const queryAllUser = function () {
    const sql = 'select * from users'
    return query(sql)
}

export const addUser = function(value) {
    let _sql = "insert into users(name,password) values(?,?);"
    return query( _sql, value)
}

export const findDataByName = function (name) {
    let _sql = `
    SELECT * from users
      where name="${name}"
      `;
    return query(_sql);
}
