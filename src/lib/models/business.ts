
export type BusinessState = {
    address_line_1?: string,
    address_line_2?: string,
    business_name?: string,
    city?: string,
    description?: string,
    gst?: string,
    industryType?: string,
    integration?: string,
    pan?: string,
    pincode?: string,
    team?: Array<TeamMember>
    state?: string,
    website?: string,
    last_outstanding?: {
        '30d': number,
        '60d': number,
        '90d': number,
        'excess': number,
        'total': number
    },
    last_dso?: {
        '30d': number,
        '60d': number,
        '90d': number,
        'excess': number,
        'total': number
    },
    last_revenue?: {
        '30d': number,
        '60d': number,
        '90d': number,
        'excess': number,
        'total': number
    },
    outstanding: {
        '30d': number,
        '60d': number,
        '90d': number,
        'excess': number,
        'total': number
    },
    dso: {
        '30d': number,
        '60d': number,
        '90d': number,
        'excess': number,
        'total': number
    },
    revenue: {
        '30d': number,
        '60d': number,
        '90d': number,
        'excess': number,
        'total': number
    },
    due?: number,
    creds?: {
        [x: string]: any
    },
    current_plan: NeutronPlan
};

export type NeutronPlan = {
    name: string,
    monthly_rates: number | string,
    expires_in: number | string,
    quotas: {
        whatsapp: number,
        email: number,
        workflows: {
            number: number,
            customer_limit: number
        },
        team: number
    },
    usage: {
        whatsapp: number,
        email: number,
        workflows: {
            number: number,
            customer_limit: number
        },
        team: number
    }

}

export const StarterPlan: NeutronPlan = {
    name: "Starter",
    monthly_rates: "Free",
    expires_in: "Never expires",
    quotas: {
        whatsapp: 150,
        email: 150,
        workflows: {
            number: 2,
            customer_limit: 25
        },
        team: 2
    },
    usage: {
        whatsapp: 0,
        email: 0,
        workflows: {
            number: 0,
            customer_limit: 0
        },
        team: 1
    }
}


export const DEFAULT_BUSINESS_DATA_STATE: BusinessState = {
    integration: "",
    outstanding: {
        '30d': 0,
        '60d': 0,
        '90d': 0,
        'excess': 0,
        'total': 0
    }, dso: {
        '30d': 0,
        '60d': 0,
        '90d': 0,
        'excess': 0,
        'total': 0
    }, revenue: {
        '30d': 0,
        '60d': 0,
        '90d': 0,
        'excess': 0,
        'total': 0
    },
    last_outstanding: {
        '30d': 0,
        '60d': 0,
        '90d': 0,
        'excess': 0,
        'total': 0
    }, last_dso: {
        '30d': 0,
        '60d': 0,
        '90d': 0,
        'excess': 0,
        'total': 0
    }, last_revenue: {
        '30d': 0,
        '60d': 0,
        '90d': 0,
        'excess': 0,
        'total': 0
    },
    due: 0,
    current_plan: StarterPlan
}



export type TeamMember = {
    name: string,
    email: string,
    role: string
}