var mongoose = require("mongoose"); //  用户组件
var Schema = mongoose.Schema;   //  创建模型
var userScheMa = new Schema({
    name: String,
    age: String,
    des: String,
    password: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联
exports.user = mongoose.model('users', userScheMa); //  与users集合关联