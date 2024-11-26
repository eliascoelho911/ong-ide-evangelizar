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
    id?: string;
    name: string;
    type: 'text' | 'textarea' | 'select';
    is_required?: boolean;
    is_dynamic?: boolean;
    editable?: boolean;
    pattern?: RegExp;
    options?: string[];
}