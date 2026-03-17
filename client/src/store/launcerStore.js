import { create } from 'zustand'

export const useLaunchers = create((set) => ({
    launchers: [],
    isLoading: false,
    error: "",

    searchCity: "",
    setsearchCity: (e) => set({ searchCity: e }),

    searchType: "",
    setsearchType: (e) => set({ searchType: e }),






    getLaunchers: async () => {
        try {
            set({ isLoading: true })

            const response = await fetch('http://localhost:8000/api/launchers', {
                credentials: "include"
            })
            const result = await response.json()
            const data = result.launchers
            console.log([...data])
            if (!response.ok) {
                throw new Error(`${result.msg}`)
            }
          
            set({launchers: [...data] })
            

        } catch (err) {
            set({error: err.message})
        }finally {
            set({isLoading:false})
        }
    },
}))


