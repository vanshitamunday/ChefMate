import supabase from "./supabase";

const TABLE_NAME = "user_table";

export async function getUsers(userEmail: any) {
    const { data, error } = await supabase.from(TABLE_NAME).select("*").eq("email", userEmail);
    if (error) {
        throw error;
    }
    if (data && data.length > 0) {
        return data[0];
    } else {
        return null;
    }
}

export async function verifyPassword(userEmail: any, userPassword: any){
    const user = await getUsers(userEmail);
    if(!user){
        return false;
    }

    if(userPassword === user.password){
        return true;

    } else {
        return false;
    }
}