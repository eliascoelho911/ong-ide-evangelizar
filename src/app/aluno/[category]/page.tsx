import FormTemplate from "@/components/templates/form/form";
import { studentProfileDataSchema } from "../student_profile_data_schema";

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
    const params = await props.params;
    const categoryId = params.category;
    const category = studentProfileDataSchema.categories.find(
        (category) => category.id === categoryId
    )!;

    return (
        <FormTemplate title={category.name} edit={true} content={category.groups} />
    );
}

export function generateStaticParams() {
    return studentProfileDataSchema.categories.map((category) => ({
        category: category.id,
    }));
};