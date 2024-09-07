const DbPool = require("../config/db");

const getContacts = async (req, res) => {
    try {
        const data = await DbPool.query(' SELECT * FROM contacts')
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Record found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All Contact Received',
            totalContacts: data[0].length,
            data: data[0],
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get All Contacts API',
            error,
        })
    }
};

const getContactsByID = async (req, res) => {
    try {
        const contactId = req.params.id
        if (!contactId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid or Provide Contact id'
            })
        }
        const data = await DbPool.query(`SELECT * FROM contacts WHERE id=?`, [contactId]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'no Records found',
            })
        }
        res.status(200).send({
            success: true,
            contactDetails: data[0],
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get Contact by id API',
            error,
        })
    }
};

const createContact = async (req, res) => {
    try {
        const { first_name, last_name, email, mobile_number } = req.body
        if (!first_name || !last_name || !email || !mobile_number) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide all Fields',
            })
        }
        const data = await DbPool.query(`INSERT INTO contacts (first_name,last_name,email,mobile_number) VALUES (?,?,?,?)`, [first_name, last_name, email, mobile_number])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Error in INSERT QUERY',
            })
        }
        res.status(201).send({
            success: true,
            message: 'New Contact Created',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Create Contact API',
            error,
        })
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        if (!contactId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID or Provide Valid id',
            })
        }
        const { first_name, last_name, email, mobile_number } = req.body;
        const data = await DbPool.query(`UPDATE contacts SET first_name =?,last_name =?,email =?,mobile_number =? WHERE id =?`, [first_name, last_name, email, mobile_number, contactId])
        if (!data) {
            return res.status(500).send({
                success: false,
                message: 'Error in Update Contact Data',
            })
        }
        res.status(200).send({
            success: true,
            message: 'Contact Details Updated',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Update Contact API',
            error,
        })
    }
};


const deleteContact = async(req,res)=>{
    try {
        const contactId = req.params.id;
        if(!contactId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Contact id or Valid Contact id',
            })
        }
        await DbPool.query(`DELETE FROM contacts WHERE id = ?`,[contactId])
        res.status(200).send({
            success:true,
            message:'Contact Deleted Done',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Delete Contact API',
            error,
        })
    }
}

module.exports = { getContacts, getContactsByID, createContact, updateContact,deleteContact }