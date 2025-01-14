import { FormSchema } from '@/components/templates/form/schema';

export const studentProfileFormSchema: FormSchema = {
    sessions: [
        {
            name: 'Dados Pessoais',
            id: 'dados_pessoais',
            groups: [
                {
                    name: 'Informações Pessoais',
                    id: 'personal_information',
                    fields: [
                        {
                            id: 'personal_information_full_name',
                            name: 'Nome Completo',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            id: 'personal_information_birthday',
                            name: 'Data de Nascimento',
                            type: 'text',
                            is_required: true,
                            pattern: '^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\\d{4}$'
                        },
                        {
                            id: 'personal_information_cpf',
                            name: 'CPF',
                            type: 'text',
                            is_required: true,
                            pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$'
                        },
                        {
                            id: 'personal_information_rg',
                            name: 'RG',
                            type: 'text',
                            is_required: true,
                            pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}-\\d{1}$'
                        },
                        {
                            id: 'personal_information_gender',
                            name: 'Sexo',
                            type: 'select',
                            is_required: true,
                            options: ['Masculino', 'Feminino', 'Outro']
                        }
                    ]
                }
            ]
        },
        {
            name: 'Endereço',
            id: 'endereco',
            groups: [
                {
                    name: 'Endereço Residencial',
                    id: 'residential_address',
                    fields: [
                        {
                            id: 'residential_address_zip_code',
                            name: 'CEP',
                            type: 'text',
                            is_required: true,
                            pattern: '^\\d{5}-\\d{3}$'
                        },
                        {
                            id: 'residential_address_street',
                            name: 'Logradouro',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            id: 'residential_address_number',
                            name: 'Número',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            id: 'residential_address_complement',
                            name: 'Complemento',
                            type: 'text',
                        },
                        {
                            id: 'residential_address_neighborhood',
                            name: 'Bairro',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            id: 'residential_address_city',
                            name: 'Cidade',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            id: 'residential_address_state',
                            name: 'Estado',
                            type: 'text',
                            is_required: true,
                        }
                    ]
                }
            ]
        },
        {
            name: 'Pais ou Responsáveis',
            id: 'pais_ou_responsaveis',
            groups: [
                {
                    name: 'Responsável',
                    id: 'guardian',
                    fields: [
                        {
                            id: 'guardian_full_name',
                            name: 'Nome Completo',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            id: 'guardian_cpf',
                            name: 'CPF',
                            type: 'text',
                            is_required: true,
                            pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$'
                        },
                        {
                            id: 'guardian_rg',
                            name: 'RG',
                            type: 'text',
                            is_required: true,
                            pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}-\\d{1}$'
                        },
                        {
                            id: 'guardian_relationship',
                            name: 'Parentesco',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            id: 'guardian_phone',
                            name: 'Telefone',
                            type: 'text',
                            is_required: true,
                            pattern: '^\\(\\d{2}\\) \\d{4,5}-\\d{4}$'
                        }
                    ]
                },
            ]
        },
        {
            name: 'Outras informações',
            id: 'outras_informacoes',
            groups: [
                {
                    name: 'Informações Adicionais',
                    id: 'additional_information',
                    fields: [
                        {
                            id: 'additional_information_status',
                            name: 'Situação',
                            type: 'select',
                            options: ['Ativo', 'Inativo'],
                            editable: false,
                            is_required: true
                        },
                        {
                            id: 'notes',
                            name: 'Observações',
                            type: 'textarea',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Documentos',
            id: 'documentos',
            groups: [
                {
                    name: 'Documentos Pessoais',
                    id: 'personal_documents',
                    fields: [
                        {
                            id: 'personal_documents_rg_front',
                            name: 'Frente do RG',
                            type: 'file',
                            is_required: false,
                        },
                        {
                            id: 'personal_documents_rg_back',
                            name: 'Verso do RG',
                            type: 'file',
                            is_required: false,
                        }
                    ]
                }
            ]
        }
    ]
};

export const simpleStudentProfileFormSchema: FormSchema = {
    sessions: [
        {
            name: 'Dados Pessoais',
            id: 'dados_pessoais',
            groups: [
                {
                    name: 'Informações Pessoais',
                    id: 'personal_information',
                    fields: [
                        {
                            id: 'personal_information_full_name',
                            name: 'Nome Completo',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            id: 'personal_information_birthday',
                            name: 'Data de Nascimento',
                            type: 'text',
                            is_required: true,
                            pattern: '^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\\d{4}$'
                        },
                        {
                            id: 'personal_information_cpf',
                            name: 'CPF',
                            type: 'text',
                            is_required: true,
                            pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$'
                        },
                        {
                            id: 'personal_information_rg',
                            name: 'RG',
                            type: 'text',
                            is_required: true,
                            pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}-\\d{1}$'
                        },
                        {
                            id: 'personal_information_gender',
                            name: 'Sexo',
                            type: 'select',
                            is_required: true,
                            options: ['Masculino', 'Feminino', 'Outro']
                        }
                    ]
                }
            ]
        },
        {
            name: 'Documentos',
            id: 'documentos',
            groups: [
                {
                    name: 'Documentos Pessoais',
                    id: 'personal_documents',
                    fields: [
                        {
                            id: 'personal_documents_rg_front',
                            name: 'Frente do RG',
                            type: 'file',
                            is_required: false,
                        },
                        {
                            id: 'personal_documents_rg_back',
                            name: 'Verso do RG',
                            type: 'file',
                            is_required: false,
                        }
                    ]
                }
            ]
        }
    ]
};

