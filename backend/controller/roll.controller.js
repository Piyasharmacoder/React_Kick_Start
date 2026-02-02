import Roll from "../model/roll.model.js";
import { validationResult } from 'express-validator';
import { User } from "../model/association.js"


// insert into the Roll (name ,isactive)
export const Add = async (request, response) => {
    //  eror express-validertor
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({ errors: error.array() });
    }

    // check  user  from database by email user exists or not
    let roll = await Roll.findOne({ where: { name: request.body.name }, raw: true });

    if (roll == null) {
        Roll.create({
            name: request.body.name,
            isActive: request.body.isActive
        })
            // if success then response ith status 201 and created Roll data

            .then((result) => {
                return response.status(200).json({ message: "Roll added successfully..", result })
            })
            .catch((err) => {
                return response.status(500).json({ error: "Internal server error..", err })
            })
    }
    else {
        return response.status(200).json({ message: "This Roll Record already exists....." });
    }


}

// get all Roll data  Select*from all roll
export const List = (request, response) => {
    Roll.findAll({include:[{model: User,as :'user' }]})
        // if success then response with status 200 and all Roll data
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result })
            else
                return response.status(200).json({ message: "Record not found...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}


// / select * from Roll where rol_id = ?;
export const Search = (request, response) => {
    //  eror express-validertor
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({ errors: error.array() });
    }
    Roll.findOne({
        where: {
            id: request.body.id
        }
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result })
            else
                return response.status(200).json({ message: "Record not found...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}

// update roll data

// update Roll set name = 'raj thakur', contactNumber = "5654543432" where id = 5;

export const Update = (request, response) => {
    //  eror express-validertor
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({ errors: error.array() });
    }

    Roll.update({
        name: request.body.name,
        isActive: request.body.isActive
    }, {
        where: { id: request.body.id }
    })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: " Record update successfuly.....", result });
            else
                return response.status(200).json({ message: "Record not Found....." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}

// delete roll data

export const Remove = (request, response) => {
    //  eror express-validertor
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({ errors: error.array() });
    }

    Roll.destroy({ where: { id: request.body.id } })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: "Recorde remove successfuly....." });
            else
                return response.status(200).json({ message: "Record not found...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}

// insert - create
// delete - destory
// update - update
// read - findAll
// search - findone