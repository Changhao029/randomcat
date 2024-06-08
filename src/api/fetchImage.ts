export const fetchImage = async (final_url: string): Promise<string> => {
    console.log("begin loading")
    const response = await fetch(final_url);
    const data = await response.blob();
    return URL.createObjectURL(data);
};