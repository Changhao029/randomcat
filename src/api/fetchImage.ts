export const fetchImage = async (text?: string, fontsize?: string, fontcolor?: string): Promise<string> => {
    let final_url = "https://cataas.com/cat"
    if (text){
        final_url = final_url + "/says/" + text
    }
    if ( fontsize && fontcolor){
        final_url = final_url + "?fontSize=" + fontsize + "&fontColor=" + fontcolor
    }else if (!fontsize && fontcolor) {
        final_url = final_url + "?fontColor=" + fontcolor
    }else if (fontsize && !fontcolor) {
        final_url = final_url + "?fontSize=" + fontsize
    }
    const response = await fetch(final_url);
    const data = await response.blob();
    return URL.createObjectURL(data);
};