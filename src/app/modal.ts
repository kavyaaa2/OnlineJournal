
export interface Entry {
    entry_no?:number,
    entry_key :string,
    user_id: number,
    date :Date,
    title : string,
    journal_content: string
}

export interface User {
    user_id?:number,
    first_name :string,
    last_name :string,
    email : string,
    password: string
}