import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import Image from "./Image"


const RandomCat = () => {
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")
    const [fontcolor, setFontcolor] = useState("")
    const [fontsize, setFontsize] = useState("")
    const [resultURL, setResultURL] = useState("")

    const fetchImage = async (final_url: string) => {
        setLoading(true);
        try {
            const response = await fetch(final_url);
            if (!response.ok) {
            throw new Error('Failed to fetch cat image');
            }
            const data = await response.blob();
            setResultURL(URL.createObjectURL(data));
        } catch (error) {
            console.error('Error fetching cat image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetch = () => {
        let final_url = "https://cataas.com/cat"
        console.log(text)
        console.log(fontsize)
        console.log(fontcolor)
        if (text){
            final_url = final_url + "/says/" + text
        }
        console.log(final_url)
        if ( fontsize && fontcolor){
            final_url = final_url + "?fontSize=" + fontsize + "&fontColor=" + fontcolor
        }else if (!fontsize && fontcolor) {
            final_url = final_url + "?fontColor=" + fontcolor
        }else if (fontsize && !fontcolor) {
            final_url = final_url + "?fontSize=" + fontsize
        }
        console.log(final_url)
        fetchImage(final_url)
    }


    

    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2} justifyContent="center" >
                <TextField id="text" value={text} onChange={e => setText(e.target.value)} label="Text" variant="outlined" multiline/>
                <TextField id="fontcolor" value={fontcolor} onChange={e => setFontcolor(e.target.value)} label="Fontcolor"/>
                <TextField id="fontsize" value={fontsize} onChange={e => setFontsize(e.target.value)} label="Fontsize"/>
                <Button variant="contained" onClick={handleFetch}>Fetch</Button>
                </Stack>
                { resultURL && (
                <Stack
                    justifyContent="center"
                    spacing={2}
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    }}
                >
                    {loading ? (
                        <CircularProgress />
                    ): (
                        <Box 
                        width={1000}
                        height={700}
                        bgcolor="white"
                    >
                        <Image src={resultURL} alt="alt" height={700}/>
                    </Box>
                    )}    
                </Stack>
                )}
            </Stack>
        </Box>
    )
}

export default RandomCat