const usersModel = require('../models/users_model')
const express = require('express')
const router = express.Router()

// Get all users
router.get('/messages/:id', async (req, res, next) => {
    try {

        const result = await usersModel.getMessages(req.params.id)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})

// Get one user
router.get('/:id', async (req, res, next) => {
    try {
        const result = await usersModel.getById(req.params.id)
        if (!result) return res.sendStatus(404)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})

// Create a new user
router.post('/', async (req, res, next) => {
    try {
        const createResult = await usersModel.create(req.body)
        if (!createResult.affectedRows) return res.sendStatus(409)

        const result = await usersModel.getById(createResult.insertId)
        res.status(201).json(result)
    }
    catch (e) {
        console.log(e)
    }
})

// Delete a user
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await usersModel.delete(req.params.id)
        if (!result.affectedRows) return res.sendStatus(404)
        res.sendStatus(200)
    }
    catch (e) {
        console.log(e)
    }
})

// Update a user
router.patch('/:id', async (req, res, next) => {
    try {
        const updateResult = await usersModel.update(req.params.id, req.body)
        if (!updateResult.affectedRows) return res.sendStatus(404)

        const result = await usersModel.getById(req.params.id)
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }
})


module.exports = router