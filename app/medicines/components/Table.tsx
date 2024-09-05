import React from 'react';
import { Medicine } from '@/types';

interface TableProps {
    medicines: Medicine[];
}

const Table: React.FC<TableProps> = ({ medicines }) => {
    return (
        <div className="w-full px-2 md:px-4">
            <div>
                <div className="hidden md:block">
                    <div className="flex bg-gradient-to-r rounded-full from-teal-500 to-blue-500 text-white">
                        <div className="flex-1 py-3 px-6 text-sm font-semibold uppercase tracking-wider w-[2%]">#</div>
                        <div className="flex-2 py-3 px-6 text-sm font-semibold uppercase tracking-wider w-[25%]">Drug Name</div>
                        <div className="flex-3 py-3 px-6 text-sm font-semibold uppercase tracking-wider w-[30%]">Strength</div>
                        <div className="flex-4 py-3 px-6 text-sm font-semibold uppercase tracking-wider w-[43%]">Indication</div>
                    </div>
                    {medicines.map((medicine, index) => (
                        <div key={medicine._id} className="flex bg-white rounded-lg hover:bg-gray-200 transition-all duration-300">
                            <div className="flex-1 py-4 px-6 text-base font-medium text-gray-900 w-[2%]">{index + 1}</div>
                            <div className="flex-2 py-4 px-6 text-base text-gray-900 w-[25%]">{medicine.drug_name || '[Information not available]'}</div>
                            <div className="flex-3 py-4 px-6 text-base text-gray-900 w-[30%]">{medicine.strength || '[Information not available]'}</div>
                            <div className="flex-4 py-4 px-6 text-base text-gray-900 w-[43%]">{medicine.indication || '[Information not available]'}</div>
                        </div>
                    ))}
                </div>

                <div className="md:hidden grid gap-2 mt-4">
                    {medicines.map((medicine, index) => (
                        <div key={medicine._id} className="bg-white hover:bg-gray-200 transition-all duration-200 p-2 rounded-lg shadow-md hover:shadow-lg">
                            <div className="flex justify-between items-center">
                                <div className="text-s font-semibold text-gray-900">{index + 1}.</div>
                                <div className="text-base font-semibold text-teal-600">{medicine.drug_name || '[No name available]'}</div>
                            </div>
                            <div className="mt-2">
                                <div className="text-xs text-gray-500 uppercase">Strength</div>
                                <div className="text-sm text-gray-800">{medicine.strength || '[No strength available]'}</div>
                            </div>
                            <div className="mt-2">
                                <div className="text-xs text-gray-500 uppercase">Indication</div>
                                <div className="text-sm text-gray-800">{medicine.indication || '[No indication available]'}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Table;
