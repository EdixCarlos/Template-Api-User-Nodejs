import Roles from '../models/Roles'
export const createRoles = async ()=>{
    try {
        const count = await Roles.estimatedDocumentCount()

    if(count > 0 )return;

    await Promise.all([
        new Roles({name: "user"}).save(),
        new Roles({name: "moderator"}).save(),
        new Roles({name: "admin"}).save()
    ])
    } catch (error) {
        console.error(error)
    }
}