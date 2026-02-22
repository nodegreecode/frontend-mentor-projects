import {defineStore} from "pinia";
import {getCountries, getCountriesByRegion, getCountriesByName, getCountryByCode} from "@yusifaliyevpro/countries";
import {type CountriesRegions} from "./types.ts";


export const useCountriesStore = defineStore("countries", {
    state: () => ({
        countries: [] as any[],
        countryCache: new Map<string, {}>() as any | null,
        history: [] as string[],
        darkMode: document.documentElement.getAttribute("data-bs-theme") as 'light' | 'dark'
    }),
    getters: {
        getDarkMode(state) {
            return state.darkMode;
        },
        getAllCountries(state) {
            return () => state.countries;
        },
        getCountryByCode(state) {
            return (code: string) => {
                if (state.countryCache.has(code)) {
                    return state.countryCache.get(code);
                }
                return state.countries.find(
                    country => country.cca3 === code
                ) ?? null;
            };
        }
    },
    actions: {
        toggleTheme() {
            this.darkMode = this.darkMode === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute("data-bs-theme", this.darkMode);
        },
        async loadAllCountries() {
            try {
                const data = await getCountries({fields: ["name", "capital", "tld", "currencies", "languages", "population", "region", "flags", "borders", "cca3"]})
                this.countries = data ?? [];
            } finally {
                console.log("countries loaded");
            }
        },
        async loadCountriesByRegion(region: CountriesRegions) {
            try {
                const data = await getCountriesByRegion({
                    region: region,
                    fields: ["name", "capital", "tld", "currencies", "languages", "population", "region", "subregion", "flags", "borders", "cca3"]
                });
                this.countries = data ?? [];
            } finally {
                console.log("countries loaded");
            }
        },
        async loadCountryByName(countryName: string) {
            try {
                const data = await getCountriesByName({
                    name: countryName,
                    fields: ["name", "capital", "tld", "currencies", "languages", "population", "region", "subregion", "flags", "borders", "cca3"]
                });
                this.countries = data ?? [];
            } finally {
                console.log("countries loaded");
            }
        },
        async loadCountryByCode(code: any): Promise<void> {
            if (this.countryCache.has(code)) {
                console.info("Cached country with code: ", code);
                return;
            }

            try {
                const data = await getCountryByCode({
                    code: code,
                    fields: ["name", "capital", "tld", "currencies", "languages", "population", "region", "subregion", "flags", "borders", "cca3"]
                });
                this.countryCache.set(code, data ?? null);
            } finally {
                console.info("country loaded --- " + code);
            }
        },
        pushToHistory(code: string): void {
            if (this.history[this.history.length - 1] !== code) {
                this.history.push(code);
            }
        },
        popHistory(): string | undefined {
            return this.history.pop();
        },
    }
});
