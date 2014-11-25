var mongoose = require("mongoose"); //  用户组件
var Schema = mongoose.Schema;   //  创建模型
var noteScheMa = new Schema({
    type: String,
    content: String,
    created_at: String,
    updated_at: String
});
 //  定义了一个新的模型，但是此模式还未和notes集合有关联
exports.note = mongoose.model('notes', noteScheMa); //  与notes集合关联