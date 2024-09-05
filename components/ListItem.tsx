"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({
    image, name, href
}) => {
    const router = useRouter();
    const { user } = useUser();
    const authModal = useAuthModal();

    const onClick = () => {
        if (!user) {
            authModal.onOpen();
        } else {
            router.push(href);
        }
    };

    return (
        <div 
            onClick={onClick}
            className="
                relative
                group
                flex
                items-center
                rounded-md
                overflow-hidden
                gap-x-1
                bg-transparent
                hover:bg-neutral-600/35
                transition
                p-1
                cursor-pointer
            "
        >
            <div className="
                relative
                min-h-[50px]
                min-w-[50px]
            ">
                <Image
                    className="object-cover border-y-2 border-x-2 border-black rounded-full"
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={image}
                    alt="Image"
                    
                />
            </div>
            <p className="font-bold text-black ml-2 truncate py-3">
                {name}
            </p>
        </div>
    );
};

export default ListItem;
