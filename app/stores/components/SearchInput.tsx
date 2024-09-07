"use client";

import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchInput = () => {
    const router = useRouter();
    const [query, setQuery] = useState<string>("");
    const debouncedQuery = useDebounce<string>(query, 500);

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: '/stores',
            query: { query: debouncedQuery }
        });
        router.push(url);
    }, [debouncedQuery, router]);

    return (
        <Input
            placeholder="Search a Jan Aushadhi Kendra"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
};

export default SearchInput;
