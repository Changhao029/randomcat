import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useEffect, useReducer, useState } from "react"
import { fetchImage } from "../api/fetchImage"
import { RandomCatReducer } from "../reducer/RandomCatReducer"
import Image from "./Image"
import { useQuery } from '@tanstack/react-query'

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

    const {isLoading, isSuccess, isError, data, refetch} = useQuery({
        queryKey: ['randomCat', text, fontsize, fontcolor],
        queryFn: () => fetchImage(text, fontsize, fontcolor),
        enabled: false,
        },
    );
    useEffect(() => {
        randomCatDispatch({
          type: "SET_IS_LOADING",
          payload: isLoading,
        });
    }, [isLoading]);

    useEffect(() => {
        if (isSuccess && data){
        randomCatDispatch({
            type: "SET_IS_LOADING",
            payload: false,
        });
        randomCatDispatch({
            type: "RANDOM_CAT_UPDATE",
            payload: data,
        });
        }
    }, [isSuccess, data]);

    useEffect(() => {
        randomCatDispatch({
          type: "SET_IS_LOADING",
          payload: false,
        });
    }, [isError]);

    const handleFetch = () => {
        refetch({cancelRefetch: false})
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
