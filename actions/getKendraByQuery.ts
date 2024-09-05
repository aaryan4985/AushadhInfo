import { Kendra } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getKendraByQuery = async (query: string): Promise<Kendra[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    if (!query) {
        const { data, error } = await supabase
            .from('janaushadhi_kendra')
            .select('*');

        if (error) {
            console.error(error);
            return [];
        }

        return data as Kendra[];
    }
    const { data, error } = await supabase
        .from('janaushadhi_kendra')
        .select('*');

    if (error) {
        console.error(error);
        return [];
    }

    const queryLower = query.toLowerCase();
    const filteredData = (data as Kendra[]).filter((kendra) =>
        (kendra.state && kendra.state.toLowerCase().includes(queryLower)) ||
        (kendra.district && kendra.district.toLowerCase().includes(queryLower)) ||
        (kendra.blocks && kendra.blocks.toLowerCase().includes(queryLower)) ||
        (kendra.address && kendra.address.toLowerCase().includes(queryLower)) ||
        (kendra.contact_person && kendra.contact_person.toLowerCase().includes(queryLower)) ||
        (kendra.contact_details && kendra.contact_details.toLowerCase().includes(queryLower)) ||
        (kendra.pincode && kendra.pincode.toString().includes(queryLower))
    );

    return filteredData;
};

export default getKendraByQuery;
