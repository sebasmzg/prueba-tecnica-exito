import { FormType } from "@/app/core/application/models/form.type";
import { formSchemas } from "@/app/lib/validation/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useFormBuilder<T extends FormType>(type: T) {
    //const schema = formSchemas[type] as z.ZodType<any>;
    const schema = formSchemas.checkout;
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onTouched'
    })

    return methods;
}

