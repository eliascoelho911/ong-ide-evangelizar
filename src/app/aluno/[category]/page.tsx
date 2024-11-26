import { studentProfileDataSchema } from "../student_profile_data_schema";

interface CategoryPageProps {
    params: {
        category: string;
    };
}

export default function CategoryPage({
    params,
}: CategoryPageProps) {
    const { category } = params;

    return (
        <div>
            <h1>Category: {category}</h1>
        </div>
    );
}

export function generateStaticParams() {
    return studentProfileDataSchema.categories.map((category) => ({
        category: category.id,
    }));
};