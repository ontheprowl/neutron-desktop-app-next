import { TagsInput } from "react-tag-input-component";




export default function NucleiTagsInput({ name, label, placeholder, optional, disabled, tagsState }: { name: string, label: string, placeholder: string, optional?: boolean, disabled?: boolean, type?: React.HTMLInputTypeAttribute, tagsState: [string[], React.Dispatch<React.SetStateAction<string[]>>] }) {

    return (<div className="sm:text-left space-y-2 mb-1 w-full">
        <div className="flex flex-row justify-between">
            <span className="prose prose-md text-black font-gilroy-bold text-[14px]">{label}</span>
            {optional && <span className="text-secondary-text font-gilroy-medium">(Optional)</span>}
        </div>
            <TagsInput
                value={tagsState[0]}
                onChange={(tags) => {
                    tagsState[1](tags)
                }}
                disabled={disabled}
                classNames={{ input: `transition-all inline-flex py-3 px-4 outline-none focus:ring-0 ${disabled ? 'bg-neutral-light text-secondary-text' : 'bg-white text-black hover:border-primary-dark active:border-primary-dark focus:border-primary-dark'}  border-2   outline-none  text-sm rounded-xl placeholder-neutral-base flex w-full h-12 font-gilroy-medium`, tag: 'text-white bg-neutral-dark transition-all hover:opacity-80 font-gilroy-medium p-2 flex flex-row items-center justify-between inset-0 w-1/12  rounded-lg' }}
                name={name}
                placeHolder={placeholder}
            />
    </div>)

}