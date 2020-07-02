const mongoose = require('mongoose');

// 스키마 생성, 데이터는 아래 3종류(userName, content, completed)
// (timestamps, collection) => options
// timestamps: 자동으로 생성 날짜와 업데이트 날짜 표시
// collection: 특정 collection에 데이터 입력
const todoSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    content: {type: String, required: true},
    // default 값 설정 가능
    completed: {type: String, default: false},
    image: {type: String, default: false}
},
{
    // timestamps: true, // UTC 기준 
    timestamps: {currentTime: () => Date.now() + 3600000 * 9}, // 한국 시간대
    collection: 'todos'
}, );

todoSchema.statics.create = function (payload) {
    const todo = new this(payload);
    return todo.save();
};

todoSchema.statics.findAll = function () {
    return this.find({},{"_id":true, "userName":true, "content":true, "image": true, "completed":true});
};

todoSchema.statics.findOneByTodoid = function (todoId) {
    // CastError 처리
    if (mongoose.Types.ObjectId.isValid(todoId))  
        return this.findOne({"_id":todoId}, {"_id":true, "userName":true, "content":true, "completed":true});
    else
        return null;
};

todoSchema.statics.findManyByUsername = function (userName) {
    return this.find({"userName":userName}, {"_id":true, "userName":true, "content":true, "completed":true});
} 

todoSchema.statics.updateByTodoid = function (todoid, payload) {
    return this.findOneAndUpdate({"_id":todoid}, payload, {new: true});
};

todoSchema.statics.updateImage = function (todoid, image) {
    return this.findOneAndUpdate({"_id":todoid}, {"image":image}, {new: true});
};

todoSchema.statics.deleteByTodoid = function (todoid) {
    return this.deleteOne({"_id":todoid});
};

module.exports = mongoose.model('Todo', todoSchema);
