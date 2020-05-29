const express = require('express');
const router = express.Router();

const data = [];

const checarId = (req, res, next) => {
    const id = req.params.id;
    const check = data.find(item => item.id === id);
    if(check == null){
        return res.status(400).json({ message: "Usuário não existe"});
      }
    return next();
}
// mostrar exploradores
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// criar explorador
router.post('/', function (req, res) {
    const id2 = req.body.id;
    const check2 = data.find(item => item.id === id2);
    if(check2 == null){
    let newExplorer = {
        id: req.body.id, 
        name: req.body.name,
        stacks:[]
    };
    data.push(newExplorer);
    res.status(201).json(newExplorer);
    }else{
        return res.status(400).json({ message: "ID ja existe"});    
    }
});

//atualizar nome do explorador
router.put('/:id',checarId,(req, res) => {
    let procurarExp = data.find(function (item) {
        return item.id === req.params.id;
    });
        let updated = {
            id: procurarExp.id,
            name: req.body.name,
            stacks: procurarExp.stacks
        };
        let targetIndex = data.indexOf(procurarExp);
        data.splice(targetIndex, 1, updated);
        res.sendStatus(204);
});
//deletar explorador
router.delete('/:id', checarId, (req, res) => {
    let procurarExp = data.find(function (item) {
        return item.id === req.params.id;
    });
        let targetIndex = data.indexOf(procurarExp);
        data.splice(targetIndex, 1);
        res.sendStatus(204);
});

//atualizar stack dos exploradores
router.post('/:id/:stack', checarId,(req, res) => {
    let procurarExp = data.find(function (item) {
        return item.id === req.params.id;
    });
    let updated = {
        id: procurarExp.id,
        name: procurarExp.name,
        stacks: procurarExp.stacks
    };
    updated.stacks.push(req.params.stack);
    let targetIndex = data.indexOf(procurarExp);
    data.splice(targetIndex, 1, updated);
    res.sendStatus(204);
})
module.exports = router;