import instance from "./instance";

const MOOD = 'Mood'

export const getFoodByMood = async (mood: string) => {
    try{
        const res = await instance.get(`${MOOD}/${mood}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in  API");
        throw e;
    }
}
