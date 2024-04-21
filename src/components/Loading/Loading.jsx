import { Stack, Spinner } from "@chakra-ui/react" 

function Loading () {

    const styles = {
        display: "flex",
        justifyContent: "center",
        margin: "10px auto"
    }

    return (
        <Stack direction='row' spacing={4} style={styles}>
            <Spinner
                thickness='4px'
                speed='1s'
                emptyColor='gray.200'
                size='xl'
            />
        </Stack>
    )
}

export default Loading