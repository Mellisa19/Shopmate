interface ProductSpecsProps {
    specs: Record<string, string>;
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
    const entries = Object.entries(specs);

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <h3 className="bg-zinc-50 dark:bg-zinc-900 px-4 py-3 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                Specifications
            </h3>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {entries.map(([key, value], index) => (
                    <div
                        key={key}
                        className={`flex justify-between px-4 py-3 text-sm ${index % 2 === 0 ? 'bg-white dark:bg-black' : 'bg-zinc-50 dark:bg-zinc-900/50'
                            }`}
                    >
                        <span className="text-zinc-500 dark:text-zinc-400">{key}</span>
                        <span className="font-medium">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
