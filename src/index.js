const tool = require('@hai2007/tool');
const nodejs = require('@hai2007/nodejs');
const fs = require('fs');
const getImageType = require('./getImageType');

module.exports = function (source) {

    // 剔除开头和结尾的空白
    express = source.trim();
    source = "";

    // 获取字符串分析对象
    let reader = tool.ReadString(express);
    reader.readNext();

    // 1表示在{}外，2表示在{}内
    let status = 1;

    let tempWord = "";

    while (true) {

        if (reader.index >= express.length) break;

        // 注释直接删除
        if (reader.getNextN(2) == '/*') {
            while (reader.getNextN(2) != '*/') {
                if (reader.index >= express.length) {
                    throw new Error("Multiline comment not closed correctly : " + express + "\nstep='analyseWord-searchEndComment'");
                }
                reader.readNext();
            }
            reader.readNext();
            reader.readNext();
        }

        //  外遇到开始边界符号
        else if ('{' == reader.currentChar && status == 1) {
            status = 2;

            //  当前tempWord中保存的应该是选择器
            source += tempWord.trim() + "{";
            tempWord = "";
            reader.readNext();

        }

        //  内遇到结束边界符号
        else if ('}' == reader.currentChar && status == 2) {
            status = 1;

            source += "}";

            // 此时如果存在非空白内容，应该出现了错误，提示一下
            if ((tempWord.trim()).length > 0) {
                throw new Error("CSS statement did not end correctly:" + tempWord);
            }

            tempWord = "";
            reader.readNext();
        }

        //  内遇到;符号
        else if (';' == reader.currentChar && status == 2) {
            reader.readNext();

            let temp = (tempWord.trim()).split(':');
            let key = temp[0].trim(), value = temp[1].trim();

            // 我们对特殊的属性进行修改

            temp = /url\((['"]{0,1})([^)'"]+)\1\)/.exec(value);

            // 如果是图片引用
            if (temp) {

                let imgSrc = nodejs.fullPath(temp[2], nodejs.fullPath('../', this.filepath));

                source += (key + ":url('data:image/" + getImageType(imgSrc) + ";base64," + fs.readFileSync(imgSrc).toString("base64") + "');");

            }

            // 普通的直接拼接回去
            else {
                source += (key + ":" + value + ";");
            }

            tempWord = "";
        }

        // 其它
        else {
            tempWord += reader.currentChar;
            reader.readNext();
        }

    }

    return source;
};
