export interface FormSchema {
    sessions: SessionSchema[];
}

export interface SessionSchema {
    name: string;
    id: string;
    groups: Group[];
}

export interface Group {
    name: string;
    id: string;
    fields: Field[];
}

export interface Field {
    id: string;
    name: string;
    type: 'text' | 'textarea' | 'select';
    is_required?: boolean;
    editable?: boolean;
    pattern?: string;
    options?: string[];
}