/**
 * mysql连接池模块
 * @author yangxf
 * @time 2017.4.20
 */
var mysql = require('mysql');
var config = require('../conf/config.json');//读取配置文件
var fs = require('fs');//读取文件并使用JSON.parse()解析
var config = JSON.parse(fs.readFileSync('./conf/config.json').toString());

/**
 * 连接池建立
 * @pool {object}
 */
var pool = mysql.createPool({
	host: config.mysqlHost,
	user: config.mysqlUser,
	password: config.mysqlPassword,
	database: config.database,
	port: config.mysqlPort
});

function DBInit() {
	/**
	 * select和delete操作
	 * @param  {string}   sql      sql语句
	 * @param  {Function} callback 回调函数
	 * @return {none}            
	 */
	this.select_OR_delete = function(sql, callback) {
		pool.getConnection(function(err, conn) {
			if (err) {
				console.log('CONNECT ERROR: ', err.message);
				callback(err, null, null);
			} else {
				conn.query(sql, function(err, results, fields) {
					//释放连接
					conn.release();
					//事件驱动回调
					callback(err, results, fields);
//					callback(err, JSON.stringify(results), fields);
				});
			}
		});
	};
	
	/**
	 * update和insert操作
	 * @param  {string}   sql      sql语句
	 * @param  {array}    params   参数数组 
	 * @param  {Function} callback 回调函数
	 * @return {none}            
	 */
	this.update_OR_insert = function(sql, params, callback) {
		pool.getConnection(function(err, conn) {
			if (err) {
				console.log('CONNECT ERROR: ', err.message);
				callback(err, null, null);
			} else {
				conn.query(sql, params, function(err, results, fields) {
					//释放连接
					conn.release();
					//事件驱动回调
					callback(err, results, fields);
//					callback(err, JSON.stringify(results), fields);
				});
			}
		});
	};
}

module.exports = DBInit;