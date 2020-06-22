
/**
 * util for tomato-fire-egg cli.
 * some of then are from internet func.
 * Author:LeoFeng
 * Date:2020-6-21 13:39:21
 */
const fs = require('fs');
const path = require('path')
/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(_path) {
    return new Promise((resolve, reject) => {
        fs.stat(_path, (err, stats) => {
            if (err) {
                resolve(false);
            } else {
                resolve(stats);
            }
        })
    })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
    let isExists = await getStat(dir);
    //如果该路径且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
        return true;
    } else if (isExists) {     //如果该路径存在但是文件，返回false
        return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir;      //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if (status) {
        mkdirStatus = await mkdir(dir);
    }
    return mkdirStatus;
}
async function readFileList(_path, isDeep, filesList = []) {
    var files = fs.readdirSync(_path);
    files.forEach(function (itm, index) {
        // console.log("xxxxxx:"+)
        var stat = fs.statSync(path.join(_path, itm));
        //如果isDeep，读取子目录文件
        if (stat.isDirectory()) {
            //递归读取文件
            if (isDeep) {
                readFileList(path.join(_path, itm), isDeep, filesList)
            } else {
                console.log("skip sub dir:[" + itm + "]")
            }
        } else {
            var obj = {};
            obj.path = _path;//文件的目录，不含文件名
            obj.filename = itm//文件名，如name.js
            filesList.push(obj);
        }

    })
    return filesList

}
function readFile(_path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(_path, 'utf8', function (err, data) {
            if (err) {
                console.log(_path + " is not file.")
                reject(undefined);
            }
            resolve(data)
        })
    })
}
module.exports = {
    dirExists: dirExists,
    readFile: readFile,
    readFileList: readFileList
}