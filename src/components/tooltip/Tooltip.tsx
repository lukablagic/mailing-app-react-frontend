interface TooltipProps {
    children: React.ReactNode
    text: string
}
export const Tooltip = ({ children, text }: TooltipProps) => {
    return (
        <div className="relative group inline-block cursor-pointer max-w-full">
            <div className="absolute z-10 invisible group-hover:visible px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-1 tooltip dark:bg-gray-700 bottom-full mb-2">
                {text}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            {children}
        </div>
    )
}
