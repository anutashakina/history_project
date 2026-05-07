import {defineField, defineType} from 'sanity'

export const monumentType = defineType({
    name: 'monument',
    title: 'Памятники',
    type: 'document',
    fields: [
        defineField({ name: 'id', title: 'Порядковый номер (ID)', type: 'number' }),
        defineField({ name: 'name', title: 'Название', type: 'string' }),
        defineField({ name: 'period', title: 'Период', type: 'string' }),
        defineField({ name: 'lat', title: 'Широта', type: 'number' }),
        defineField({ name: 'lng', title: 'Долгота', type: 'number' }),
        defineField({ name: 'description', title: 'История спасения', type: 'text' }),
        defineField({ name: 'protection', title: 'Защитные конструкции', type: 'text'}),
        defineField({ name: 'modern_image', title: 'Современное фото', type: 'file', options: { accept: '.jpg,.png,.webp,.jfif,.htm,.html,.pdf' } }),
        defineField({ name: 'archive_image', title: 'Архивное фото', type: 'file', options: { accept: '.jpg,.png,.webp,.jfif,.htm,.html,.pdf' } }),
        defineField({
            name: 'archive_documents',
            title: 'Архивные документы',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'image', title: 'Изображение документа', type: 'image', options: { hotspot: true } },
                        { name: 'caption', title: 'Подпись', type: 'string', description: 'Например: Чертеж 1942 года' }
                    ]
                }
            ]
        }),

        defineField({
            name: 'sources',
            title: 'Источники',
            type: 'array',
            of: [{ type: 'string' }]
        }),
    ],
})