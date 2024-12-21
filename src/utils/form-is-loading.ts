import { FormState } from "react-hook-form";

export default function formIsLoading(formState: FormState<any>) {
    return formState.isSubmitting || formState.isLoading
}