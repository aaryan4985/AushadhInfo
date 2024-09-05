import { Medicine } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getMedicineByQuery = async (query: string): Promise<Medicine[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!query) {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .order('drug_name', { ascending: true });

    if (error) {
      console.log(error);
      return [];
    }

    return data as Medicine[];
  }

  const queryLower = `%${query.toLowerCase()}%`;
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .or(`drug_name.ilike.${queryLower},strength.ilike.${queryLower},indication.ilike.${queryLower}`)
    .order('drug_name', { ascending: true });

  if (error) {
    console.log(error);
    return [];
  }

  return data as Medicine[];
};

export default getMedicineByQuery;
