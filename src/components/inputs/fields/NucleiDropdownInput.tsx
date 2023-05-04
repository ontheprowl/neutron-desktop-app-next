import { ErrorMessage } from "@hookform/error-message";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { Path, RegisterOptions } from "react-hook-form";
import { useFormContext, useWatch } from "react-hook-form";





/**
 * A standard Nuclei Dropdown component
 * @param param0 
 * @returns 
 */
export default function NucleiDropdownInput({ name, options, label, placeholder, optional, defaultValue, disabled, children }: { name: string, options?: RegisterOptions<Record<string, any>, Path<Record<string, any>>>, label: string, placeholder: string, optional?: boolean, defaultValue?: string, disabled?: boolean, children: ReactNode[] | ReactNode }) {

    const { register, trigger, formState: { errors }, control } = useFormContext();

    const inputWatch = useWatch({ control, name: name })

    const [hasError, setHasError] = useState(false)

    const hasRealError = name in errors && errors[name].type != 'required';


    useEffect(() => {
        trigger();
        if (hasRealError) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    }, [trigger, inputWatch, hasRealError, errors, name])


    return (
        <div className="sm:text-left space-y-2 mb-1 w-full max-w-xl">
            <div className="flex flex-row justify-between">
                <span className="prose prose-md text-black font-gilroy-bold text-[14px]">{label}</span>
                {optional && <span className="text-secondary-text font-gilroy-medium">(Optional)</span>}
            </div>
            <select disabled={disabled} defaultValue={defaultValue} {...register(name, options)} placeholder={placeholder} className={`transition-all outline-none focus:ring-0 ${disabled ? 'bg-neutral-light text-secondary-text' : 'bg-white text-black hover:border-primary-dark active:border-primary-dark focus:border-primary-dark'}  pt-3 pb-3 px-3 border-2 ${hasError ? 'border-error-dark' : 'border-neutral-light'}  outline-none text-black text-sm rounded-xl placeholder-neutral-base block w-full h-12 font-gilroy-medium`} >
                {children}
            </select>
            <div className="w-full h-5 mt-1 text-left">
                <ErrorMessage errors={errors} name={name} render={(data) => {
                    return (<span className="text-error-base pl-4 z-10 font-gilroy-bold text-left">{data.message}</span>)
                }} />
            </div>
        </div>
    )
}