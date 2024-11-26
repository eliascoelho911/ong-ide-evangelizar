export interface FormSchema {
    categories: Category[];
}

export interface Category {
    name: string;
    id: string;
    groups: Group[];
}

export interface Group {
    name: string;
    fields: Field[];
}

export interface Field {
    name: string;
    type: 'text' | 'textarea' | 'select';
    is_required: boolean;
    is_dinamic?: boolean;
    editable?: boolean;
    pattern?: RegExp;
    options?: string[];
}