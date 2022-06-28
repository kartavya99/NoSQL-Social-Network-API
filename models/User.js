
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,            
        },
         email: {
            type: String,
            required: true,
            unique: true,
            match: 
            // [\w._%+-]+@[\w.-]+\.[a-zA-z]{2,4}, 
            // "Please enter a valid email address"],
        },
        // * `thoughts`
        // * Array of `_id` values referencing the `Thought` model

        //  friends`
        //   * Array of `_id` values referencing the `User` model (self-reference)

        

    }
);

module.export = userSchema;




