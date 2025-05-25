import instance from "./instance";

const FOOD = 'food'

export const getFoodByMood = async (mood: string) => {
    try{
        const res = await instance.get(`${FOOD}/${mood}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in  API");
        throw e;
    }
}

export const getAllFood = async () => {
    try{
        const res = await instance.get(`${FOOD}/`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in  API");
        throw e;
    }
}

export const getDetailFood = async (data: any) => {
    try{
        const res = await instance.post(`${FOOD}`, data)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in  API");
        throw e;
    }
}