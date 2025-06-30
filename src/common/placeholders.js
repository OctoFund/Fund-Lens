const PLACEHOLDERS = {
    home : {
        title: "FundLens | India's Free and Open source mutual funds analysis tool.",
        loader: {
            message: "Loading..."
        },
        header: {
            title: "Mutual Funds Analysis",
            subtitle: "India's Free and Open source mutual funds analysis tool."
        },
        mutual_fund_search: {
            label: "Mutual Fund",
            placeholder: "Start typing the mutual fund name"
        },
        index_search: {
            label: "Index (TRI)",
            placeholder: "Start typing the index name"
        },
        show_growth_fund_checkbox: {
            label: "Show Growth Direct funds only (ignoring other like dividends and regular plans)"
        },
        chart_type_selector: {
            label: "Analysis Type",
            placeholder: "Choose analysis type",
            info_label: "Click here to understand these charts",
            options: {
                sip_xirr: "SIP Rolling Returns (XIRR %)",
                sip_abs: "SIP Rolling Absolute Value (₹)",
                lumpsum_cagr: "Lumpsum Rolling Returns (CAGR %)",
                lumpsum_abs: "Lumpsum Rolling Absolute Value (₹)",
                stddev: "Standard Deviation Rolling Annualized Monthly (Risk) (%)"
            }
        }
    }
    
};

export default PLACEHOLDERS;