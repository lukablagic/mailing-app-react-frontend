interface TooltipProps {
    text: string
}
export const Tooltip = ({ text }: TooltipProps) => {
    return (
        <div className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            {text}
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    )
}
