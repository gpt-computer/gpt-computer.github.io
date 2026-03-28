// Organization index TypeScript type definitions

type Organization = {
    name: string;
    id: number;
    members: Member[];
};

interface Member {
    username: string;
    role: string;
    joinedDate: string;
};

export type { Organization, Member };