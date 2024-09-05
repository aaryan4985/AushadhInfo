"use client";

import React from 'react';
import { Medicine} from '@/types';
import Table from './Table';

interface MedicinesContentProps {
    medicines: Medicine[];
}

const MedicinesContent: React.FC<MedicinesContentProps> = ({ medicines }) => {

    if (medicines.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-black">
                Try searching some other medicine.
            </div>
        );
    }

    return (
        <Table medicines={medicines}/>
    );
};

export default MedicinesContent;
