const Todo = require('../models/todolist');

const todo = {
    readAll: async (req, res) => {
        const todos = await Todo.findAll();
        try {
            if (!todos.length) {
                return res.status(404).send({err: 'Todo not found'});
            }
            // 보기 좋게 출력
            res.status(200).send(todos);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    read: async (req, res) => {
        // 파라미터로 받은 todoId를 변수에 담기
        const todoId = req.params.todoId;
        // findOneByTodoid() 함수에 todoId를 인자로 넣어 실행
        let todo = await Todo.findOneByTodoid(todoId);
        console.log(todo);
        // CastError 처리 -> models에서      
        try {
            if(todo === null) {
                return res.status(404).send({err: 'NULL_TODOLIST'});
            }
            if(todo.length === 0) {
                // 만약 결과값이 존재하지 않는다면 존재하지 않는 글을 보려 시도한 것. 
                return res.status(404).send({err: 'Todo not found'});
            }
        // todoId에 해당하는 결과값이 존재하면 그 객체 출력.
        res.status(200).send(todo);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    readByUserName: async (req, res) => {
        const userName = req.params.userName;
        try {
            const result = await Todo.findManyByUsername(userName);
            return res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    write: async (req, res) => {
        try {
            const result = await Todo.create(req.body);
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    update: async (req, res) => {
        const todoId = req.params.todoId;
        const content = req.body;
        try {
            const result = await Todo.updateByTodoid(todoId, content);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    updateImage: async (req, res) => {
        const todoId = req.params.todoId;
        // console.log(req.file);
        const image = req.file.location;
        // console.log(image);
        try {
            const result = await Todo.updateImage(todoId, image);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    delete: async (req, res) => {
        try {
            const todoId = req.params.todoId;
            const result = await Todo.deleteByTodoid(todoId);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = todo;