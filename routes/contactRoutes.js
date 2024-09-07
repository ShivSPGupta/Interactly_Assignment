const express = require('express');
const { getContacts, getContactsByID, createContact, updateContact, deleteContact } = require('../controllers/contactControllers');

const router = express.Router();

router.get('/getall', getContacts);

router.get('/get/:id', getContactsByID);

router.post('/create',createContact);

router.put('/update/:id',updateContact);

router.delete('/delete/:id',deleteContact);

module.exports = router;