export const studentProfileDataSchema = {
    categories: [
        {
            name: 'Dados Pessoais',
            id: 'dados-pessoais',
            groups: [
                {
                    name: 'Informações Pessoais',
                    fields: [
                        {
                            name: 'Nome Completo',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            name: 'Data de Nascimento',
                            type: 'text',
                            is_required: true,
                            pattern: /^\d{2}\/\d{2}\/\d{4}$/
                        },
                        {
                            name: 'CPF',
                            type: 'text',
                            is_required: true,
                            pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
                        },
                        {
                            name: 'RG',
                            type: 'text',
                            is_required: true,
                            pattern: /^\d{2}\.\d{3}\.\d{3}-\d{1}$/
                        },
                        {
                            name: 'Sexo',
                            type: 'select',
                            is_required: true,
                            options: ['Masculino', 'Feminino', 'Outro']
                        }
                    ]
                },
                {
                    name: 'Naturalidade',
                    fields: [
                        {
                            id: 'country',
                            name: 'País',
                            type: 'select',
                            is_required: true,
                            options: ['Brasil'] // Adicionar outros países
                        },
                        {
                            id: 'state',
                            name: 'Estado',
                            type: 'select',
                            is_required: true,
                            options: ['São Paulo', 'Rio de Janeiro'] // Adicionar outros estados
                        },
                        {
                            id: 'city',
                            name: 'Cidade',
                            type: 'select',
                            is_required: true,
                            is_dynamic: true,
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
                    fields: [
                        {
                            id: 'cep',
                            name: 'CEP',
                            type: 'text',
                            is_required: true,
                            pattern: /^\d{5}-\d{3}$/
                        },
                        {
                            id: 'street',
                            name: 'Logradouro',
                            type: 'text',
                            is_required: true,
                            is_dynamic: true,
                        },
                        {
                            name: 'Número',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            name: 'Complemento',
                            type: 'text',
                        },
                        {
                            id: 'neighborhood',
                            name: 'Bairro',
                            type: 'text',
                            is_required: true,
                            is_dynamic: true,
                        },
                        {
                            id: 'city',
                            name: 'Cidade',
                            type: 'text',
                            is_required: true,
                            is_dynamic: true,
                        },
                        {
                            id: 'state',
                            name: 'Estado',
                            type: 'text',
                            is_required: true,
                            is_dynamic: true,
                        }
                    ]
                }
            ]
        },
        {
            name: 'Pais ou Responsáveis',
            id: 'pais-ou-responsaveis',
            groups: [
                {
                    name: 'Responsável',
                    fields: [
                        {
                            name: 'Nome Completo',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            name: 'CPF',
                            type: 'text',
                            is_required: true,
                            pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
                        },
                        {
                            name: 'RG',
                            type: 'text',
                            is_required: true,
                            pattern: /^\d{2}\.\d{3}\.\d{3}-\d{1}$/
                        },
                        {
                            name: 'Parentesco',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            name: 'Telefone',
                            type: 'text',
                            is_required: true,
                            pattern: /^\(\d{2}\) \d{4,5}-\d{4}$/
                        }
                    ]
                },
                {
                    name: 'Responsável',
                    fields: [
                        {
                            name: 'Nome Completo',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            name: 'CPF',
                            type: 'text',
                            is_required: true,
                            pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
                        },
                        {
                            name: 'RG',
                            type: 'text',
                            is_required: true,
                            pattern: /^\d{2}\.\d{3}\.\d{3}-\d{1}$/
                        },
                        {
                            name: 'Parentesco',
                            type: 'text',
                            is_required: true,
                        },
                        {
                            name: 'Telefone',
                            type: 'text',
                            is_required: true,
                            pattern: /^\(\d{2}\) \d{4,5}-\d{4}$/
                        }
                    ]
                }
            ]
        },
        {
            name: 'Outras informações',
            id: 'outras-informacoes',
            groups: [
                {
                    name: 'Informações Adicionais',
                    fields: [
                        {
                            name: 'Situação',
                            type: 'select',
                            options: ['Ativo', 'Inativo'],
                            editable: false
                        },
                        {
                            name: 'Data de Ingresso',
                            type: 'text',
                            pattern: /^\d{2}\/\d{2}\/\d{4}$/,
                            editable: false
                        },
                        {
                            name: 'Data de Saída',
                            type: 'text',
                            pattern: /^\d{2}\/\d{2}\/\d{4}$/,
                            editable: false
                        },
                        {
                            name: 'Observações',
                            type: 'textarea',
                        }
                    ]
                }
            ]
        }
    ]
}