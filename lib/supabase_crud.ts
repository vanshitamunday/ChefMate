import supabase from "./supabase";

const TABLE_NAME = "user_table";

export async function getUsers() {
    const { data, error } = await supabase.from(TABLE_NAME).select("*");
    if (error) {
        throw error;
    }
    return data;
}