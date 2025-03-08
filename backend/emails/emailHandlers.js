import { mailtrapClient, sender } from "../lib/mailtrap.js"

import {createWelcomeEmailTemplate} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Bil",
            html: createWelcomeEmailTemplate(name, profileUrl),
            category: "welcome"
        });
        console.log("Welcome Email sent succesfully", response)
    } catch(error){
        throw error;
    }
}
