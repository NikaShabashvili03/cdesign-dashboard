
export interface SafeUser {
    id: number
    email: string
    firstname: string
    lastname: string
}

interface Customer {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    email_verified?: boolean | null;
}

export interface Service {
    id: number
    name: string
}

export interface SafeRenovation {
    id: number;
    track: string;
    service: Service;
    supervisor: SafeUser;
    customer: Customer;
    address: string;
    start_date: string; 
    end_date: string; 
    progress: number;
};

export interface SafeStage {
    id: number;
    images: Image[];
    name: string;
    is_completed: Date;
}

interface Image {
    url: string
}