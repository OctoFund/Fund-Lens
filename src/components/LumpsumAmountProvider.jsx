import PLACEHOLDERS from "../common/placeholders";

export default function LumpsumAmountProvider({
    lumpsumAmount,
    setLumpsumAmount
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="sip-amount">{PLACEHOLDERS.home.lumpsum_amount_provider.label}</label>
            <input
                id="sip-amount"
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lumpsumAmount}
                onChange={e => setLumpsumAmount(e.target.value)}
                placeholder={PLACEHOLDERS.home.lumpsum_amount_provider.placeholder}
                min={0}
            />
        </div>
    );
}