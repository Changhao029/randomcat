import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useReducer, useState } from "react"
import { fetchImage } from "../api/fetchImage"
import { RandomCatReducer } from "../reducer/RandomCatReducer"
import Image from "./Image"

export const RandomCat = () => {
    const [text, setText] = useState("")
    const [fontcolor, setFontcolor] = useState("")
    const [fontsize, setFontsize] = useState("")

    const [randomCateState, randomCatDispatch] = useReducer(RandomCatReducer, {
        loading: false,
        text: "",
        fontcolor: "",
        fontsize: "",
        resultURL: "",
    })

    const handleFetch = async () => {
        let final_url = "https://cataas.com/cat"
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
        try {
            randomCatDispatch({type:"SET_IS_LOADING", payload: true})
            const result = await fetchImage(final_url);
            console.log(result); 
            randomCatDispatch({type:"RANDOM_CAT_UPDATE", payload: result})
            console.log(randomCateState.resultURL)
        } catch (error) {
            console.error("Error fetching image:", error);
        }finally{
            randomCatDispatch({type:"SET_IS_LOADING", payload: false})
        }
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
                    {randomCateState.loading ? (
                        <CircularProgress />
                    ): (randomCateState.resultURL && (
                        <Box 
                        width={1000}
                        height={700}
                        bgcolor="white"
                    >
                        <Image src={randomCateState.resultURL} alt="alt" height={700}/>
                    </Box>
                    ))}    
                </Stack>
            </Stack>
        </Box>
    )
}
