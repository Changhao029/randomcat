import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import Image from "./Image"


const RandomCat = () => {

    const [text, setText] = useState("")
    const [fontcolor, setFontcolor] = useState("")
    const [fontsize, setFontsize] = useState("")
    const [imageURL, setImageURL] = useState("https://cataas.com/cat")

    const handleFetch = () => {
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
        setImageURL(final_url)
        console.log(final_url)
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
                <Stack
                justifyContent="center"
                spacing={2}
                sx={{
                display: 'flex',
                alignItems: 'center',
                }}
                >
                <Box 
                    width={1000}
                    height={700}
                    bgcolor="white"
                >
                    <Image src={imageURL} alt="alt" height={700}/>
                </Box>
                </Stack>
            </Stack>
        </Box>
    )
}

export default RandomCat