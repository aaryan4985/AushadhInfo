export interface Medicine {
    _id: string;             
    drug_name?: string;        
    strength?: string;       
    indication?: string;       
}


export interface UserDetails {
    id: string;
    first_name?: string;  
    last_name?: string;   
    avatar_url?: string;
    gender?: string;      
    dateOfBirth?: string; 
}

export interface Kendra {
    state?: string;
    district?: string;
    blocks?: string;
    address?: string;
    pincode?: number;
    contact_person?: string;
    contact_details?: string;
}
